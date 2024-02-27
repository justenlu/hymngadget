<?php
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

session_start(); 
?>

<?php include "config_ui.php"; ?>

<html>
<head>
  <title><?php echo $appname; ?></title>
  <link rel="stylesheet" href="styles.css" type="text/css">
  <!--
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
  -->
  <link rel="stylesheet" href="javascript/jquery-ui-1.10.0.custom/css/smoothness/jquery-ui-1.10.0.custom.min.css" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">

  <?php include "html_fragments/scripts.php"; ?>

</head>

<body onload="new HymnGadget();">

<div class="border" id="header">

<div class="border" style="float:left;">
  Näytä: 
  <input type="checkbox" id="selected_visibility_checkbox" checked><label for="selected_visibility_checkbox">Hakemisto</label>&nbsp;&nbsp;
<span id="TOC_checkboxes">  
  (<input type="checkbox" id="selector_visibility_checkbox" checked><label for="selector_visibility_checkbox">Sisällön valinta</label>
<span class="for_logged_in_users hidden">  
  &nbsp;&nbsp;
  <input type="checkbox" id="modify_lists_checkbox"><label for="modify_lists_checkbox">Listojen muokkaaminen</label>
</span>)
</span>
  &nbsp;&nbsp;|&nbsp;&nbsp;
    <input type="checkbox" id="notation_visibility_checkbox"><label for="notation_visibility_checkbox">Nuottikuva</label>
</div>

<div class="border" style="float:left; width:30px;">&nbsp;&nbsp;&nbsp;&nbsp;</div>
<span id="login_link" class='hidden'><a href='#' class='hider'>Kirjaudu sisään</a></span>
<span id="logout_link" class='hidden'><a href='#' class='small'>Kirjaa ulos <span id="user_name"></span></a></span>
&nbsp;&nbsp;<a href='#' class='small' onclick="hide_or_show_element_with_id('about_div'); return false;"  >Tietoja palvelusta</a>

</div> <!--/header-->

<div id="about_div" class="hidden" style="clear:both;">

<p>Tämä palvelu on toteutettu HymnGadget-ohjelmistolla, jolla ei ole MINKÄÄNLAISTA TAKUUTA. Kyseessä on ns. vapaa ohjelmisto, jota kuka tahansa voi levittää ja muokata <a href="http://www.gnu.org/licenses/gpl.html" target="_blank" class="underline">GNU GPL v. 3</a> -lisenssin ehtojen mukaisesti. Nuottikuvien piirtämiseen käytetään <a href="http://code.google.com/p/abcjs/" target="_blank" class="underline">abcjs-järjestelmää</a>, joka myös on vapaa ohjelmisto.</p><p>


<p>HymnGadget-ohjelmiston laati ja tämän verkkopalvelun perusti Jukka Stenlund osana kirkkomusiikin opintojensa lopputyötä <a href="https://www.siba.fi/"  target="_blank" class="underline">Sibelius-Akatemiassa.</a></p>
<p><a href='#' onclick="hide_or_show_element_with_id('about_div'); return false;" class="underline">Sulje tiedote</a></p>

<a href="http://www.gnu.org/licenses/gpl.html" target="_blank"><img src="graphics/gplv3.png"></a>

</div> <!--about_div-->

<div id="login_div" class="hidden" style="clear:both;">
<table>
  <tr>
<td>Käyttäjätunnus:</td><td> <input id="username_field" type="text"></td></tr>
<tr>
<td>Salasana: </td><td><input id="password_field" type="password"></td>
</tr>
</table>
<button id="log_in_button">Kirjaudu</button>&nbsp;<button id="cancel_log_in_button">Peru</button>
</div> <!--login_div-->

<div id="response" class="hidden" style="clear:both;">
</div><!--response-->


<div style="clear:both;">

<table>
  <tr>

 <td class="border" valign="top" id="index_td">

<!--   <h1><?php echo $appname; ?></h1> -->
<!-- <p><a href="#" onclick="hide_or_show_element_with_id('modify_lists'); return false;"  class="hider">Muokkaa listoja</a></p> -->
<div id="song_select_ui">
   <?php include "html_fragments/content_ui.php";?>
</div>

   <?php 
   //include "html_fragments/filter_ui.php";
   ?>


   <?php
    //include "html_fragments/arrange_ui.php";
   ?>


 
 <?php include "html_fragments/song_index_ui.php";?>

</td>

<td id="notation_td" valign="top" class="hidden">

<?php include 'html_fragments/song_area.php';?>

</tr>

</td>
</table>

</div>

</body>
</html>