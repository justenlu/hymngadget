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

function Filter() {
	this.observer=new Array();
	//$('#filter_text').keypress(this, Filter.notifyObserversByEvent);
	$('#filter_text').keyup(this, Filter.notifyObserversByEvent);
}

Filter.prototype.addObserver = function(o) {
	this.observer.push(o);
}

Filter.notifyObserversByEvent = function(event) {
	var f=event.data;
	console.log("notify observers of "+f);
	f.notifyObservers();
}

Filter.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

Filter.prototype.clean = function() {
	$('#filter_text').val("");
	this.notifyObservers();
}

/*
Filter.prototype.allowSorting() {
	var filterText=$('#filter_text').val();
	return true;
}
*/

Filter.prototype.include = function (item) {
	var filterText=$('#filter_text').val();
	console.log("filterText:"+filterText);
	if (filterText.match(/^\d+$/)) {
		return item.songNumber==filterText;
	}
	else {
		return item.firstWords.toUpperCase().indexOf(filterText.toUpperCase())==0;
	}
}

Filter.prototype.toString = function () {
	return "filter";
}
