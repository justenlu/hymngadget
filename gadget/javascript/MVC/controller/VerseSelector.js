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

function VerseSelector(list) {
	this.list=list;
	$("#update_selection").click(list, VerseSelector.selectVersesByEvent);
}

VerseSelector.prototype.notify = function() {
	var item=this.list.getSelectedItem();
	if (!item) {
		return;
	}
	if (item.selectedVerses.hasAll) {
		$('#range_input').val("");
	}
	else {
		$('#range_input').val(item.selectedVerses);
	}
}

VerseSelector.selectVersesByEvent = function(event) {
	var list=event.data;
	var item=list.getSelectedItem();
	var selection_string=$.trim($('#range_input').val());
	var selectedVerses;
	if (selection_string=="") {
		selectedVerses=new RangeSet(true);
	}
	else {
		selectedVerses=parseRange(selection_string);
		selectedVerses.parsedString=selection_string;
	}
	//console.log("In select_verses state.selected_verses="+state.selected_verses);
	//console.log("In select_verses state.selected_verses.min="+state.selected_verses.min);
	console.log("in selectVersusByEvent item="+item);
	item.setSelectedVerses(selectedVerses);
}