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

function RangeSet(hasAll) {
	this.values=new Array();
	this.ranges=new Array();
	this.min=1000;
	this.hasAll=hasAll;
	this.parsedString=null;
}

RangeSet.prototype.addValue = function(value) {
	this.values.push(value);
	if (value<this.min) {
		this.min=value;
	}
}

RangeSet.prototype.addRange = function(range) {
	this.ranges.push(range);
	if (range.from<this.min) {
		this.min=range.from;
	}
}

RangeSet.prototype.hasValue = function (value) {
	var i;
	if (this.hasAll) {
		return true;
	}
	for (i=0; i<this.values.length; ++i) {
		if (this.values[i]==value) {
			return true;
		}
	}
	for (i=0; i<this.ranges.length; ++i) {
		if (this.ranges[i].hasValue(value)) {
			return true;
		}
	}
	return false;
}

RangeSet.prototype.toString = function () {
	var i;
	var s="";
	if (this.hasAll) {
		return "";
	}
	else if (this.parsedString) {
		return this.parsedString;
	}
	else {
		for (i=0; i<this.values.length; ++i) {
			s+=this.values[i]+", ";
		}
		for (i=0; i<this.ranges.length; ++i) {
			s+=this.ranges[i]+", ";
		}
		return s;
	}
}