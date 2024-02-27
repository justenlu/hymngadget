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

function Notation() {
	this.objects = new Array();
	this.hasKeySignature=false;
	this.lowestPitch=new Pitch(100,0);
	this.highestPitch=new Pitch(-100,0);
	this.composer="";
	this.title="";
}

Notation.prototype.getABC = function(wide, includeChords) {
	var s="";
	if (this.title) {
		s+="T:"+this.title+"\n";
	}
	else {
		s+="T:\n";
	}
	if (this.composer) {
		s+="C:"+this.composer+"\n";
	}
	s+="L:1/32\n";
	var context = new ABCContext();
	context.includeChords=includeChords;
	var add_ending_bar_line=true;
	var o;
	var even_system=false;
	var i;
	var j;
	for (i=0; i<this.objects.length; ++i) {
		o=this.objects[i];
		
		if (!context.time_signature_printed && (o instanceof Note || o instanceof Rest || o instanceof BeamGroup)) {
			s+="M:\n";
			context.time_signature_printed=true;
		}
		
		if (wide && (o instanceof SystemBreak)) {
			if (even_system) {
				s+=o.getABC(context);
				for (j=0; j<context.lyrics_lines.length; ++j) {
					s+="w:"+context.lyrics_lines[j]+"\n";
				}
				context.lyrics_lines=new Array();//Emptying the array would be sufficient
				even_system=false;
			}
			else {
				even_system=true;
			}
		} else if (o.getABC) {
			s+=o.getABC(context);
			if (!(o instanceof SystemBreak)) {
			  s+=" ";//= added 22.5.2013
			}
			if (o instanceof SystemBreak) {
				for (j=0; j<context.lyrics_lines.length; ++j) {
					s+="w:"+context.lyrics_lines[j]+"\n";
				}
				context.lyrics_lines=new Array();//Emptying the array would be sufficient
			} else if (o.syllables) {
				for (j=0; j<o.syllables.length; ++j) {
					if (context.lyrics_lines.length<j+1) {
						context.lyrics_lines.push("");
					}
					context.lyrics_lines[j]+=(o.syllables[j].getABC());
				}
			}
		}
		if (o instanceof BarLine) {
			add_ending_bar_line=false;
		}
		else {
			add_ending_bar_line=true;
		}
	}
	
	if (!context.time_signature_printed) {
		s+="M:\n";
		context.time_signature_printed=true;
	}
	
	if (add_ending_bar_line) {
		s+=" |]";
	}
	for (j=0; j<context.lyrics_lines.length; ++j) {
		if (j==0) {
			s+="\n";
		}
		s+="w:"+context.lyrics_lines[j]+"\n";
	}
	return s;
}

Notation.prototype.clone = function() {
	var c=new Notation();
	var i;
	for (i=0; i<this.objects.length; ++i) {
		c.push(this.objects[i].clone());
	}
	c.title=this.title;
	c.composer=this.composer;
	return c;
}

Notation.prototype.transpose = function(qualified_interval) {
	var i;
	var o;
	for (i=0; i<this.objects.length; ++i) {
		o=this.objects[i];
		if (o.transpose) {
			o.transpose(qualified_interval);
		}
	}
}

Notation.prototype.setComposer = function(composer) {
	this.composer=composer;
}

Notation.prototype.setTitle = function(title) {
	this.title=title;
}


Notation.prototype.setLyrics = function(verse) {
	var ni=0, li=0;
	var no, syllable;
	var skip=0;

	var unbeamed_objects=new Array();
	var repeat_start=0;
	var encounter=new Array();
	var i;

	//Make unbeamed copy of the objects array and remove attached syllables and slurs
	for (i=0; i<this.objects.length; ++i) {
		no=this.objects[i];
		if (no instanceof BeamGroup) {
			for (j=0; j<no.objects.length; ++j) {
				unbeamed_objects.push(no.objects[j]);
				if (no.objects[j].addSyllable) {
					no.objects[j].removeSyllables();
				}
				if (no.setSlur) {
					no.setSlur(undefined);
				}
			}
		}
		else {
			unbeamed_objects.push(no);
			if (no.addSyllable) {
				no.removeSyllables();
			}
			if (no.setSlur) {
				no.setSlur(undefined);
			}
		}
	}
	
	for (i=0; i<unbeamed_objects.length; ++i) {
		encounter[i]=0;
	}
	
	while (ni<unbeamed_objects.length && li<verse.objects.length) {
		no=unbeamed_objects[ni];
		if (no instanceof BarLine) {
			if (no.type==BarLine.START_REPEAT) {
				repeat_start=ni;
				ni++;
				continue;
			}
			else if (no.type==BarLine.END_REPEAT) {
				if (encounter[ni]==0) {
					encounter[ni]++;
					ni=repeat_start;
					continue;
				}
			}
		}
		if (!no.addSyllable) {
			ni++;
			continue;
		}
		if (skip>0) {
			skip--;
			ni++;
			if (skip==0) {
				no.setSlur(Note.slur_ends);
			}
			continue;
		} 
		syllable=verse.objects[li++];
		no.addSyllable(syllable);
		if (syllable.noteCount>1) {
			no.setSlur(Note.slur_begins);
		}
		skip=syllable.noteCount-1;
		ni++;
	}
}

Notation.prototype.setHarmonisation = function(harmonisation) {
	var ni=0;
	var ci=0;
	var no, co;
	var unbeamed_objects=new Array();
	var i,j;
	
	//Make unbeamed copy of the objects array and remove attached chords
	for (i=0; i<this.objects.length; ++i) {
		no=this.objects[i];
		if (no instanceof BeamGroup) {
			for (j=0; j<no.objects.length; ++j) {
				unbeamed_objects.push(no.objects[j]);
				if (no.objects[j].setChord) {
					no.objects[j].setChord(undefined);
				}
			}
		}
		else {
			unbeamed_objects.push(no);
			if (no.setChord) {
				no.setChord(undefined);
			}
		}
	}
	
	while (ni<unbeamed_objects.length && ci<harmonisation.objects.length) {
		co=harmonisation.objects[ci];
		no=unbeamed_objects[ni];
		if (co instanceof BarLine) {
			do {
				no=unbeamed_objects[ni++];
			} while (ni<unbeamed_objects.length && !(no instanceof BarLine && 
				                                     (no.type==co.type || co.type==BarLine.NORMAL)));
			ci++
			continue;
		}
		if (!no.setChord) {
			ni++;
			continue;
		}
		if (co instanceof Chord) {
			no.setChord(co);
		}
		ci++;
		ni++;
	}
}

Notation.prototype.getInitialKey = function () {
	var i;
	var o;
	var key=null;
	for (i=0; i<this.objects.length; ++i) {
		o=this.objects[i];
		if (o instanceof KeySignature) {
			key=o.clone();
		}
	}
	if (!key) {
		key=new KeySignature(0);
	}
	return key;
}

Notation.prototype.push = function(o) {
	this.objects.push(o);
	var i;
	if (o instanceof KeySignature) {
		this.hasKeySignature=true;
	}
	else if (!this.hasKeySignature && (o instanceof Note || o instanceof Rest || o instanceof BeamGroup)) {
		this.objects.unshift(new KeySignature(0));
		//console.log("Added "+o+" as the first object to Notation.")
		this.hasKeySignature=true;
	}
	if (o instanceof Note) {
		if (o.pitch.isLowerThan(this.lowestPitch)) {
			this.lowestPitch=o.pitch;
		} 
		if (o.pitch.isHigherThan(this.highestPitch)) {
			this.highestPitch=o.pitch;
		} 
	}
	else if (o instanceof BeamGroup) {
		for (i=0; i<o.objects.length; ++i) {
			n=o.objects[i];
			if (n.pitch.isLowerThan(this.lowestPitch)) {
				this.lowestPitch=n.pitch;
			} 
			if (n.pitch.isHigherThan(this.highestPitch)) {
				this.highestPitch=n.pitch;
			} 
		}
	}
	
}

Notation.prototype.getAmbitusAsABC = function() {
	if (this.lowestPitch.line==100) {
		return "";
	}
	var lowest=new Note(this.lowestPitch, new Duration(1, 0));
	var highest=new Note(this.highestPitch, new Duration(1, 0));
	var n=new Notation();
	n.push(lowest);
	n.push(highest);
	return n.getABC();
}

Notation.prototype.toString = function() {
	var s="";
	for (var i=0; i<this.objects.length; ++i) {
		s+=this.objects[i]+"\n";
	}
	return s;
}