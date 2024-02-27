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

function BeamGroup() {
	this.objects = new Array();
}

BeamGroup.prototype.push = function(o) {
	this.objects.push(o);
}

BeamGroup.prototype.transpose = function(qualified_interval) {
	var i;
	var o;
	var transposed=new BeamGroup();
	for (i=0; i<this.objects.length; ++i) {
		o=this.objects[i];
		if (o.transpose) {
			o.transpose(qualified_interval);
		}
	}
}

BeamGroup.prototype.toString = function() {
	var s="BeamGroup of "+this.objects.length+" objects: ";
	for (var i=0; i<this.objects.length-1; ++i) {
		s+=this.objects[i]+", ";
	}
	if (i<this.objects.length) {
		s+=this.objects[i];
	}
	return s;
}

BeamGroup.prototype.getABC = function(context) {
	var s="";
	var o;
	var i;
	var j;
	for (i=0; i<this.objects.length; ++i) {
		o=this.objects[i];
		if (o.getABC) {
			s+=o.getABC(context);
		}
		if (o.syllable) {
			context.lyrics_line+=o.syllable.getABC();
		}

		if (o.syllables) {
			for (j=0; j<o.syllables.length; ++j) {
				if (context.lyrics_lines.length<j+1) {
					context.lyrics_lines.push("");
				}
				context.lyrics_lines[j]+=(o.syllables[j].getABC());
			}
		}
	}

	return s;
}

BeamGroup.prototype.clone = function() {
	var i;
	var c=new BeamGroup();
	for (i=0; i<this.objects.length; ++i) {
		c.push(this.objects[i].clone());
	}
	return c;
}
