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
 * Creates a new BarLine.
 * @param {number} type The type must be one of the following:
 * <ul>
 * <li>BarLine.NORMAL</li>
 * <li>BarLine.START_REPEAT</li>
 * <li>BarLine.END_REPEAT</li>
 * </ul>
 * @class Represents a bar line. The barline may be normal or start or end a repeated section.
 */
function BarLine(type) {
	this.type=type;
}

BarLine.prototype.clone = function() {
	return new BarLine(this.type);
}

BarLine.prototype.toString = function() {
	var s="Bar line (";
	var types=["normal", "start repeat", "end repeat"];
	s+=types[this.type];
	s+=")";
	return s;
}

BarLine.prototype.getABC = function(context) {
	var i;
	var abc=["|", "|:", ":|"];
	for (i=0; i<7; ++i) {
		context.tempSharp[i]=context.signature[i];
	}
	return abc[this.type-1];
}

/**
 * Used as argument for constructor when creating a BarLine object to represent a normal, 
 * simple bar line.
 * @constant
 */
BarLine.NORMAL=1;

/**
 * Used as argument for constructor when creating a BarLine object to represent a bar line that
 * starts a repeated section.
 * @constant
 */
BarLine.START_REPEAT=2;

/**
 * Used as argument for constructor when creating a BarLine object to represent a bar line that
 * ends a repeated section.
 * @constant
 */
BarLine.END_REPEAT=3;