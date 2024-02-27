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

/*
It's not a good idea to loop potentially sparse array from index 0 to index length-1 and skip nonexistent indexes,
because if someone would define lyrics where there is only one verse and the number of that verse is 1000000, there
that would cause quite a long loop.
*/

function Lyrics() {
	this.verses = new Array();
}

Lyrics.prototype.clone = function() {
	var c=new Lyrics();
	var i;
	for (i=0; i<this.verses.length; ++i) {
		if (this.verses[i] === undefined) continue; //verses array may be sparse
		c.addVerse(i, this.verses[i]);
	}
	return c;
}

Lyrics.prototype.getVerse = function(i) {
	return this.verses[i];
}

Lyrics.prototype.getVersesForSaving = function() {
	var v=new Array();
	for (i=1; i<this.verses.length; ++i) {
		if (this.verses[i] === undefined) continue; //verses array may be sparse
		v.push({number:i, text:this.verses[i].verse_string});
	}
	return v;
}

Lyrics.prototype.getHTML = function(first, range_set, columns) {
	var html="<table>\n<tr>\n\n";
	var column=0;
	var skip=false;
	if (!first) {
		first=1;
		skip=true;
	}
	for (i=first; i<this.verses.length; ++i) {
		if (this.verses[i] === undefined) continue; //verses array may be sparse
		if (!range_set.hasValue(i)) continue;
		if (skip) {
			skip=false;
			continue;
		}
		if (column==columns) {
			html+="</tr><tr height='10'></tr>\n<tr>\n";
			column=0;
		}
		html+="<td width='20'></td><td class='verse' id='verse"+i+"' valign='top'>"+i+".<br>"+this.verses[i].getHTML()+"</td>\n";
		++column;
	}
	html+="</tr>";
	html+="</table>";
	return html;

}


Lyrics.prototype.addVerse = function(number, verse) {
	this.verses[number]=verse;
}

Lyrics.prototype.toString = function() {
	var s="";
	for (var i=0; i<this.verses.length; ++i) {
		if (this.verses[i] === undefined) continue;
		s+=this.verses[i];
	}
	console.log("Verse.prototype.toString called");
	return s;
}