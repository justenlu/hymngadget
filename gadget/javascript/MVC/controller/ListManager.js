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
 * Adds songs to lists and removes them from lists.
 * @param {SongList} songList The list whos items are going to be added or removed.
 */
function ListManager(songList) {
	this.songList=songList;
	this.observer=new Array();
	this.selectedList=-1;
	var thisListManager=this;
	
	this.loadSongListCatalog();
	
	$('#save_marked_items_as_new_list').click(function (event) {
		event.preventDefault();
		thisListManager.saveCheckedItems(true);
	});

	$('#add_marked_items_to_existing_list').click(function (event) {
		event.preventDefault();
		thisListManager.saveCheckedItems(false);
	});
	
	$('#destination_list_select_element').change(function() {
		thisListManager.selectedList=$('#destination_list_select_element').val();
	});
	
	$('#delete_marked_items_from_list').click(function (event) {
		event.preventDefault();
		thisListManager.deleteCheckedItems();
	});
	
	$('#delete_list').click(function (event) {
		event.preventDefault();
		thisListManager.deleteList();
	});
	
	$('.save_list_button').click(function (event) {
		thisListManager.saveList();
	});

}

ListManager.prototype.deleteList = function() {
	var t=this;
	$('#delete_list_info').html("Poistetaan lista...").show();
	var data={};
	data.list_id=$("#list_select_element").val();
	
	jQuery.getJSON("json_php/delete_list.php", data, function(reply) {
		if (reply.deleted) {
			$('#delete_list_info').html("Poistettiin lista <i>"+substitute_html_entities(reply.name)+"</i>.").delay(2000).fadeOut();
			if (t.songList.type==SongList.LIST && t.songList.sourceId==data.list_id) {
				t.songList.deselect();
			}

			t.notifyObservers();
			t.loadSongListCatalog();
		}
		else {
			$('#delete_list_info').html("Listan poisto epäonnistui.").delay(2000).fadeOut();
		}

	});
}

ListManager.prototype.notify = function() {
	this.loadSongListCatalog();
}

ListManager.prototype.loadSongListCatalog = function() {
	var thisListManager=this;
	jQuery.getJSON("json_php/list_index.php", function(list_array) {
 		var i;
		var id;
		var name;
		$("#destination_list_select_element").html("");
		for (i=0; i<list_array.length; ++i) {
			id=list_array[i]["id"];
			name=list_array[i]["name"];	
			
			if (id==thisListManager.selectedList) {
				selected=" selected";
			}		
			else {
				selected="";
			}
						
			$("<option value='"+id+"'"+selected+">"+substitute_html_entities(name)+"</option>").appendTo("#destination_list_select_element");
		}
	});
}

ListManager.prototype.toString = function() {
	return "ListManager";
}

ListManager.prototype.saveList = function() {
	$('.save_list_info').html("Tallennetaan lista...").show();
	
	var item=this.songList.item;
	var itemArray=new Array();
	var t=this;
	for (i=0; i<item.length; ++i) {
		var it={};
		it.id=item[i].id;
		
		if (item[i].order>-1) {
			it.order_no=item[i].order;
		}
		
		it.transpose_interval=item[i].transposeInterval.interval;
		it.transpose_interval_quality=item[i].transposeInterval.quality;
		it.verses=item[i].selectedVerses.toString();
		if (item[i].harmonisationId) {
			it.harmonisation=item[i].harmonisationId;
		}
		itemArray.push(it);
		
	}
	
	var data={};
	data.item_array=itemArray;
	
	jQuery.getJSON("json_php/save_list.php", data, function(reply) {
		//alert(reply);
		//$('.save_list_info').html("Lista tallennettu.").delay(2000).fadeOut();
		$('.save_list_info').html("Talletettiin "+reply+" laulun tiedot.").delay(2000).fadeOut();
		//alert(reply);
		t.notifyObservers();
		t.loadSongListCatalog();
	});
	
}

ListManager.prototype.saveCheckedItems = function (newList) {
	
	var ci=this.songList.getCheckedItems();
	if (ci.length>0) {
		$('#list_info').html("Kopioidaan merkityt...").show();
	}
	else {
		//alert("Valitse laulut ensin!");
		$('#list_info').html("Valitse laulut ensin!").show().delay(2000).fadeOut();
		return;
	}
	var i;
	var item=new Array();
	var it;
	var thisListManager=this;
	
	for (i=0; i<ci.length; ++i) {
		it={};
		it.song_id=ci[i].songId;
		it.transpose_interval=ci[i].transposeInterval.interval;
		it.transpose_interval_quality=ci[i].transposeInterval.quality;
		it.verses=ci[i].selectedVerses.toString();
		if (ci[i].harmonisationId) {
			it.harmonisation=ci[i].harmonisationId;
		}
		item.push(it);
	}
	var data={};
	if (newList) {
		data.new_list_name=$('#new_list_name').val();
	} else {
		data.list_id=$('#destination_list_select_element').val();
	}
	data.item_array=item;

	jQuery.getJSON("json_php/add_to_list.php", data, function(reply) {
		$('#list_info').html("Laulut kopioitu").delay(2000).fadeOut();
		//alert(reply);
		thisListManager.notifyObservers();
		thisListManager.loadSongListCatalog();
	});
	
}


ListManager.prototype.deleteCheckedItems = function () {
	
	if (this.songList.type!=SongList.LIST) {
		return;
	}
	$('#list_info').html("Poistetaan merkityt listalta...").show();
	
	
	var ci=this.songList.getCheckedItems();
	if (ci.length==0) {
		return;
	}
	var i;
	var item_array=new Array();
	var thisListManager=this;
	
	for (i=0; i<ci.length; ++i) {
		item_array.push(ci[i].id);
	}
	
	data={};
	data.item_array=item_array;

	jQuery.getJSON("json_php/remove_list_items.php", data, function(reply) {
		var info;
		var count=reply.length;
		if (count==0) {
			info="Ei poistettu yhtään laulua listalta.";
		}
		else if (count==1) {
			info="Poistettiin yksi laulu listalta.";
		}
		else if (count>1) {
			info="Poistettiin "+count+" laulua listalta.";
		}
		$('#list_info').html(info).delay(2000).fadeOut();
		thisListManager.songList.deleteItemsById(reply);
	});
	
}

ListManager.showInfo = function(info) {
	$('#list_info').html("<p>"+info+"</p>");
	$('#list_info').slideDown(300).delay(2000).slideUp(500);	
}

ListManager.prototype.addObserver = function(o) {
	this.observer.push(o);
}

ListManager.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}
/*
ListManager.prototype.  = function() {
}
*/