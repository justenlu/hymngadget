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
require_once "shared_functions.php";
$list=get_parameter("list");

if (!ctype_digit ($list)) {
  throw new PDOException ("invalid list: $list");
}

$dbh = get_db_connection ();

$sth = $dbh->prepare("SELECT list_item.id as item_id, song.id as song_id, 
                             concat(song.number, song.variant) AS number_with_variant, information, origin,
                             list_item.verses, 
                             list_item.transpose_interval, list_item.transpose_interval_quality, 
                             list_item.harmonisation
                      FROM song, list_item, melody
                      WHERE song.id=list_item.song AND
                            song.melody=melody.id AND
                            list_item.list=?
                      ORDER BY list_item.order_no");
$sth->execute(array($list));

while ($row = $sth->fetch (PDO::FETCH_ASSOC)) {

  $sth_for_lyrics = $dbh->prepare("SELECT left(text, 40) 
                                   FROM verse 
                                  WHERE song=? AND number=1");
  $sth_for_lyrics->execute (array ($row["song_id"]));
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
  $sth_for_harmonisation_count->execute (array ($row["song_id"]));
  $harmonisation_count_row=$sth_for_harmonisation_count->fetch (PDO::FETCH_NUM);
  $row["harmonisation_count"]=$harmonisation_count_row[0];
  
  $songs[] = $row;
}

if (!isset($songs)) {
  $songs=Array();
}

echo json_encode($songs);

?>
