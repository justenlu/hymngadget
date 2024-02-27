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

function substitute_html_entities(str) {
	if (!str) {
		return "";
	}
	str=str.replace(/\"/g, "&quot");
	str=str.replace(/\''/g, "&apos");
	str=str.replace(/&/g, "&amp");
	str=str.replace(/</g, "&lt");
	str=str.replace(/>/g, "&gt");
	return str;
}

function hide_or_show_element_with_id(element_id) {
	$("#"+element_id).toggle("fast");
}

function catenateVerses(verses) {
	var lyrics_code="";
	if (verses!=null) {
		for (i=0; i<verses.length; ++i) {
			lyrics_code+=verses[i].number+".\n";
			lyrics_code+=verses[i].text+"\n";
			if ((i+1)<verses.length) {
				lyrics_code+="\n";
			}
		}
	}
	return lyrics_code;
}