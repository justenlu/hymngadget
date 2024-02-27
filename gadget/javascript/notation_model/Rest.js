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

function Rest(duration) {
	this.duration=duration;
	this.chord=undefined;
}

Rest.prototype.setChord = function(chord) {
	this.chord=chord;
}


Rest.prototype.clone = function() {
	var n=new Rest(this.duration.clone());
	if (this.chord) {
		n.setChord(this.chord.clone());
	}
	return n;
}

Rest.prototype.toString = function() {
	var s="Rest. ";
	if (this.duration.dots==1) {
		s+="Dotted ";
	}
	else if (this.duration.dots==2) {
		s+="Double dotted ";
	}
	else if (this.duration.dots>2) {
		s+=this.duration.dots+" times dotted ";
	}

	s+="1/"+this.duration.denominator+" ";
	
	if (this.chord) {
		s+=" with chord "+this.chord;
	}

	return s;
}

//Rest is transposable because rest may have a chord attached
Rest.prototype.transpose = function(qualified_interval) {
	if (this.chord && this.chord instanceof Chord) {
		this.chord.transpose(qualified_interval);
	}
}

Rest.prototype.getABC = function() {
	var s="";
	var d=this.duration.dots;
	var length;
	var dotlength;
		
	if (this.chord) {
		console.log("Note.prototype.getABC: this.chord="+this.chord);
		s+=this.chord.getABC();
	}
	
	s+="z";
	
	length=32/this.duration.denominator;
	
	//take dots into consideration
	dotlength=length/2;
	while (d>0) {
		length+=dotlength;
		d--;
		dotlength/=2;
	}
	 
	s+=length;

	return s;
}
