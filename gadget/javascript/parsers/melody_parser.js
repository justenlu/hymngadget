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

function parseMelody(melody_code) {
    var parts = melody_code.split(/\s+/);
	var dt="";
	var ot="";
	var def;
	var notation_objects = new Array;
	var notation = new Notation();
	var anRes;//result of the analyse
	var context={default_duration: new Duration(4, 0)};

	//remove empty parts from the end of the array;
	while (parts.length>0 && parts[parts.length-1].length==0) {
		parts.pop();
	}

	
    for (var i=0; i<parts.length; ++i) {
		anRes=analyseMelodyPart(parts[i], context);
		def=anRes.definition;
		notation.push(anRes.notation_object);
    	dt+="\""+parts[i]+"\": "+def+"\n";
    }

	$('#melody_count').html(parts.length);
	$('#melody_definition').html(dt);
	$('#melody_objects').html(notation);
	//$('#abc-notation').val(notation.getABC(wide));

	return notation;
}

function analyseMelodyPart(part, context) {
    var result;
	var def;
	var obj = new UnknownMarking(part);
	var length;
	var dots;
	var duration;
	var pitch;
	var i;
	var bo;
	var lengthShortened=false;
	var bgContext;
	part=part.toLowerCase();
	
	result=part.match(/^(?:t\:)?(\d+)\/(\d+)$/);
	if (result!=null) {
		def = "Time signature. Osoittaja: "+result[1]+", nimittäjä: "+result[2];
		var numerator=result[1];
		var denominator=result[2];
		obj = new TimeSignature(numerator, denominator);
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^(?:t\:)?(\d+)\/(\d+)-(\d+)\/(\d+)$/);
	if (result!=null) {
		def = "Combined time signature. Osoittaja1: "+result[1]+", nimittäjä1: "+result[2]+"Osoittaja2: "+result[3]+", nimittäjä2: "+result[4];
		var numerator=""+result[1]+result[3];
		var denominator=""+result[2]+result[4];
		obj = new TimeSignature(numerator, denominator);
		return { definition : def, notation_object : obj};
	}


	result=part.match(/^t:c$/);
	if (result!=null) {
		def = "Time signature: C";
		obj = new TimeSignature(TimeSignature.C);
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^t:c\|$/);
	if (result!=null) {
		def = "Time signature: C|";
		obj = new TimeSignature(TimeSignature.ALLA_BREVE);
		return { definition : def, notation_object : obj};
	}

	
	result=part.match(/^(\d+)\/(\d+)-(\d+)\/(\d+)$/);
	if (result!=null) {
		def = "Combined time signature. Osoittaja1: "+result[1]+", nimittäjä1: "+result[2]+
			" Osoittaja2: "+result[3]+", nimittäjä2: "+result[4];
		return { definition : def, notation_object : obj};
	}

	//result=part.match(/\S+-\S+(-\S+)*$/);
	//Why the following matches for example c#-d-3, but not c-d#-3? The idea is not to accept either.
	result=part.match(/[\w,'\.]+-[\w,'\.]+(-[\w,'\.]+)*$/);
	/*
	If notes before beam group are too long to be beamed, the beam group will get it's own context, where
	default duration is 1/8, and after beam group the common context is updated so that 
	the default duration is 1/4. 
	If notes before beam group are short enough to be beamed, the beam group uses the common context.
	*/
	if (result!=null) {
		def = "Beam group. Parts: ";
		bparts=part.split(/-/);
		obj=new BeamGroup();
		if (context.default_duration.denominator<8) {
			console.log("Length shortened")
			//create temporary context for beam group only
			bgContext={default_duration: new Duration(8, 0)};
			lengthShortened=true;
		}
		else {
			bgContext=context;
			lengthShortened=false;
		}
		for (i=0; i<bparts.length; ++i) {
			def+=bparts[i]+" ";
			bo=analyseMelodyPart(bparts[i], bgContext).notation_object;
			obj.push(bo);
		}
		if (lengthShortened) {
			console.log("Length restored")
			context.default_duration.denominator=4;
			context.default_duration.dots=0;
		}
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^k:(\d)([b#])$/);
	if (result!=null) {
		def = "Key signature. "+result[1]+" times "+result[2];
		var sharps=Number(result[1]);
		if (result[2]=='b') {
			sharps=-sharps;
		}
		obj = new KeySignature(sharps);
		return { definition : def, notation_object : obj};
	}
	
	result=part.match(/^\|$/);
	if (result!=null) {
		def = "Bar line (normal). ";
		obj = new BarLine(BarLine.NORMAL);
		return { definition : def, notation_object : obj};
	}
	
	//+ mark is handled as | to support it somehow
	result=part.match(/^\+$/);
	if (result!=null) {
		def = "Bar line (normal). ";
		obj = new BarLine(BarLine.NORMAL);
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^\|\:$/);
	if (result!=null) {
		def = "Bar line (start repeat). ";
		obj = new BarLine(BarLine.START_REPEAT);
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^\:\|$/);
	if (result!=null) {
		def = "Bar line (end repeat). ";
		obj = new BarLine(BarLine.END_REPEAT);
		return { definition : def, notation_object : obj};
	}



	result=part.match(/^'$/);
	if (result!=null) {
		def = "Breath. ";
		obj = new Breath();
		return { definition : def, notation_object : obj};
	}

	result=part.match(/^\/$/);
	if (result!=null) {
		def = "System break. ";
		obj = new SystemBreak();
		return { definition : def, notation_object : obj};
	}

	//Seuraava tuntuu toimivan, vaikkakin hyväksyy nuotteihin pisteitä, vaikkei niissä olisi kestokoodia, ja kestokoodiksi minkä vain kokonaisluvun
	result=part.match(/^((?:[cdfg](?:es|is|eses|isis)?)|(?:e(?:ses|isis|is|s)?)|(?:a(?:s|sas|is|isis)?)|hisis|his|h|bes|b)([,']*)(\d*)(\.*)$/);
	if (result!=null) {
		var noteName=result[1];
		var octaveShifts=result[2];
		var lengthNumber=result[3];
		var dotCount=result[4].length;

		var ret="Note "+noteName;
		if (octaveShifts) {
			ret+=", octave shifts: "+octaveShifts+" ("+countOctaveShifts(octaveShifts)+")";
		}
		if (lengthNumber) {
			ret+=", length number:"+lengthNumber;
		}
		if (result[4]) {
			ret+=", "+dotCount+" times dotted";
		}
		def = ret;
		
		if (lengthNumber) {
			if (lengthNumber=="6") {
				lengthNumber="16";
			}
			else if (lengthNumber=="3") {
				lengthNumber="32";
			}
			length=Number(lengthNumber);
			context.default_duration.denominator=length;
			context.default_duration.dots=dotCount;
			//def+=(" now prevLength="+context.prevLength);
		}
		else {
			length=context.default_duration.denominator;
			dotCount=context.default_duration.dots;
			//def+="Using prevLength ("+context.prevLength+")and PrevDotCount.";
		}
		//line, sharps, denominator, dots)
		pc=pitchCodes(noteName);
		def+=" Length = "+length;
		pitch=new Pitch(pc.line+countOctaveShifts(octaveShifts)*7, pc.sharps);
		duration=new Duration(length, dotCount);
		obj = new Note(pitch, duration);
		return { definition : def, notation_object : obj};
	}
	
	//Brevis
	result=part.match(/^\|((?:[cdfg](?:es|is|eses|isis)?)|(?:e(?:ses|isis|is|s)?)|(?:a(?:s|sas|is|isis)?)|hisis|his|h|bes|b)([,']*)\|$/);
	if (result!=null) {
		var noteName=result[1];
		var octaveShifts=result[2];

		var ret="Brevis note "+noteName;
		if (octaveShifts) {
			ret+=", octave shifts: "+octaveShifts+" ("+countOctaveShifts(octaveShifts)+")";
		}

		def = ret;
		
		context.default_duration.denominator=1;
		context.default_duration.dots=0;
		
		//line, sharps, denominator, dots)
		pc=pitchCodes(noteName);
		pitch=new Pitch(pc.line+countOctaveShifts(octaveShifts)*7, pc.sharps);
		duration=new Duration(1, 0);
		obj = new Note(pitch, duration);
		return { definition : def, notation_object : obj};
	}
	
	//seuraava tuntuu toimivan, vaikkakin hyväksyy taukoihin pisteitä, vaikkei niissä olisi kestokoodia.
	result=part.match(/^r(\d?)(\.*)$/);
	if (result!=null) {
		var ret="Rest.";
		var lengthNumber=result[1];
		var dotCount=result[2].length;
		
		if (lengthNumber) {
			ret+=" Length number:"+result[1];
		}
		if (result[2]) {
			ret+=", "+dotCount+" times dotted";
		}
		
		if (lengthNumber) {
			if (lengthNumber=="6") {
				lengthNumber="16";
			}
			else if (lengthNumber=="3") {
				lengthNumber="32";
			}			
			length=Number(lengthNumber);
			context.default_duration.denominator=length;
			context.default_duration.dots=dotCount;
			//def+=(" now prevLength="+context.prevLength);
		}
		else {
			length=context.default_duration.denominator;
			dotCount=context.default_duration.dots;
			//def+="Using prevLength ("+context.prevLength+")and PrevDotCount.";
		}
		duration=new Duration(length, dotCount);
		obj = new Rest(duration);
		
		def = ret;
		return { definition : def, notation_object : obj};
	}
	if (!def) {
		def = "unknown part";
	}
	return { definition : def, notation_object : obj};

}

function pitchCodes(name) {
	var l;
	var s=0;
	var root=name.substr(0,1).toLowerCase();
	var ri="cdefgah".indexOf(root);
	if (ri>-1) {
		l=ri;
	}
	else if (root=="b") {
		l=6;
		s=-1;
	}
	s+=countSharps(name);
	return {line: l, sharps: s};
}

function countSharps(name) {
	var sCount=0;
	var iCount=0;
	var c;
	for (var i=0; i<name.length; ++i) {
		c=name.substr(i,1);
		if (c=="s") {
			sCount++;
		} 
		else if (c=="i") {
			iCount++;
		}
	}
	return -sCount+2*iCount;
}

function countOctaveShifts(s) {
	o=0;
	for (var i=0; i<s.length; ++i) {
		c=s.substr(i,1);
		if (c==",") {
			o--;
		} 
		else if (c=="'") {
			o++;
		}
	}
	return o;
}
