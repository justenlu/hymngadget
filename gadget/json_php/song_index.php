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

require_once "shared_functions.php";

$book=get_parameter("book");
$collection=get_parameter("collection");

if (is_null ($book) && is_null($collection)) {
  $book='1';
}

if (isset($_SESSION['user_id'])) {
  $user_id=$_SESSION['user_id'];
}
else {
  $user_id=null;
}

if (!ctype_digit ($book)) {
  throw new PDOException ("invalid book for funktion index_for_book: $book");
}

$dbh = get_db_connection ();

if (is_null ($book)) {
  $sth = $dbh->query("SELECT song.id as song_id, concat(number, variant) AS number_with_variant, information, origin
                      FROM song, melody
                      WHERE number<100 AND
                            song.melody=melody.id
                      ORDER BY number, variant");
}
else {
  $sth = $dbh->prepare("SELECT song.id as song_id, concat(song.number, song.variant) AS number_with_variant, information, origin
                        FROM song, melody
                        WHERE song.book=? AND
                              song.melody=melody.id
                        ORDER BY song.number, song.variant");
  $sth->execute(array($book));
}

while ($row = $sth->fetch (PDO::FETCH_ASSOC)) {
  $song_id=$row["song_id"];
  $sth_for_lyrics = $dbh->prepare("SELECT left(text, 40) 
                                   FROM verse 
                                   WHERE song=? AND number=1");
  $sth_for_lyrics->execute (array ($song_id));
  $lyrics_row=$sth_for_lyrics->fetch (PDO::FETCH_NUM);
  if ($sth_for_lyrics->rowCount()>0) {
    $row["first_words"]=$lyrics_row[0];
  }
  else {
    $row["first_words"]="";
  }
  
  $sth_for_harmonisation_count = $dbh->prepare("SELECT COUNT(harmonisation.id) 
                                                FROM harmonisation
                                                WHERE melody=(SELECT melody
                                                              FROM song
                                                              WHERE song.id=?) AND
                                                      LENGTH(TRIM(harmonisation.notation))>0");
  $sth_for_harmonisation_count->execute (array ($song_id));
  $harmonisation_count_row=$sth_for_harmonisation_count->fetch (PDO::FETCH_NUM);
  $row["harmonisation_count"]=$harmonisation_count_row[0];
  
  //Customisation
  $sth_for_customisation = $dbh->prepare("SELECT transpose_interval, transpose_interval_quality, verses, harmonisation
                                          FROM customisation 
                                          WHERE user=? AND 
                                                song=?");
  $sth_for_customisation->execute (array ($user_id, $song_id));
  //$sth_for_customisation->execute (array (1, 10));
  //die($user_id . ", " . $song_id);
  if ($row_for_customisation=$sth_for_customisation->fetch (PDO::FETCH_ASSOC)) {
    //die("Oh");
    $row["transpose_interval"]=$row_for_customisation["transpose_interval"];
    $row["transpose_interval_quality"]=$row_for_customisation["transpose_interval_quality"];
    $row["verses"]=$row_for_customisation["verses"];
    $row["harmonisation"]=$row_for_customisation["harmonisation"];
  }
  
  $songs[] = $row;
}

if (!isset($songs)) {
  $songs=Array();
}

echo json_encode($songs);
?>
