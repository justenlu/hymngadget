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

function NotationView(songList, preferences) {
	this.list=songList;
	this.preferences=preferences;
}

NotationView.prototype.notify = function() {
	//console.log("in updateViews state.selected_verses="+state.selected_verses);
	var item=this.list.getSelectedItem();
	
	if (item==null) {
		return;
	}

	var song=item.song;
	var selected_verses;
	
	if (this.preferences.selectVerses) {
		selected_verses=item.selectedVerses;
		if (!selected_verses.hasValue(item.selectedVerse)) {
			item.setSelectedVerse(item.selectedVerses.min);
		}
	}
	else {
		selected_verses=new RangeSet(true);
	}

	//console.log("Current song index is "+state.current_song_index);
	//console.log("Transpose by "+state.transpose_interval[state.current_song_index]);
	if (this.preferences.transpose) {
		song.transposedNotation.setTitle(item.songNumber);
		song.transposedNotation.setComposer(item.originOfMelody);		
		NotationView.render(song.transposedNotation, this.preferences); 
	}
	else {
		song.notation.setTitle(item.songNumber);
		song.notation.setComposer(item.originOfMelody);
		NotationView.render(song.notation, this.preferences); 
	}
	//console.log("in updateViews, state.selected_verses["+state.current_song_index+"]="+selected_verses);
	NotationView.showOtherVerses(song.lyrics, selected_verses, item.selectedVerse, this.preferences); 
	NotationView.activateVerses(item, song.lyrics, item.selectedVerse+1); 	
    NotationView.activateVerseButtons(item, song.lyrics);
	$('#information_div').html(substitute_html_entities(item.information));

}

NotationView.showOtherVerses = function(lyrics, selected_verses, selected_verse, preferences) {
	console.log("ShowOtherVerses");
	$("#current_verse").html("<table><tr><td width='20'></td><td>"+
		NotationView.getVerseButtons(lyrics, selected_verses, selected_verse)+"</td></tr></table>");
	$("#lyrics_div").html(lyrics.getHTML(selected_verse+1, selected_verses, preferences.verseColumns));
}

NotationView.getVerseButtons = function(lyrics, selectedVerses, selectedVerse) {
	var html="";
	var verseCount=0;
	for (i=0; i<lyrics.verses.length; ++i) {
		if (lyrics.verses[i] === undefined) continue; //verses array may be sparse
		if (!selectedVerses.hasValue(i)) continue;
		verseCount++;
		if (i==selectedVerse) {
			html+=i+" ";
		}
		else {
			html+="<button id='verse_button"+i+"'>"+i+"</button>";
		}
	}
	if (verseCount>1) {
		return html;
	}
	else {
		return "";
	}
	
}

NotationView.activateVerseButtons = function(item, lyrics) {
	var i;
	for (i=0; i<lyrics.verses.length; ++i) {
		if (lyrics.verses[i] === undefined) continue; //verses array may be sparse
		$("#verse_button"+i).click({item:item, verse:new Number(i)}, NotationView.selectVerseByEvent);
	}
	
}


NotationView.activateVerses = function(item, lyrics, first) {
	console.log("activateVerses, lyrics="+lyrics+", first="+first);
	$("td.verse").mouseover(function()  { $(this).css("background-color", "gray"); });
	$("td.verse").mouseout(function()  { $(this).css("background-color", "white"); });

	if (!first) {
		first=2;
	}


	for (i=first; i<lyrics.verses.length; ++i) {
		if (lyrics.verses[i] === undefined) continue; //verses array may be sparse
		$("#verse"+i).click({item:item, verse:new Number(i)}, NotationView.selectVerseByEvent);
	}

}

NotationView.selectVerseByEvent = function(event) {
	console.log("select_verse_by_object, event.data= "+event.data);
	event.data.item.setSelectedVerse(event.data.verse);
}

NotationView.render = function (notation, preferences) {
	console.log("Render()");
	var lowest_text_field=document.getElementById("lowest");
	var highest_text_field=document.getElementById("highest");
	
	abc=notation.getABC(preferences.wide, preferences.chords);
	
	$('#abc-notation').val(abc);//for debugging purposes

	if (notation.lowestPitch.line<100) {
		lowest_text_field.value=notation.lowestPitch;
		highest_text_field.value=notation.highestPitch;
	}
	else {
		lowest_text_field.value="";
		highest_text_field.value="";
	}
	
	ABCJS.renderAbc('rendered', abc, {}, {scale:preferences.zoom/100, staffwidth:preferences.width}); 
	
	//ABCJS.renderAbc('rendered', abc, {}, {scale:2.0});
	//ABCJS.renderAbc('ambit', notation.getAmbitusAsABC(), {}, {scale:zoom/100, staffwidth:50});
	//ABCJS.renderMidi('midi_div', abc, {}, {qpm:110, program:74}); 
}