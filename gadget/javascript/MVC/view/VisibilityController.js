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

function VisibilityController(list, logger) {
	this.list=list;
	this.logger=logger;
	$('#editor_visibility_checkbox').change(function() {
		if ($('#editor_visibility_checkbox').is(':checked')) {
			$('#lyrics_div').hide("fast");
			$('#edit_song_ui').show("fast");
		}
		else {
			$('#edit_song_ui').hide("fast");
			$('#lyrics_div').show("fast");
		}
	});
	
	$('#customiser_visibility_checkbox').change(function() {
		if ($('#customiser_visibility_checkbox').is(':checked')) {
			$('#control_song_ui').show("fast");
		}
		else {
			$('#control_song_ui').hide("fast");
		}
	});
	
	$('#selector_visibility_checkbox').change(function() {
		if ($('#selector_visibility_checkbox').is(':checked')) {
			$('#song_select_ui').show("fast");
		}
		else {
			$('#song_select_ui').hide("fast");
		}
	});
	
	$('#selected_visibility_checkbox').change(function() {
		if ($('#selected_visibility_checkbox').is(':checked')) {
			$('#TOC_checkboxes').show();
			$('#index_td').show("fast");
		}
		else {
			$('#TOC_checkboxes').hide();
			$('#index_td').hide("fast");
		}
	});
	
	$('#notation_visibility_checkbox').change(function() {
		if ($('#notation_visibility_checkbox').is(':checked')) {
			$('#notation_td').show("fast");
		}
		else {
			$('#notation_td').hide("fast");
		}
	});
	
	$('#modify_lists_checkbox').change(function() {
		if ($('#modify_lists_checkbox').is(':checked')) {
			$('#modify_lists').show("fast");
		}
		else {
			$('#modify_lists').hide("fast");
		}
	});
	
}

VisibilityController.prototype.notify = function() {
	if (this.list.type==SongList.BOOK && this.logger.userId) {
		$('.add_song_button_span').show();
	}
	else {
		$('.add_song_button_span').hide();
	}

	if (this.list.type==SongList.LIST && this.logger.userId) {
		$('.save_list_button_span').show();
	}
	else {
		$('.save_list_button_span').hide();
	}


	if (this.logger.userId) {
		$(".for_logged_in_users").show("slow");		
	}
	else {
		$(".for_logged_in_users").hide("slow");
		$("#modify_lists").hide("slow");
		$("#modify_lists_checkbox").prop("checked", false);
		
	}

	if (this.list.type==SongList.LIST) {
		$(".handle").show();
	}
	else {
		$(".handle").hide();
	}
}

VisibilityController.prototype.notationMode = function() {
	//$("#selector_visibility_checkbox").prop("checked", false);
	//$('#song_select_ui').hide("fast");
	$("#notation_visibility_checkbox").prop("checked", true);
	$('#notation_td').show("fast");
	
}

VisibilityController.prototype.editMode = function() {
	this.notationMode();
	$("#editor_visibility_checkbox").prop("checked", true);
	$('#lyrics_div').hide("fast");	
	$('#edit_song_ui').show("fast");
}

VisibilityController.showSelected = function() {
	$("#selected_visibility_checkbox").prop("checked", true);
	$('#index_td').show("fast");
	
}

VisibilityController.controlVisibility = function (checkbox, controlled) {
	$(checkbox).change(function() {
		if ($(checkbox).is(':checked')) {
			$(controlled).show();
		}
		else {
			$(controlled).hide();
		}
	});
}

/*
<a href="#" onclick="hide_or_show_element_with_id('song_select_ui'); return false;" class="hider">Näytä/piilota valitsija</a>
<a href="#" onclick="hide_or_show_element_with_id('index_td'); return false;" class="hider">Näytä/piilota valitut</a>
<a href="#" onclick="hide_or_show_element_with_id('notation_td'); return false;" class="hider">Näytä/piilota nuottikuva</a>
*/