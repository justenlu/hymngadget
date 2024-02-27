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
 * Class for representing a song in a book or a list.
 * @constructor
 */
function Item() {
	/**
   * The database id for this item. Only meaningful in the case of lists, not in the case of books.
   * @type number
   */
	this.id=null;
	
	/**
	* The order number of this item in a list. Meaningles in the case of book.
	*/ 
	this.order=-1;
	
	/**
   * The verse that is currently sung. Value -1 means, that no verse is selected.
   * @type number
   */
	this.selectedVerse=-1;

	/**
   * The song this item representens. Initially null.
   * @type Song
   */	
	this.song=null;
	
	/**
   * The database id for the song this item representens.
   * @type Song
   */	
	this.songId=-1;

	/**
   * Tells how much the song should be transposed when it is attached to this item.
   * @type Interval
   */	
	this.transposeInterval=new Interval(0,0);

	/**
   * The verses that are going to be sung.
   * @type RangeSet
   */	
	this.selectedVerses=new RangeSet(true);
	
	/**
   * The database id of the currently selected harmonisation.
   * @type number
   */
	this.harmonisationId=null;

	/**
   * The number the song of this item has in the song book. This is different from the
   * id song has in the database, whitch is the value of songId field. If the song book has multiple 
   * variants of the same song and they are referred to using a letter after the song number
   * (like 28a and 28b), this field has the letter concatenated to the number. The value of
   * this field is an empty string for a newly constructed Item, when there is no song attached to the
  *  item.
   * @type string
   */
	this.songNumber="";

	/**
   * The first line of the first verse of the song without hyphenation marking. Initially empty
   * string. 
   * @type string
   */
	this.firstWords="";
	
	/**
   * A short description of the origin of the melody of the song, like the name of the composer and the composing year.
   * @type string
   */
	this.originOfMelody="";
	
	/**
   * The number of the harmonisations for the song of this item.
   * @type number
   */
	this.harmonisationCount=0;
	
   /**
   * Other information about the song.
   * @type string
   */
	this.information="";
	
   /**
   * If this item checked for some operation?
   */	
	this.checked=false;

	this.observer=new Array();
	
	this.hasUnsavedCustomisations=false;
}

Item.prototype.setSelectedVerse = function(verse) {
	this.selectedVerse=verse;
	//this.song.updateNotation();
	this.notifyObservers();
}

Item.prototype.setTransposeInterval = function(interval) {
	console.log("Item.prototype.setTransposeInterval: "+interval);
	this.transposeInterval=interval;
	//this.song.updateNotation();
	this.hasUnsavedCustomisations=true;
	this.notifyObservers();
}

Item.prototype.setHarmonisationId = function(id) {
	console.log("Item.prototype.setTransposeInterval: "+interval);
	this.harmonisationId=id;
	//this.song.updateNotation();
	this.hasUnsavedCustomisations=true;
	this.notifyObservers();
}

Item.prototype.setSelectedVerses = function(selectedVerses) {
	this.selectedVerses=selectedVerses;
	this.hasUnsavedCustomisations=true;
	this.notifyObservers();
}

Item.prototype.addObserver = function(o) {
	this.observer.push(o);
}

Item.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

Item.prototype.toString = function() {
	return "item";
}