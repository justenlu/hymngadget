<!--
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
-->

<div>

<div id="edit_song_ui" class="hidden border">
  
<div id="editor_tabs">
  <ul>
  <li><a href="#edit_metadata_ui">Teostiedot</a></li>
  <li><a href="#edit_melody_ui">Melodia</a></li>
  <li><a href="#edit_chords_ui">Soinnut</a></li>
  <li><a href="#edit_lyrics_ui">Sanat</a></li>
  <li><a href="#abc_notation" class="debug">ABC-notaatio</a></li>
  </ul>
<div id='edit_metadata_ui'>

<span id="sql_id_div" class="small"></span>

<table>
<tr><td>Numero</td><td><input id="number_field" class="metadata editor" type=text></td>
<td>Variantti</td><td><input id="variant_field" class="metadata editor" type=text></td></tr>
<tr><td>Nimi</td><td><input id="name_field" class="metadata editor" type=text></td><td></td><td></td></tr>
<tr><td>Sävelmän alkuperä</td><td><input id="origin_of_melody_field" class="metadata editor" type=text></td></tr>
<tr><td>Muita tietoja</td><td><textarea id="information_field" class="metadata editor"></textarea></td><td></td><td></td></tr>
</table>

</div>

<div id='edit_melody_ui'>
<textarea name="melody_code" id="melody_field" class="editor" rows="3" cols="70"></textarea>
</div>

<div id='edit_chords_ui'>
<button id="add_harmonisation_button" class="editor">Lisää uusi soinnutus</button><br><br>
<textarea name="chords_code" id="chords" class="harmonisation editor for_selected_harmonisation" rows="3" cols="70"></textarea>
<br>
<br>
<span class="for_selected_harmonisation">Vapaa kuvaus: <input type="text" name="chords_description" id="chords_description_element" class="harmonisation editor"></span>
</div>

<div id='edit_lyrics_ui'>
<textarea name="lyrics_code" id= "lyrics_textarea" class="editor" rows="3" cols="70"></textarea>
</div>

<div id='abc_notation' class="debug">
<textarea id="abc-notation" rows="12" cols="70"></textarea>
</div>
</div>
<br>
<button id="preview_button" class="editor">Esikatsele</button>
<button id="save_button" class="editor">Tallenna</button>

<span id='editor_info'>
</span>

<br><br>