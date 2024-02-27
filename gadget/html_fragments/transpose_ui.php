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

<table>
<tr>
<td>
<input type="checkbox" id="transpose_checkbox" checked><label for="transpose_checkbox">Transponoi</label>
<td>
<input id="transpose_up_button" type=button value='ylemmäs'><br>
<input id="transpose_down_button" type=button value='alemmas'><br>
</td>
<td>
Salli korkeintaan
<select id="max_sharps_element">
  <option value=0>0</option>
  <option value=1>1</option>
  <option value=2>2</option>
  <option value=3>3</option>
  <option value=4 selected>4</option>
  <option value=5>5</option>
  <option value=6>6</option>
  <option value=7>7</option>
</select>
ylennystä (#) tai
<select id="max_flats_element">
  <option value=0>0</option>
  <option value=1>1</option>
  <option value=2 selected>2</option>
  <option value=3>3</option>
  <option value=4>4</option>
  <option value=5>5</option>
  <option value=6>6</option>
  <option value=7>7</option>
</select>
alennusta (b) etumerkintään.
</td>
</tr>
</table>

<!--
<a href="#" onclick="hide_or_show_element_with_id('advanced_transpose_ui');" class="hider">Lisää/vähennä äänialavalintoja</a><br>
-->
<div id="advanced_transpose_ui" class="hidden">

<table>
<tr>
<td>Laulun ääniala: <input type=text size=3 id="lowest">&nbsp;&nbsp;-&nbsp;&nbsp;<input type=text size=3 id="highest">,&nbsp;&nbsp;
  <select>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
  </select>&nbsp;&nbsp;
</td>
<td>
  <input type="radio" name="quality">ylennystä (#)</input><br>
  <input type="radio" name="quality">alennusta (b)</input>
</td>
<td><div id="ambit"></div></td>
<td>
<button>Päivitä nuottikuva</button>
</td>
</tr>
</table>

<table>
<tr>

  <td>
  <input type='checkbox' id='transpose' onchange='transpose(); render(transposed_notation);'>Transponoi</input>
  </td>
  <td>
  <select id='quality' onchange='transpose(); render(transposed_notation);'>
  <option value='-1'>pieni/vähennetty</option>
  <option value='0'selected="selected">suuri/puhdas</option>
  <option value='1'>ylinouseva</option>
  </select>

  <select id='interval' onchange='transpose(); render(transposed_notation);'>
  <option value='1'>Priimi</option>
  <option value='2' selected='selected'>Sekunti</option>
  <option value='3'>Terssi</option>
  <option value='4'>Kvartti</option>
  <option value='5'>Kvintti</option>
  <option value='6'>Seksti</option>
  <option value='7'>Septimi</option>
  <option value='8'>Oktaavi</option>
  <option value='9'>Nooni</option>
  <option value='10'>Desimi</option>

  </select>
</td>
<td>
<input type="radio" name="direction" value="up" id='direction_up' onchange='transpose(); render(transposed_notation);'>Ylöspäin</input><br>
<input type="radio" name="direction" value="down" id='direction_down' checked onchange='transpose(); render(transposed_notation);'>Alaspäin</input>
</td>
</tr>
</table>
</div>
