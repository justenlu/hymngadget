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

function Pitch(line, sharps) {
	this.line=line;
	this.sharps=sharps;
}

Pitch.prototype.clone = function() {
	return new Pitch(this.line, this.sharps);
}

Pitch.prototype.isLowerThan = function(other) {
	return this.semitonesTo(other)>0;
}

Pitch.prototype.isHigherThan = function(other) {
	return this.semitonesTo(other)<0;
}

Pitch.prototype.toString = function() {
	var s="";
	var natural=["C", "D", "E", "F", "G", "A", "H"];
	var flatted=["Ces", "Des", "Es", "Fes", "Ges", "As", "B"];

	var n=reduce(this.line);
	var l=this.line;

	if (this.sharps>=0) {
		s+=natural[n];
		for (var i=0; i<this.sharps; ++i) {
			s+="is";
		}
	}
	else {
		s+=flatted[n];
		var flats=Math.abs(this.sharps);
		for (var i=0; i<flats-1; ++i) {
			s+="es";
		}
	}
	if (this.line>=-7) {
		s=s.toLowerCase();
		while(l>=0) {
			s+="'";
			l-=7;
		}
	}
	return s;
}

Pitch.prototype.chordName = function() {
	var s="";
	var natural=["C", "D", "E", "F", "G", "A", "H"];

	var n=reduce(this.line);

	s=natural[n];

	if (this.sharps==1) {
		s+="#";
	}
	else if (this.sharps==-1) {
		s+="b";
	}
	if (n==6 && this.sharps==-1) {
		return "Bb";
	}
	return s;
}

Pitch.prototype.transpose = function(qualified_interval) {
	console.log("Transposing "+this);
	var interval=qualified_interval.interval;
	var quality=qualified_interval.quality;
	var transposed_pitch = new Pitch(this.line+interval, 0);
	var i=this.semitonesTo(transposed_pitch);
	transposed_pitch.sharps=qualified_interval.getSemitones()-i;
	this.line+=interval;
	this.sharps=transposed_pitch.sharps;
}

Pitch.prototype.intervalTo = function(other_note) {
	var interval=other_note.line-this.line;
	var transposed_by_basic_interval=this.clone();
	transposed_by_basic_interval.transpose(new Interval(interval, 0));
	var quality=transposed_by_basic_interval.semitonesTo(other_note);
	if (interval!=0 && this.isHigherThan(other_note)) {
		quality=-quality;
	}
	return new Interval(interval, quality);
}

Pitch.prototype.semitonesTo = function(other_note) {

	/*+14 to keep over middle c. Does't work if goes below.*/
	var this_from_middle_c=new Interval(this.line+14, 0);
	var other_from_middle_c=new Interval(other_note.line+14, 0);
	
	//console.log("this_from_middle_c="+this_from_middle_c);
	var semitones_to_other=other_from_middle_c.getSemitones()-this_from_middle_c.getSemitones();	
	semitones_to_other+=other_note.sharps;
	semitones_to_other-=this.sharps;
	return semitones_to_other;
	
}
