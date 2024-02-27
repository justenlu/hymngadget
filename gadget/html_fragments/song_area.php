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
  Näytä: 
  <input type="checkbox" id="customiser_visibility_checkbox"><label for="customiser_visibility_checkbox">Säädöt</label>&nbsp;&nbsp;
  <input type="checkbox" id="editor_visibility_checkbox"><label for="editor_visibility_checkbox">Editori</label>
  &nbsp;
  <!--
  <a href="#" onclick="hide_or_show_element_with_id('control_song_ui'); return false;" class="hider">Näytä/piilota säädöt</a>
  <a href="#" onclick="hide_or_show_element_with_id('edit_song_ui'); return false;" class="hider for_logged_in_users">Näytä/piilota editori</a>
  -->
  <button id="first_song_button" disabled="true">&lt&lt</button>
  <button id="previous_song_button" disabled="true">&lt</button>
  <button id="next_song_button" disabled="true">&gt</button>
  
<div id='control_song_ui' class='hidden border'>
<?php
  include "html_fragments/transpose_ui.php";
  echo '<hr>';
  include "html_fragments/harmonisation_ui.php";
  echo '&nbsp;&nbsp;|&nbsp;&nbsp;';
  include "html_fragments/verses_ui.php";
  include "html_fragments/layout_ui.php";
  ?>
  <br>
  <div class='for_logged_in_users'>
  <br>
  <button id="save_customisation" disabled='true'>Tallenna asetukset kirjaan</button>
  <span id="customiser_info"></span>
  </div>

</div>

<br>

<div id='rendered'></div>



<div id="current_verse"></div>

<div id='lyrics_div'></div>
<br>
<div id='information_div'></div>
<br>
<!-- <div id='midi_div'></div> -->


<?php
  include "html_fragments/editor.php";
?>

<div id="debug_info_for_save" class='hidden'></div>

<!--
</form>
-->

</div>
  

  <?php
  include "html_fragments/debugging_output.php";
  ?>

  </td>


