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

function Verse(verse_string) {
	this.verse_string=verse_string;
	this.objects = new Array();

	var def_element=document.getElementById("lyrics_definition");
    var obj_element=document.getElementById("lyrics_objects");

	var v;

	var words=verse_string.split(/\s+/);
	var s;
	var i, j;
	
	//remove empty words from the end of the array;
	while (words.length>0 && words[words.length-1].length==0) {
		words.pop();
	}

	
	for (i=0; i<words.length; ++i) {
		s=words[i].split(/-/);
		//remove empty syllables from the end of the array;
		while (s.length>0 && s[s.length-1].length==0) {
			s.pop();
		}
		
		for (j=0; j<s.length-1; ++j) {
			if (s[j]) {
				this.objects.push(new Syllable(removeUnderscores(s[j]), countUnderscores(s[j])+1, false));
			}
		}
		if (s[j]) {
			this.objects.push(new Syllable(removeUnderscores(s[j]), countUnderscores(s[j])+1, true));
		}
    }

	def_element.textContent="";

	obj_element.textContent=this.toString();
}

function countUnderscores(s) {
	var i=s.indexOf("_");
	if (i==-1) {
		return 0;
	}
	else {
		return s.length-i;
	}
}

function removeUnderscores(s) {
	var i=s.indexOf("_");
	if (i==-1) {
		return s;
	}
	else {
		return s.substr(0, i);
	}
}

Verse.prototype.clone = function() {
	var c=new Verse(this.verseString);
	return c;
}

Verse.prototype.toString = function() {
	var s="";
	for (var i=0; i<this.objects.length; ++i) {
		s+=this.objects[i];
	}
	console.log("Verse.prototype.toString called");
	return s;
}

Verse.prototype.getFirstLine = function() {
	return Verse.removeHyphenation(Verse.firstLine(this.verse_string));
	
}

Verse.firstLine = function(text) {
	var line_break=text.indexOf("\n");
	if (line_break>-1) {
		text=text.substr(0, line_break);
	}
	text=text.trim();//Not necessarily supported by browsers
	var last=text.substr(text.length-1);
	if (",.;:".indexOf(last)>-1) {
		text=text.substr(0, text.length-1);
	}
	return text;
}

Verse.removeHyphenation = function(text) {
	var str=text.replace(/-/g, "");
	str=str.replace(/_/g, "");
	return str;
}

Verse.prototype.getHTML  = function() {
	var html_string=Verse.removeHyphenation(this.verse_string);
	html_string=substitute_html_entities(html_string);
	html_string=html_string.replace(/\n/g, "<br>");
	return html_string;
}
