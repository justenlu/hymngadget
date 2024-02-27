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

function Preferences() {
	this.chords=true;
	this.selectVerses=true;
	this.transpose=true;
	this.wide=true;
	this.verseColumns=6;

	this.width=1000;
	this.zoom=100;

	this.readValuesFromUI();

	this.observer=new Array();
	var thisPreferences=this;
	$("#select_verses_checkbox").change(function() {
		thisPreferences.updateByEvent();
	});
	$("#transpose_checkbox").change(function() {
		thisPreferences.updateByEvent();
	});
	$("#chords_checkbox").change(function() {
		thisPreferences.updateByEvent();
	});
	$("#wide_checkbox").change(function() {
		thisPreferences.updateByEvent();
	});
	
	$("#verse_columns").change(function() {
		thisPreferences.updateByEvent();
	});
	
	$("#update_layout").click(function() {
		thisPreferences.updateByEvent();
	});

}

Preferences.prototype.addObserver = function(o) {
	this.observer.push(o);
}

Preferences.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

Preferences.prototype.readValuesFromUI = function() {
	this.selectVerses=$('#select_verses_checkbox').is(':checked');
	this.transpose=$('#transpose_checkbox').is(':checked');
	this.chords=$('#chords_checkbox').is(':checked');
	this.wide=$('#wide_checkbox').is(':checked');
	this.width=Number($('#system_width').val());
	this.zoom=Number($('#zoom').val());
	this.verseColumns=$("#verse_columns").val();
	
}

Preferences.prototype.updateByEvent = function() {
	this.readValuesFromUI();
	this.notifyObservers();
}