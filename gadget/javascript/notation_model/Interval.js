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

/**
 * A qualified interval with direction. 
 * @constructor
 * @param {number} interval The interval without quality. Positive values mean interval upwards,
 * negative values mean interval downwards. 
 * @param {number} quality The quality of the interval. Positive values mean that interval is
 * widened, negative values mean that interval is narrowened. 
 */
function Interval(interval, quality) {
	this.interval=interval;
	this.quality=quality;
}

Interval.prototype.toString = function() {
	return "Interval="+this.interval+", quality="+this.quality+" ("+this.getSemitones()+" semitones)";
}

Interval.prototype.getHTML = function() {
	
	return substitute_html_entities(""+this.getSemitones());

	/*
	if (this.interval==0 && this.quality==0) {
		return "";
	}
	
	var intervalName=["priimi", "sekunti", "terssi", "kvartti", "kvintti", "seksti", "septimi", "oktaavi"];
	var s="";
	if (this.interval<0) {
		s+="-";
	}
	s+=this.quality;
	s+=" ";
	s+=intervalName[Math.abs(this.interval)];
	return substitute_html_entities(s);
	*/
}

/**
 * Returns the widenes of this interval measured in semitones.
 * @return {number} The widenes of this interval in semitones. If the direction of the interval
 * is upwards, the value is positive. If the direction is downwards, the value is
 * negative. HOW ABOUT IF interval=0 AND quality=-1?
 */
Interval.prototype.getSemitones = function() {
	var semitones = [0, 2, 4, 5, 7, 9, 11];
	var s=0;
	var interval=this.interval;
	while (interval>6) {
		s+=12;
		interval-=7;
	}
	while (interval<-6) {
		s-=12;
		interval+=7;
	}
	if (interval>=0) {
		s+=semitones[interval];
		s+=this.quality;
	}
	else {
		s-=semitones[Math.abs(interval)];
		s-=this.quality;
	}
	return s;
}