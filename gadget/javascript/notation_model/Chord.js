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

function Chord(/*Pitch*/ root, /*String*/ quality, /*Pitch*/ bass) {
	console.log("Creating a new Chord object");
	this.root=root;
	this.quality=quality;
	this.bass=bass;
}

Chord.prototype.toString = function() {
	//console.log("Chord.prototype.toString");
	var r="Chord. Root="+this.root;
	if (this.quality) {
		r+=", quality="+this.quality;
	}
	if (this.bass) {
		r+=", bass="+this.bass;
	}
	return r;
}

Chord.prototype.getABC = function() {
	var s='"';
	s+=this.root.chordName();
	if (this.quality) {
		s+=this.quality;
	}
	if (this.bass) {
		s+="/"+this.bass.chordName();
	}
	s+='"';
	return s;
}

Chord.prototype.transpose = function(qualified_interval) {
	this.root.transpose(qualified_interval);
	if (this.bass) {
		this.bass.transpose(qualified_interval);
	}
}

Chord.prototype.clone = function() {
	if (this.bass) {
		return new Chord(this.root.clone(), this.quality, this.bass.clone());
	}
	else {
		return new Chord(this.root.clone(), this.quality);
	}
}
