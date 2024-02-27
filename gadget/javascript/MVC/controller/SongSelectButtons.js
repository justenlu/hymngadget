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

function SongSelectButtons(listView) {
	this.listView=listView;
	
	$("#first_song_button").click(function() {
		listView.first();
	});
	
	$("#previous_song_button").click(function() {
		listView.previous();
	});
	
	$("#next_song_button").click(function() {
		listView.next();
	});
}

SongSelectButtons.prototype.notify = function() {
	$("#next_song_button").prop('disabled', !this.listView.hasNext());	
	$("#previous_song_button").prop('disabled', !this.listView.hasPrevious());	
	$("#first_song_button").prop('disabled', !this.listView.hasPrevious());	
}