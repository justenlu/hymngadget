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

SongListView.COLUMN_NAME=["Säkeistöt", "Transponointi", "Soinnutus", "Sävelmän alkuperä", "Soinnutuksia"];

function SongListView(songList, filter, visibilityController) {
	this.songList=songList;
	this.filter=filter;
	this.observer=new Array();
	
	this.visibilityController=visibilityController;
	this.showItemCheckboxes=false;
	var thisSongListView=this;
	
	/*
	 * sortedIndex[1] is the index of the item, that shoud appear first in the view etc. Indexes refer to the item indexes
	 * used in SongList. So to select the item that appears first in the view, call select(sortedIndex[1]) method of
	 * SongList object.
	 */
	this.sortedIndex=new Array();
	
	/*
	 * When the item that appears first in the view is selected, the value of this field is 1. When the item that
	 * appears second in the view is selected, the value of this field is 2 etc.
	 */
	this.selectedOrder=-1;
	
	$('.add_song_button').click(function() {
		visibilityController.editMode();
		thisSongListView.songList.addSong();
	})

	$('#check_all_items').click(function (event) {
		event.preventDefault();
		$('.item_checkbox').attr("checked", "true");
		$('.item_checkbox').each(function() {
			var item_i=Number($(this).attr("id").substr(5));
			thisSongListView.songList.item[item_i].checked=true;
		});
	});

	$('#uncheck_all_items').click(function (event) {
		event.preventDefault();
		$('.item_checkbox').attr("checked", null);
		$('.item_checkbox').each(function() {
			var item_i=Number($(this).attr("id").substr(5));
			thisSongListView.songList.item[item_i].checked=false;
		});
	});

	$('#modify_lists_checkbox').change(function() {
		if ($('#modify_lists_checkbox').is(':checked')) {
			$('.item_checkbox_column').show("fast");
			thisSongListView.showItemCheckboxes=true;
		}
		else {
			$('.item_checkbox_column').hide("fast");
			thisSongListView.showItemCheckboxes=false;
		}
	});


	var checkboxhtml="";
	for (i=0; i<SongListView.COLUMN_NAME.length; ++i) {
		checkboxhtml+="<input type='checkbox' id='show_column_"+i+"'> <label for='show_column_"+i+"'>"+SongListView.COLUMN_NAME[i]+"</label><br>";
	}
	$('#column_selector').html(checkboxhtml);

	
}


SongListView.prototype.addObserver = function(o) {
	this.observer.push(o);
}

SongListView.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

SongListView.prototype.next = function() {
	if (this.selectedOrder>-1 && this.hasNext()) {
		this.select(this.selectedOrder+1);
	}
}

SongListView.prototype.previous = function() {
	if (this.hasPrevious()) {
		this.select(this.selectedOrder-1);
	}
}

SongListView.prototype.first = function() {
	if (this.songList.item.length>0) {
		this.select(1);
	}
}

SongListView.prototype.hasNext = function() {
	return this.selectedOrder>-1 && this.selectedOrder<this.songList.item.length;
}

SongListView.prototype.hasPrevious = function() {
	return this.selectedOrder>1;
}

SongListView.prototype.select = function(i) {
	this.songList.select(this.sortedIndex[i]);
	this.selectedOrder=i;
	this.notifyObservers();
}

/*
 * Define the order where items should appear in the view.
 */
SongListView.prototype.sortIndexes = function() {
	var i;
	for (i=0; i<this.songList.item.length; ++i) {
		if (this.songList.type==SongList.LIST) {
			this.sortedIndex[this.songList.item[i].order]=i;
		}
		else {
			this.sortedIndex[i+1]=i;
		}
	}
}

SongListView.prototype.notify = function () {
	var thisSongListView=this;
	var start_tag="";
	var i_start_tag="";
	var i_end_tag="";
	var item;
	var	index_html="<table id='table_of_contents'>";
	var i;
	var thisSLV=this;
	
	if (this.songList.selectedIndex==-1) {
		this.selectedOrder=-1;
		this.notifyObservers();
	}
	
	index_html+="<thead><tr><th class='handle' hidden></th><th class='item_checkbox_column "+(this.showItemCheckboxes ? "" : "hidden")+"'></th><th>Numero</th><th>Alkusanat</th>";
	
	for (i=0; i<SongListView.COLUMN_NAME.length; ++i) {
		index_html+="<th class='"+($("#show_column_"+i).is(":checked") ? "" : "hidden ")+"column_"+i+"'>"+SongListView.COLUMN_NAME[i]+"</th>";
	}
	index_html+="</thead></tr>";
	index_html+="<tbody class='content'>";
	var id;
	var c;
	var si;

	this.sortIndexes();
	
	for (i=1; i<=this.songList.item.length; ++i) {
		si=this.sortedIndex[i];
		item=this.songList.item[si];

		if (!this.filter.include(item)) continue;
		if (si!=this.songList.selectedIndex) {
			start_tag="<a href='#' class='song_link' id='song_link_"+si+"'>";
			end_tag="</a>";
		}
		else {
			start_tag="<b>";
			end_tag="</b>";
		}
		if (item.unsavedChanges) {
			i_start_tag="<i>";
			i_end_tag="</i>";
		}
		else {
			i_start_tag="";
			i_end_tag="";			
		}
		index_html+="<tr>";
		index_html+="<td class='handle hidden'>&bull;</td>";
		index_html+="<td class='item_checkbox_column "+(this.showItemCheckboxes ? "" : "hidden")+"'><input type='checkbox' id='item_"+si+"' class='item_checkbox'"+(item.checked ? "checked" : "") + "></td>";
		index_html+="<td>"+start_tag+i_start_tag+substitute_html_entities(item.songNumber ? item.songNumber : "?")+i_end_tag+end_tag+"</td>";
		index_html+="<td>"+start_tag+i_start_tag+substitute_html_entities(item.firstWords ? item.firstWords : "-----")+i_end_tag+end_tag+"</td>";
		index_html+="<td class='"+($('#show_column_0').is(':checked') ? "" : "hidden ")+"column_0'>"+substitute_html_entities(item.selectedVerses.toString() ? item.selectedVerses.toString() : "")+"</td>";
		index_html+="<td class='"+($('#show_column_1').is(':checked') ? "" : "hidden ")+"column_1' align='center'>"+item.transposeInterval.getHTML()+"</td>";
		index_html+="<td class='"+($('#show_column_2').is(':checked') ? "" : "hidden ")+"column_2'>"+harmonisation_html(item)+"</td>";
		index_html+="<td class='"+($('#show_column_3').is(':checked') ? "" : "hidden ")+"column_3'>"+substitute_html_entities(item.originOfMelody ? item.originOfMelody : "")+"</td>";
		index_html+="<td class='"+($('#show_column_4').is(':checked') ? "" : "hidden ")+"column_4' align='center'>"+substitute_html_entities(item.harmonisationCount ? item.harmonisationCount : "")+"</td>";
		index_html+="</tr>\n";
	}
	index_html+="</tbody></table>";
	/*
	$("#index").html("");
	$(index_html).appendTo("#index");
	*/
	$("#index").html(index_html);
	
	
	if (this.songList.type==SongList.LIST) {
		$(".handle").show();

		$("#table_of_contents tbody.content").sortable({ handle: ".handle",  stop: function() {
			var i;
			var item=thisSongListView.songList.item;
			$('.item_checkbox').each(function(index) {
				var item_i=Number($(this).attr("id").substr(5));
				var item=thisSongListView.songList.item[item_i];
				item.order=index+1;
				if (item==thisSongListView.songList.getSelectedItem()) {
					thisSongListView.selectedOrder=index+1;
				}
			});
			thisSongListView.sortIndexes();
			thisSongListView.notifyObservers();
		}});
		
		$("#table_of_contents tbody.content").disableSelection();
	} 
	else {
		$(".handle").hide();
	}
	
	
	for (i=0; i<SongListView.COLUMN_NAME.length; ++i) {
		VisibilityController.controlVisibility("#show_column_"+i, ".column_"+i);
	}
	
	$(".song_link").click(function(event) {
		var item_i=Number($(event.target).attr("id").substr(10));
		var so=thisSongListView.songList.item[item_i].order;
		thisSongListView.visibilityController.notationMode();
		thisSongListView.select(so);
		thisSongListView.notifyObservers();
	});
	
	
	//Save checked state to items
	$(".item_checkbox").change(function(event) {
		var item_i=Number($(event.target).attr("id").substr(5));
		thisSLV.songList.item[item_i].checked=$(event.target).attr("checked");
	});
	
	
	$(".add_song_button").prop('disabled', true);	

	if (this.songList.type==SongList.BOOK) {
		jQuery.getJSON("json_php/rights.php", {book_id:this.songList.sourceId}, function(response) {
			console.log("Got a rensponse from rights.php")
			$(".add_song_button").prop('disabled', !response.add_song);				
		});	
	}
	
	//console.log("index_html is "+index_html);
	function harmonisation_html(item) {
		if (!item.song || !item.harmonisationId) {
			return "";
		}
		var s=item.song.harmonisations_by_id[item.harmonisationId].description;
		return s ? substitute_html_entities(s) : "";
	}
}
/*
SongListView.selectItemByEvent = function(event) {
	event.preventDefault();
	console.log("selectItemByEvent");
	event.data.visibilityController.notationMode();
	event.data.songList.select(event.data.index);
}
*/