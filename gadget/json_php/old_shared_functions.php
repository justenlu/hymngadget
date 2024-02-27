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


function get_db_connection () {
  include "../config_db_connection.php";
  //$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", "$dbuser", "$dbpass");
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", "$dbuser", "$dbpass");
  $dbh->setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return ($dbh);
}

/*This is a functionally a method from book MySQL by Paul DuBois, page 554.*/
function get_parameter($name) {
  $value=NULL;
  if (isset ($_GET[$name])) {
    $value=$_GET[$name];
  }
  else if (isset ($_POST[$name])) {
    $value=$_POST[$name];
  }
  if (get_magic_quotes_gpc ()) {
    $value=strip_slashes_recursively ($value);
  }
  return ($value);
}

/*This is a functionally a method from book MySQL by Paul DuBois, page 555.*/
function strip_slashes_recursively ($value) {
  if (is_array($value)) {
    foreach ($value as $key => $val) {
      $value[$key]=strip_slashes_recursively($val);
    }
  }
  else if (!is_null ($value)) {
    $value = stripslashes ($value);
  }
  return ($value);
}

function get_melody_id($songID) {
  if (!ctype_digit ($songID)) {
    throw new PDOException ("invalid songID for funktion getMelodyID: $songID");
  }
  
  $dbh = get_db_connection ();  
  
  $sth = $dbh->prepare("SELECT melody FROM song WHERE id=?");
  $sth->execute (array ($songID));

  return $sth->fetchColumn (0);
    
}

function songs_have_names($book) {

  if (!ctype_digit ($book)) {
    throw new PDOException ("invalid book for funktion songs_have_names: $book");
  }

  if (is_null ($book)) {
    return true;
  }

  $dbh = get_db_connection ();  
  
  $sth = $dbh->prepare("SELECT songs_have_names FROM book WHERE id=?");
  $sth->execute(array($book));
    
  return $sth->fetchColumn (0);
  
}

?>
