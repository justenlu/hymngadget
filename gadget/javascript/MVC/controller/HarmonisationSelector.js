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

function HarmonisationSelector(list) {
	this.list=list;
	$("#chords_select_element").change(list, HarmonisationSelector.selectHarmonisationByEvent);
}

HarmonisationSelector.selectHarmonisationByEvent = function(event) {
	var list=event.data;
	var item=list.getSelectedItem();
	item.setHarmonisationId($("#chords_select_element").val());
}

HarmonisationSelector.prototype.notify = function() {
	$("#chords_select_element").html("");
	var s;
	var item=this.list.getSelectedItem();
	if (item==null) {
		return;
	}
	var song=item.song;
	for (i=0; i<song.harmonisations.length; ++i) {
		s="<option value="+song.harmonisations[i].id;
		if (song.harmonisations[i].id==item.harmonisationId) {
			s+=" selected";
		}
		s+=">"+song.harmonisations[i].description+"</option>";
		$(s).appendTo("#chords_select_element");
	}
	
	if (song.harmonisations.length>1) {
		$('#chords_select_span').show();
	}
	else {
		$('#chords_select_span').hide();
	}
}