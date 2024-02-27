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
  $user_id=-1;
}

require_once "shared_functions.php";

$id=get_parameter("id");

$dbh = get_db_connection ();

$sth = $dbh->prepare("SELECT song.name, song.number, song.variant, song.book, melody.notation, 
                             melody.id AS melody_id 
                       FROM song, melody 
                       WHERE song.id=? 
                       AND song.melody=melody.id");
$sth->execute (array ($id));
$row=$sth->fetch (PDO::FETCH_ASSOC);

$name=$row["name"];
$number=$row["number"];
$variant=$row["variant"];
$book=$row["book"];
$melody=$row["notation"];
$melody_id=$row["melody_id"];
//$chords=$row["chords"];
    
  /*

  if (isset($_GET["chords_id"])) {
    $chords_id=$_GET["chords_id"];
    $sth = $dbh->prepare("SELECT notation, description FROM harmonisation where id=?");
    $sth->execute (array ($chords_id));
    $row=$sth->fetch (PDO::FETCH_ASSOC);
  }
  else {
    $sth = $dbh->prepare("SELECT harmonisation.id, harmonisation.notation, harmonisation.description FROM song, harmonisation WHERE song.id=? AND harmonisation.melody=song.melody ORDER BY harmonisation.id");
    $sth->execute (array ($id));
    $row=$sth->fetch (PDO::FETCH_ASSOC);
    $chords_id=$row["id"];
  }
  $chords=$row["notation"];  
  $chords_description=$row["description"];  
  */
  
  //--------
  
$song_id=get_parameter("id");
$melody_id=get_melody_id($song_id);
$harmonisations=array();

if ($melody_id!=null) {

  $sth = $dbh->prepare("SELECT id, description, notation, owner 
                        FROM harmonisation 
                        WHERE melody=? AND 
                              (public='Y' OR owner=?) 
                        ORDER BY harmonisation.description");
  $sth->execute (array ($melody_id, $user_id));
      
  while ($row = $sth->fetch (PDO::FETCH_ASSOC)) {
    $harmonisations[] = $row;
  }
}

$sth = $dbh->prepare("SELECT number, text 
                      FROM verse 
                      WHERE song=? 
                      ORDER BY number");
$sth->execute (array ($song_id));
  
$verses=array();
  
while ($row = $sth->fetch (PDO::FETCH_ASSOC)) {
  $verses[] = $row;
}

$arr = array('id' => $song_id, 'number' => $number, 'variant' => $variant, 'name' => $name, 'book' => $book, 'melody_code' => $melody, 'verses' => $verses, 'harmonisations' => $harmonisations);

//Customisation
$sth = $dbh->prepare("SELECT transpose_interval, transpose_interval_quality, verses, harmonisation
                       FROM customisation 
                       WHERE user=? AND 
                             song=?");
$sth->execute (array ($user_id, $song_id));
if ($row=$sth->fetch (PDO::FETCH_ASSOC)) {
  $arr["transpose_interval"]=$row["transpose_interval"];
  $arr["transpose_interval_quality"]=$row["transpose_interval_quality"];
  $arr["verse_selection"]=$row["verses"];
  $arr["harmonisation"]=$row["harmonisation"];
}

echo json_encode($arr);

?>
