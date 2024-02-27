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

/**
 * Creates the editor.
 * @param {SongList} list The list who's selected song is to be edited.
 * @param {Logger} logger The Logger object.
 * @class Class for editing songs.
 */
function Editor(list, logger) {
	this.list=list;
	this.logger=logger;
	var thisEditor=this;
	$("#save_button").click(function() {
		$('#editor_info').html("Tallennetaan...").show();
		var item=thisEditor.list.getSelectedItem();
		var song=item.song;
		thisEditor.updateSong();
		Database.saveSong(item, function() {
			$('#editor_info').html("Laulu tallennettu.").delay(2000).fadeOut();
		});
	});
	
	$("#preview_button").click(function() {
		thisEditor.updateSong();
	});
	
	$("#add_harmonisation_button").click(function() {
		thisEditor.addHarmonisation();
	});
	
}

Editor.prototype.addHarmonisation  = function() {
	var item=this.list.getSelectedItem();
	var song=item.song;
	var thisEditor=this;
	var data={};
	data.song_id=song.id;
	data.description="Uusi soinnutus";
	jQuery.getJSON("json_php/addHarmonisation.php", data, function(harmonId) {
		var harmon={};
		harmon.id=harmonId;
		harmon.description=data.description;
		harmon.notation="";
		harmon.owner=thisEditor.logger.userId;//server will use the user id from the session, whitch should be the same as this
		song.harmonisations.push(harmon);
		song.harmonisations_by_id[harmonId]=harmon;
		item.harmonisationId=harmonId;
		item.notifyObservers();
	});
}

Editor.prototype.updateSong = function() {
	var item=this.list.getSelectedItem();
	var song=item.song;
	song.melodyCode=$('#melody_field').val();
	song.notation=parseMelody(song.melodyCode);
	song.lyricsCode=$('#lyrics_textarea').val();
	song.lyrics=parseLyrics(song.lyricsCode);
	song.number=$('#number_field').val();
	song.variant=$('#variant_field').val();
	item.songNumber=song.number+song.variant;
	song.name=$('#name_field').val();
	if (item.harmonisationId) {
		song.harmonisations_by_id[item.harmonisationId].notation=$('#chords').val();
		song.harmonisations_by_id[item.harmonisationId].description=$('#chords_description_element').val();
		song.harmonisations_by_id[item.harmonisationId].model=parseChords($('#chords').val());
		song.modifiedHarmonisations.add(item.harmonisationId);
	}
	item.firstWords=song.getFirstWords();
	item.originOfMelody=$('#origin_of_melody_field').val();
	item.information=$('#information_field').val();
	item.unsavedChanges=true;
	song.updateNotation();
	item.notifyObservers();
}

Editor.prototype.notify = function() {
	console.log("Editor was notified");

	var item=this.list.getSelectedItem();
	if (item==null) {
		return;
	}
	var song=item.song;
	var user=this.logger.userId;

	$(".editor").prop('disabled', true);	
	
	if (song.harmonisations.length>0) {
		$(".for_selected_harmonisation").show("fast");	
	}
	else {
		$(".for_selected_harmonisation").hide("fast");		
	}

	var request_data={};
	request_data.book_id=song.book;
	jQuery.getJSON("json_php/rights.php", request_data, function(response) {
		console.log("Got a rensponse from rights.php")
		$(".metadata").prop('disabled', !response.edit_metadata);				
		$("#melody_field").prop('disabled', !response.edit_melody);		
		
		var current_harmonisation=song.getCurrentHarmonisation();		
		var own_harmonisation=false;
		if (current_harmonisation) {
			console.log("current_harmonisation.owner="+current_harmonisation.owner);
			own_harmonisation=(current_harmonisation.owner==user);
		}
		
		
		$(".harmonisation").prop('disabled', !response.edit_any_harmonisation && 
		                                     !(response.edit_own_harmonisation && own_harmonisation));				
		$("#lyrics_textarea").prop('disabled', !response.edit_lyrics);	

		$("#add_harmonisation_button").prop('disabled', !response.add_harmonisation);	
		
		var canModify=response.edit_metadata || response.edit_melody || response.edit_any_harmonisation || response.edit_lyrics;
		$("#preview_button").prop('disabled', !canModify);
		$("#save_button").prop('disabled', !canModify);
		
	});
	
	$('#melody_field').val(song.melodyCode);

	$('#lyrics_textarea').val(song.lyricsCode);


	if (item.harmonisationId) {
		$('#chords').val(song.harmonisations_by_id[item.harmonisationId].notation);
		$('#chords_description_element').val(song.harmonisations_by_id[item.harmonisationId].description);
	}
	else {
		$('#chords').val("");
		$('#chords_description_element').val("");
	}

	$('#number_field').val(song.number);
	$('#variant_field').val(song.variant);
	$('#name_field').val(song.name);
	
	$('#origin_of_melody_field').val(item.originOfMelody);
	$('#information_field').val(item.information);
	
	
}