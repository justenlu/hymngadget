/*
Copyright (C) 2013 Jukka Stenlund

This file is part of HymnGadget.

HymnGadget is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HymnGadget is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HymnGadget.  If not, see <http://www.gnu.org/licenses/>.
*/

function Song(item, s) {
	this.observer=new Array();
	this.item=item;
	
	this.id=s.id;
	this.number=s.number ? s.number : "";
	this.variant=s.variant ? s.variant : "";
	this.name=s.name ? s.name : "";
	this.book=s.book;
	this.melodyCode=s.melody_code ? s.melody_code : "";
	this.verses=s.verses ? s.verses : new Array();
	this.harmonisations=s.harmonisations ? s.harmonisations : new Array();
	
	this.notation=parseMelody(this.melodyCode);
	this.lyricsCode=catenateVerses(this.verses);
	this.lyrics=parseLyrics(this.lyricsCode); 

	this.harmonisations_by_id=new Array();
	if (this.harmonisations.length>0) {
		if(this.item.harmonisationId==null) {
			this.item.harmonisationId=this.harmonisations[0].id;
		}
		for (i=0; i<this.harmonisations.length; ++i) {
			console.log("Let's parse "+this.harmonisations[i].notation);
			this.harmonisations[i].model=parseChords(this.harmonisations[i].notation);
			this.harmonisations_by_id[this.harmonisations[i].id]=this.harmonisations[i];
		}
		/*
		if (item.harmonisationId) {
			this.notation.setHarmonisation(this.harmonisations_by_id[item.harmonisationId].model);
		}
		*/
	}
	else {
		this.item.harmonisationId=null;
	}
	
	this.modifiedHarmonisations=new Set();

	//this.notation.setLyrics(this.lyrics.getVerse(this.item.selectedVerse));	
	//this.transposedNotation=this.notation.clone();
	this.updateNotation();
	item.addObserver(this);//ok?
}

Song.prototype.getFirstWords = function() {
	if (this.lyrics==null) {
		return "";
	}
	var verse=this.lyrics.getVerse(1);
	return verse.getFirstLine();
}

Song.prototype.getCurrentHarmonisation = function() {
	return this.harmonisations_by_id[this.item.harmonisationId];
}

Song.prototype.addObserver = function(o) {
	this.observer.push(o);
}

Song.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

Song.prototype.notify=function() {
	this.updateNotation();
}

Song.prototype.updateNotation=function() {
	this.notation.setLyrics(this.lyrics.getVerse(this.item.selectedVerse));
	if (this.item.harmonisationId) {
		this.notation.setHarmonisation(this.harmonisations_by_id[this.item.harmonisationId].model);
	}
	this.transposedNotation=this.notation.clone();
	console.log("in updateNotation item.transposeInterval="+this.item.transposeInterval);
	this.transposedNotation.transpose(this.item.transposeInterval);
	this.notifyObservers();
}