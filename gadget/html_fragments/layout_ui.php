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

<input type='checkbox' id='wide_checkbox' checked><label for="wide_checkbox">Yhdistä peräkkäiset viivastot</label></input> 
&nbsp;&nbsp; | &nbsp;&nbsp;
Viivaston leveys <input type=text size=3 id='system_width' value='1000'></input> pikseliä 
<!-- | Suurennus <input type=text size=3 id='zoom' value='100'></input> --> 
&nbsp;&nbsp; | &nbsp;&nbsp;
Rinnakkaisia säkeistöjä 
<select id="verse_columns">
  <option value=2>2</option>
  <option value=3>3</option>
  <option value=4>4</option>
  <option value=5>5</option>
  <option value=6 selected>6</option>
</select>
&nbsp;&nbsp;
<button id="update_layout">Päivitä</button>
