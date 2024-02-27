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

function parseLyrics(lyrics_string) {
	var l = new Lyrics();
	
	var m=lyrics_string.match(/\d+\./);
	if (m==null) {
		l.addVerse(1, new Verse($.trim(lyrics_string)));
		return l;
	}
	
	do {
		m=lyrics_string.match(/\d+\./);
		if (m==null) {
			return l;
		}
		number=m[0];
		number_index=lyrics_string.search(number);
		lyrics_string=lyrics_string.substr(number_index + number.length);
		
		verse_string=lyrics_string;
		has_next_number=false;
		m=lyrics_string.match(/\d+\./);
		if (m!=null) {
			next_number=m[0];
			has_next_number=true;
			next_number_index=lyrics_string.search(next_number);
			verse_string=verse_string.substr(0, next_number_index);
		}
		l.addVerse(Number(number), new Verse($.trim(verse_string)));
		
	} while (has_next_number);

	return l;
}



