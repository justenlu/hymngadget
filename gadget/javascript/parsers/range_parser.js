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

function parseRange(range_string) {
	var parts=range_string.split(/\s*,\s*/);
		
	var part;
	var result;
	var from;
	var to;

	var range_set=new RangeSet();
		
	for (var i=0; i<parts.length; ++i) {
		
		part=parts[i];

		result=part.match(/^\d+$/);
		if (result!=null) {
			range_set.addValue(Number(part));
			continue;
		}

		result=part.match(/^(\d+)\s*-\s*(\d+)$/);
		if (result!=null) {
			from=Number(result[1]);
			to=Number(result[2]);
			range_set.addRange(new Range(from, to));
			continue;
		}
	}
    return range_set;
}