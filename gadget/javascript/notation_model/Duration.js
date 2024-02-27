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

function Duration(denominator, dots) {
	this.denominator=denominator;
	this.dots=dots;
}

Duration.prototype.setChord = function(chord) {
	this.chord=chord;
}

Duration.prototype.clone = function() {
	return new Duration(this.denominator, this.dots);
}

Duration.prototype.toString = function() {
	var s="";
	if (this.dots==1) {
		s+="Dotted ";
	}
	else if (this.dots==2) {
		s+="Double dotted ";
	}
	else if (this.dots>2) {
		s+=this.dots+" times dotted ";
	}

	s+="1/"+this.denominator+" ";
		
	return s;
}

Duration.prototype.getABC = function(context) {
	var s="";
	var l;
	var d=this.dots;
	var length;
	var dotlength;
		
	length=32/this.denominator;
	
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
