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

function CollectionSelector(list) {
	this.list=list;
	this.selectedBook=CollectionSelector.DEFAULT_BOOK;
	this.selectedList=-1;
	
	this.loadBookCatalog();
	this.loadSongListCatalog();
	
	var cs=this;
	
	$("#book_select_element").change(function() {
		var checked=$('input:radio[name=data]:checked').val();
		if (checked=="book") {
			cs.selectBook();
		}
		else {
			$("#book_radio").click();
		}
	});

	
	$("#list_select_element").change(function() {
		var checked=$('input:radio[name=data]:checked').val();
		if (checked=="list") {
			cs.selectList();
		}
		else {
			$("#list_radio").click();
		}
	});
	$("#list_radio").change(function() {
		cs.selectList();
		});
	$("#book_radio").change(function() {
		cs.selectBook();
		});
}

CollectionSelector.DEFAULT_BOOK=1;

CollectionSelector.prototype.notify = function() {
	this.loadSongListCatalog();
}

CollectionSelector.prototype.selectBook = function() {
	var book_id=$("#book_select_element").val();
	//state.current_book_id=book_id;
	this.selectedBook=book_id;
	VisibilityController.showSelected();
	$('.for_lists').hide("fast");
	this.list.loadBook(book_id);	
}

CollectionSelector.prototype.selectList = function() {
	var list_id=$("#list_select_element").val();
	this.selectedList=list_id;
	VisibilityController.showSelected();
	$('.for_lists').show("fast");
	this.list.loadList(list_id);	
}

CollectionSelector.prototype.loadBookCatalog = function() {
	console.log("loadBookList (jQuery version)");
	var cs=this;
	jQuery.getJSON("json_php/book_index.php", function(list_array) {
		console.log("Populating book list");
 		var i;
		var id;
		var name;
		var selected;
		$("#book_select_element").html("");
		for (i=0; i<list_array.length; ++i) {
			id=list_array[i]["id"];
			name=list_array[i]["name"];	
			if (id==cs.selectedBook) {
				selected=" selected";
				console.log(id+" is same as "+cs.selectedBook);
			}		
			else {
				selected="";
				console.log(id+" is not same as "+cs.selectedBook);
			}
			$("<option value='"+id+"'"+selected+">"+substitute_html_entities(name)+"</option>").appendTo("#book_select_element");
		}
	});
}

CollectionSelector.prototype.loadSongListCatalog = function() {
	console.log("loadSongListList (jQuery version)");
	var cs=this;
	jQuery.getJSON("json_php/list_index.php", function(list_array) {
		console.log("Populating list list");
 		var i;
		var id;
		var name;

		$("#list_select_element").html("");
		for (i=0; i<list_array.length; ++i) {
			id=list_array[i]["id"];
			name=list_array[i]["name"];	
			
			if (id==cs.selectedList) {
				selected=" selected";
			}		
			else {
				selected="";
			}
						
			$("<option value='"+id+"'"+selected+">"+substitute_html_entities(name)+"</option>").appendTo("#list_select_element");
		}
	});
}

