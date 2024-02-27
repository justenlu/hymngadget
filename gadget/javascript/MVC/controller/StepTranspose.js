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

function StepTranspose(list) {
	$("#transpose_down_button").click(list, StepTranspose.transposeDownByEvent);	
	$("#transpose_up_button").click(list, StepTranspose.transposeUpByEvent);
}

StepTranspose.transposeDownByEvent = function (event) {
	var maxSharps=$("#max_sharps_element").val();
	var maxFlats=$("#max_flats_element").val();
	
	var list=event.data;
	var item=list.getSelectedItem();
	item.setTransposeInterval(StepTranspose.calculateTransposeInterval(item.song.notation,
			 					   item.transposeInterval,
								   -1, maxSharps, maxFlats));
}

StepTranspose.transposeUpByEvent = function (event) {
	var maxSharps=$("#max_sharps_element").val();
	var maxFlats=$("#max_flats_element").val();
	
	var list=event.data;
	var item=list.getSelectedItem();
	item.setTransposeInterval(StepTranspose.calculateTransposeInterval(item.song.notation,
			 					   item.transposeInterval,
								   1, maxSharps, maxFlats));
}

StepTranspose.calculateTransposeInterval = function (notation, current_transpose_interval, direction, maxSharps, maxFlats) {
	console.log("transposeSteps");
	transp_semitones=current_transpose_interval.getSemitones();
	var keys=[-5, 2, -3, 4, -1, 6, 1, -4, 3, -2, 5, 0];
	var i;
	var origKeyInd;
	var originalKey=notation.getInitialKey();
	var newSharps;
	for (i=0; i<keys.length; ++i) {
		if (keys[i]==originalKey.sharps) {
			origKeyInd=i;
		}
	}
	do {
		//state.transp_semitones[state.current_song_index]+=direction;
		transp_semitones+=direction;
		var newKeyInd=origKeyInd+transp_semitones;
		while (newKeyInd<0) {
			newKeyInd+=12;
		}
		while (newKeyInd>11) {
			newKeyInd-=12;
		}
		newSharps=keys[newKeyInd]
	} while (direction!=0 && (newSharps>maxSharps || -newSharps>maxFlats));
	
	var newKey=new KeySignature(newSharps);
	console.log("originaKey="+originalKey);
	console.log("newKey="+newKey);
	var originalRoot=originalKey.getMajorRoot();
	var newRoot=newKey.getMajorRoot();
	console.log("originaRoot="+originalRoot);
	console.log("newRoot="+newRoot);

	if (transp_semitones<0) {
		while (newRoot.isHigherThan(originalRoot)) {
			newRoot.line-=7;
		}
	}
	else {
		while (newRoot.isLowerThan(originalRoot)) {
			newRoot.line+=7;
		}
	}
	console.log("newRoot="+newRoot);
	var interval=originalRoot.intervalTo(newRoot);
	console.log("interval="+interval);

	return interval;
}