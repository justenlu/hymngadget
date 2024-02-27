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

function Database() {
	
}

Database.isNumber = function(s) {
	if (!s) {
		return false;
	}
	else {
		return true;
	}
}

Database.saveSong = function(item, callWhenSaved) {
	var song=item.song;
	var i;
	var harmon;
	var harmonId;
	console.log("saveSong");
	data={};
	data.song_id=song.id;
	//data.book_id=state.current_book_id;
	if (Database.isNumber(song.number)) {
		data.number=song.number;
	}
	data.variant=song.variant;
	data.song_name=song.name;
	data.origin_of_melody=item.originOfMelody;
	data.information=item.information;
	data.poet=song.poet;

	data.melody=song.melodyCode;
    data.verses=song.lyrics.getVersesForSaving();

	data.harmonisations=new Array();
	
	for (i=0; i<song.modifiedHarmonisations.objects.length; ++i) {
		harmon={};
		harmonId=song.modifiedHarmonisations.objects[i];
		harmon.id=harmonId;
		harmon.description=song.harmonisations_by_id[harmonId].description;
		harmon.notation=song.harmonisations_by_id[harmonId].notation;
		data.harmonisations.push(harmon);
	}
	
	console.log("$.param(data)="+$.param(data));
	jQuery.get("json_php/save.php", data, function(message) {
		$("#debug_info_for_save").html(message);
		item.unsavedChanges=false;
		item.notifyObservers();
		callWhenSaved();
	});
	//this.disabled = "disabled"; //Disables the send button
}