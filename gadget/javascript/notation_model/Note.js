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

function Note(pitch, duration) {
	this.pitch=pitch;
	this.duration=duration;
	this.chord=undefined;
	this.syllables=new Array();
	this.slur=undefined;
}

Note.slur_begins=1;
Note.slur_ends=2;

Note.prototype.setSlur = function(slur) {
	this.slur=slur;
}

Note.prototype.setChord = function(chord) {
	this.chord=chord;
}

Note.prototype.addSyllable = function(syllable) {
	this.syllables.push(syllable);
}

Note.prototype.removeSyllables = function() {
	this.syllables=new Array();//Not a very good solution but works.
}


Note.prototype.clone = function() {
	var n=new Note(this.pitch.clone(), this.duration.clone());
	var i;
	if (this.chord) {
		n.setChord(this.chord.clone());
	}
	for (i=0; i<this.syllables.length; ++i) {
		n.addSyllable(this.syllables[i].clone());
	}
	if (this.slur) {
		n.setSlur(this.slur);
	}
	return n;
}

Note.prototype.toString = function() {
	var s="Note. ";
	var line=this.pitch.line, sharps=this.pitch.sharps;
	var i;

	s+=this.duration;
	
	//s+=this.pitch.toString();
	s+=this.pitch;
	
	if (this.chord) {
		s+=" with chord "+this.chord;
	}

	if (this.syllables.length>0) {
		s+=" with syllables ";
		for (i=0; i<this.syllables.length; ++i) {
			s+=this.syllables[i];
		}
	}

	if (this.slur) {
		if (this.slur==Note.slur_begins) {
			s+=" (A slur starts here.)";
		}
		if (this.slur==Note.slur_ends) {
			s+=" (A slur ends here.)";
		}
		
	}
	
	return s;
}

Note.prototype.transpose = function(qualified_interval) {
	this.pitch.transpose(qualified_interval);
	if (this.chord && this.chord instanceof Chord) {
		this.chord.transpose(qualified_interval);
	}
}

Note.prototype.getABC = function(context, includeChords) {
	var natural=["C", "D", "E", "F", "G", "A", "B"];
	var s="";
	var l;
	var flats=0;
	//var d=this.dots;
	var dots=this.duration.dots;//make a copy so it can be altered in calculation without altering the state of the object
	var dots;
	var line=this.pitch.line, sharps=this.pitch.sharps;
	
	if (this.slur && this.slur==Note.slur_begins) {
		s+="(";
	}
	
	if (context.includeChords && this.chord) {
		//console.log("Note.prototype.getABC: this.chord="+this.chord);
		s+=this.chord.getABC();
	}
	
	if (sharps<0) {
		flats=Math.abs(sharps);
	}
	
	if (sharps!=context.tempSharp[reduce(line)]) {

		for (var i=0; i<sharps; ++i) {
			s+="^";
		}
	
		for (var i=0; i<flats; ++i) {
			s+="_";
		}
		
		if (sharps==0) {
			s+="=";
		}
		
		context.tempSharp[reduce(line)]=sharps;
	}	
	
	if (line<=6) {
		s+=natural[reduce(line)];
		l=line;
		while (l<0) {
			s+=",";
			l+=7;
		}
	}
	else {
		//return "reduced line="+reduce(this.line);
		s+=natural[reduce(line)].toLowerCase();
		l=line;
		while (l>=14) {
			s+="'";
			l-=7;
		}
	}

	s+=this.duration.getABC(context);
	
	if (this.slur && this.slur==Note.slur_ends) {
		s+=")";
	}
	

	return s;
	
}
