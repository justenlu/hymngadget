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

function TimeSignature(/* numerator, denominator OR non-numeric */) {
	if (arguments.length==2) {	
		this.numerator=arguments[0];
		this.denominator=arguments[1];
	}
	else {
		this.non_numeric=arguments[0];
	}
	console.log("Creating TimeSignature. arguments[0]="+arguments[0]);
}

TimeSignature.C=1;
TimeSignature.ALLA_BREVE=2;

TimeSignature.prototype.clone = function() {
	if (this.non_numeric) {
		return new TimeSignature(this.non_numeric);
	}
	else {
		return new TimeSignature(this.numerator, this.denominator);
	}
}

TimeSignature.prototype.toString = function() {
	var s="Time signature: ";
	if (this.non_numeric) {
		if (this.non_numeric==TimeSignature.C) {
			s+="C";
		}
		else if (this.non_numeric==TimeSignature.ALLA_BREVE) {
			s+="alla breve";
		}
	}
	else {
		s+=this.numerator+"/"+this.denominator;
	}
	return s;
}

TimeSignature.prototype.getABC = function(context) {
	var abc="M:";
	if (this.non_numeric) {
		if (this.non_numeric==TimeSignature.C) {
			abc+="C";
		}
		else if (this.non_numeric==TimeSignature.ALLA_BREVE) {
			abc+="C|";
		}
	}
	else {
		abc+=this.numerator+"/"+this.denominator;
	}
	abc+="\n";
	context.time_signature_printed=true;
	return abc;
}
