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
if (isset($_SESSION['user_id'])) {
  $user_id=$_SESSION['user_id'];
}
else {
  die("Access denied.");
}

require_once "shared_functions.php";

$book_id=get_parameter("book_id");
$song_id=get_parameter("song_id");

function no_rights() {
  $row=array ();
  $row["add_song"]=false;
  $row["add_harmonisation"]=false;
  $row["edit_metadata"]=false;
  $row["edit_melody"]=false;
  $row["edit_any_harmonisation"]=false;
  $row["edit_own_harmonisation"]=false;
  $row["edit_lyrics"]=false;
  return $row;
}

$dbh = get_db_connection ();

$sth = $dbh->prepare("SELECT add_song, add_harmonisation, edit_metadata, edit_melody, 
                             edit_any_harmonisation, edit_own_harmonisation, edit_lyrics 
                      FROM rights 
                      WHERE user=? AND book=?");
$sth->execute (array ($user_id, $book_id));
$row=$sth->fetch (PDO::FETCH_ASSOC);
  
if ($row) {
  $row["add_song"]=($row["add_song"]=="Y");
  $row["add_harmonisation"]=($row["add_harmonisation"]=="Y");
  $row["edit_metadata"]=($row["edit_metadata"]=="Y");
  $row["edit_melody"]=($row["edit_melody"]=="Y");
  $row["edit_any_harmonisation"]=($row["edit_any_harmonisation"]=="Y");
  $row["edit_own_harmonisation"]=($row["edit_own_harmonisation"]=="Y");
  $row["edit_lyrics"]=($row["edit_lyrics"]=="Y");
}
else {
  $row=no_rights ();
}

echo json_encode($row);

?>
