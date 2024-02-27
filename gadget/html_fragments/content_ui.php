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

<!-- <h3>Valitse aineisto</h3> -->
<table>
<tr>
 <td><input type=radio name="data" id="book_radio" value="book" class="for_logged_in_users hidden" checked></td><td><label for="book_radio">Kirja:</label></td>

<td>
<select id="book_select_element" name="book">
</select>
</td>
</tr>

<tr class="for_logged_in_users hidden">

<td><input type=radio name="data" id="list_radio" value="list" class="for_logged_in_users hidden" ></td> <td><label for="list_radio">Laululista:</label></td>
<td>
<select id="list_select_element" name="list">
</select>

<a href="#" id="delete_list">Poista</a>

</td><td>
</tr>
<tr>
<td colspan=2>Nro/Alkusanat: </td><td><input type="text" id="filter_text"></td>
</tr>
</table>
<div id="delete_list_info" class="hidden"></div>
