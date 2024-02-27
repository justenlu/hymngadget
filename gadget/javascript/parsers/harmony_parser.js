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

function parseChords(code) {
	var parts=code.split(/\s+/);
	var i;
	var anRes;
	var dt="";
	var def;
    var context={};
	var harmonisation=new Harmonisation();
	
	//remove empty parts from the end of the array;
	while (parts.length>0 && parts[parts.length-1].length==0) {
		parts.pop();
	}
	
	for (var i=0; i<parts.length; ++i) {
		anRes=analyseChord(parts[i], context);
		def=anRes.definition;
		harmonisation.push(anRes.chord_object);
    	dt+="\""+parts[i]+"\": "+def+"\n";
    }

	$('#chord_definition').html(dt);
	$('#chord_objects').html(harmonisation);

	return harmonisation;
    
}

function analyseChord(part, context) {
	part=part.toLowerCase();
    var result;
	var def;
	var obj = new UnknownMarking(part);
	var length;
	var dots;
	var pitch;
	var i;
	var bo;
	var lengthShortened=false;
	var bgContext;
	var rm, bm;
	var root, quality, bass;
	var rootPitch, bassPitch;
	
	//Chord
	result=part.match(/^([cdefgahb])([#b]?)([\w\+-]*)(?:\/([cdefgahb])([#b]?))?$/);
	if (result!=null) {
		root=result[1].toUpperCase();
		rm=result[2];
		quality=result[3];
		bass=result[4];
		if (bass) {
			bass=bass.toUpperCase();
		}
		bm=result[5];
		if (rm) {
			root+=rm;
		}
		rootPitch=chordPitch(root);
		def = "Chord. Root = "+root+" ("+rootPitch+")";
		if (quality) {
			def+= ", quality = "+quality;
		}
		if (bass) {
			if (bm) {
				bass+=bm;
			}
			def+= ", bass = "+bass;
			obj=new Chord(chordPitch(root), quality, chordPitch(bass));
		}
		else {
			obj=new Chord(chordPitch(root), quality);
		}
		return { definition : def, chord_object : obj};
	}

	result=part.match(/-/);
	if (result!=null) {
		def="Skipping mark (-)";
		obj=new Skip();
		return { definition : def, chord_object : obj};
	}


	result=part.match(/^\|$/);
	if (result!=null) {
		def = "Bar line (normal). ";
		obj = new BarLine(BarLine.NORMAL);
		return { definition : def, chord_object : obj};
	}

	result=part.match(/^\|\:$/);
	if (result!=null) {
		def = "Bar line (start repeat). ";
		obj = new BarLine(BarLine.START_REPEAT);
		return { definition : def, chord_object : obj};
	}

	result=part.match(/^\:\|$/);
	if (result!=null) {
		def = "Bar line (end repeat). ";
		obj = new BarLine(BarLine.END_REPEAT);
		return { definition : def, chord_object : obj};
	}


	if (!def) {
		def = "unknown part";
	}
	return { definition : def, chord_object : obj};

}

function chordPitch(name) {
	var line;
	var sharps=0;
	var letter;
	var modifier;
	var i;
	var letter=name.substr(0,1);
	//console.log("chordPitch: root="+root);
	
	if (name.length>1) {
		modifier=name.substr(1,1);
	}

	i="CDEFGAH".indexOf(letter);
	if (i>-1) {
		line=i;
	}
	else if (letter=="B") {
		line=6;
		sharps=-1;
	}

	if (modifier=="#") {
		sharps=1;
	}
	else if (modifier=="b") {
		sharps-=1;
	}

	return new Pitch(line, sharps);
}
