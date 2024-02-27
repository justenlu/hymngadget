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

function SongList() {
	this.item=new Array();
	this.observer=new Array();
	this.type=-1;
	this.sourceId=-1;
	this.selectedIndex=-1;
	this.selectedItem=null;
	this.hasUnsavedChanges=false;
}

SongList.BOOK=0;
SongList.LIST=1;

SongList.prototype.deselect = function() {
	this.selectedIndex=-1;
	this.selectedItem=null;
	this.notifyObservers();
}

/*
 * Returns the item that was selected last. The item might be from different list than the current list.
 */
SongList.prototype.getSelectedItem = function() {
	if (this.selectedIndex>-1) {
		this.selectedItem=this.item[this.selectedIndex];
	}
	return this.selectedItem;
}

SongList.prototype.getCheckedItems = function() {
	var i;
	var j;
	var ci=new Array();
	var added;
	for (i=0; i<this.item.length; ++i) {
		it=this.item[i];
		if (it.checked) {
			added=false;
			for (j=0; !added && j<ci.length; ++j) {
				if (it.order<ci[j].order) {
					ci.splice(j, 0, it);
					added=true;
				}
			}
			if (!added) {
				ci.push(it);
			}
		}
	}
	return ci;
}

SongList.prototype.addObserver = function(o) {
	this.observer.push(o);
}

SongList.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

SongList.prototype.notify=function() {
	this.notifyObservers();
}

SongList.prototype.reloadSongs = function() {
	var i;
	for (i=0; i<this.item.length; ++i) {
		this.item[i].song=null;
	}
	this.select(this.selectedIndex);
}

SongList.prototype.select = function(index) {
	if (index==-1) {
		return;
	}
	console.log("selecting index "+index+" ("+this.item[index].firstWords+")");
	this.selectedIndex=index;
	var thisList=this;
	
	if (!this.item[index].song) {
		jQuery.getJSON("json_php/song.php?id="+this.getSelectedItem().songId, function(s) {
			thisList.loadSong(s);
		});
	}
	else {
		console.log("No need for loadSong");
		this.notifyObservers();
	}
}

SongList.prototype.hasItems = function() {
	return this.items.length>0;
}

SongList.prototype.loadSong = function (s) {
	console.log("loadSong");
	var item=this.getSelectedItem();
	
	var harmonisation;
	var i;
	
	item.selectedVerse=1;
	/*
	if (s.transpose_interval && s.transpose_interval_quality) {
		item.transposeInterval=new Interval(Number(s.transpose_interval), Number(s.transpose_interval_quality));
	}
	
	if (s.verse_selection) {
		item.selectedVerses=parseRange(s.verse_selection);
		item.selectedVerses.parsedString=s.verse_selection;
	}
	
	if (s.harmonisation) {
		item.harmonisationId=s.harmonisation;
	}
	*/
	var song=new Song(item, s);
	//song.addObserver(this);
	item.song=song;
	song.addObserver(this);
	
	$("#sql_id_div").html("song id="+song.id);
	//$("#song_select_ui").hide("slow");
	//$("#notation_td").show();
	//song.updateNotation();//ok?
	this.notifyObservers();
	
}

SongList.prototype.deleteItemsById = function(itemArray) {
	if (this.type!=SongList.LIST) {
		return;
	}
	var i=0;
	var j;
	var k;
	var deleted;
	while (i<this.item.length) {
		j=0;
		deleted=false;
		while (!deleted && j<itemArray.length) {
			if (this.item[i].id==itemArray[j]) {
				
				for (k=0; k<this.item.length; ++k) {
					if (this.item[k].order>this.item[i].order) {
						this.item[k].order--;
					}
				}
				
				this.item.splice(i, 1);
				itemArray.splice(j, 1);
				deleted=true;
			}
			else {
				j++;
			}
		}
		if (!deleted) {
			i++;
		}
	}
	this.notifyObservers();
}

SongList.prototype.addSong = function() {
	if (this.type!=SongList.BOOK) {
		return;
	}
	var data={};
	data.book_id=this.sourceId;
	var thisSongList=this;

	jQuery.getJSON("json_php/addSong.php", data, function(songId) {
		var song={};
		var it=new Item();
		
		song.id=songId;
		song.number="";
		song.variant="";
		song.name="";
		song.melody_code="";
		song.verses=new Array();
		song.harmonisations=new Array();
		song.book=data.book_id;
		
		song=new Song(it, song);
		it.song=song;
		song.addObserver(thisSongList);
		
		
		it.songId=song.id;
		it.transposeInterval=new Interval(0,0);
		it.selectedVerses=new RangeSet(true);
		it.selectedVerse=1;
		it.harmonisationId=null;
		it.songNumber="";
		it.firstWords="";
		thisSongList.item.unshift(it);
		it.addObserver(thisSongList);
		thisSongList.select(0);
				
	});
}

SongList.prototype.loadBook = function(book) {
	console.log("loadBook");
	var thisList=this;
	var params;
	/*
	if (!book) {
		book=SongList.DEFAULT_BOOK;
	}
	*/
	params="?book="+book;
	jQuery.getJSON("json_php/song_index.php"+params, function(index_array) {
		thisList.type=SongList.BOOK;
		thisList.sourceId=book;
		thisList.selectedIndex=-1;
		thisList.setItems(index_array)
	});
}

SongList.prototype.loadList = function(list) {
	console.log("loadList");
	var thisList=this;
	var params;
	/*
	if (!list) {
		list=state.current_list_id;
	}
	*/
	params="?list="+list;
	jQuery.getJSON("json_php/songs_in_list_index.php"+params, function(index_array) {
		thisList.type=SongList.LIST;
		thisList.sourceId=list;
		thisList.selectedIndex=-1;
		thisList.setItems(index_array)
	});
}

SongList.prototype.setItems = function(index_array) {
 
	var id;
	var number;
	var first_words;
	var link_start_tag;
	var it;
	var transposeInterval;
	var transposeIntervalQuality;
	var order=1;
	
	this.item=new Array();

	for (i=0; i<index_array.length; ++i) {
		it=new Item();
		
		if (index_array[i].item_id) {
			it.id=index_array[i].item_id;
		}
		
		it.songId=index_array[i].song_id;

		transposeInterval=index_array[i].transpose_interval;
		transposeIntervalQuality=index_array[i].transpose_interval_quality;
		if (transposeInterval && transposeIntervalQuality) {
			it.transposeInterval=new Interval(Number(transposeInterval), Number(transposeIntervalQuality));
		}
		else {
			it.transposeInterval=new Interval(0,0);
		}
		
		if (index_array[i].verses) {
			it.selectedVerses=parseRange(index_array[i].verses);
			it.selectedVerses.parsedString=index_array[i].verses;
		}
		else {
			it.selectedVerses=new RangeSet(true);
		}
		
		if (index_array[i]["harmonisation"]) {
			it.harmonisationId=index_array[i]["harmonisation"];
		}
		else {
			it.harmonisationId=null;
		}
		
		it.songNumber=index_array[i]["number_with_variant"];
		it.firstWords=index_array[i]["first_words"];
		it.firstWords=it.firstWords.replace(/-/g, "");
		it.firstWords=it.firstWords.replace(/_/g, "");
		it.firstWords=Verse.firstLine(it.firstWords);
		it.originOfMelody=index_array[i]["origin"];
		it.harmonisationCount=index_array[i]["harmonisation_count"];
		it.information=index_array[i]["information"];
		
		console.log("in SongList.setItem this is "+this);
		
		//Generated now, read from database later in case of lists, when that is implemented
		it.order=order++;
		this.item.push(it);
		it.addObserver(this);
	}
	this.notifyObservers();
}