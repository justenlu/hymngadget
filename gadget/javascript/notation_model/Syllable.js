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

function Syllable(/*String*/ text, /*int*/ noteCount,  /*boolean*/ last_in_word) {
	this.text=text;
	this.noteCount=noteCount;
	this.last_in_word=last_in_word;
	//console.log("Created syllable "+this.text+" for "+this.noteCount+" notes");
}

Syllable.prototype.clone = function() {
	return new Syllable(this.text, this.noteCount, this.last_in_word);
}

Syllable.prototype.toString = function() {
	var s=this.text;
	var i;
	for (i=0; i<this.noteCount-1; ++i) {
		s+="_";
	}
	if (!this.last_in_word) {
		s+="-";
	}
	else {
		s+=" ";
	}
	return s;
}

Syllable.prototype.getABC = function() {
	var s=this.text;
	var i;
	if (!this.last_in_word) {
		s+="-";
	}
	for (i=0; i<this.noteCount-1; ++i) {
		s+="_";
	}
	if (this.last_in_word) {
		s+=" ";
	}
	return s;
}