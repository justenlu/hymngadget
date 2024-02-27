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
if (!isset($_SESSION['user_id'])) {
  die("Access denied.");
}

require_once "shared_functions.php";

$dbh = get_db_connection ();

$song_id=get_parameter("song_id");

if (!isset($song_id)) {
  die("Song id not set.");
}

$book=get_parameter("book_id");
$melody=get_parameter("melody");
$verses=get_parameter("verses");
$harmonisations=get_parameter("harmonisations");
$name=get_parameter("song_name");
$number=get_parameter("number");
$variant=get_parameter("variant");
$poet=get_parameter("poet");
$origin_of_melody=get_parameter("origin_of_melody");
$information=get_parameter("information");


echo "<ul>";

if (isset($number)) {
  $sth = $dbh->prepare("UPDATE song SET number=? WHERE id=?");
  $sth->execute (array ($number, $song_id));
  echo "<li>Updated number of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now number " . $number . "</li>";
}

if (isset($variant)) {
  $sth = $dbh->prepare("UPDATE song SET variant=? WHERE id=?");
  $sth->execute (array ($variant, $song_id));
  echo "<li>Updated variant of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now variant " . $variant . "</li>";
}

if (isset($name)) {
  $sth = $dbh->prepare("UPDATE song SET name=? WHERE id=?");
  $sth->execute (array ($name, $song_id));
  echo "<li>Updated name of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now name " . $name . "</li>";
}

if (isset($information)) {
  $sth = $dbh->prepare("UPDATE song SET information=? WHERE id=?");
  $sth->execute (array ($information, $song_id));
  echo "<li>Updated information of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now information " . $information . "</li>";
}

if (isset($verses)) {
  $sth = $dbh->prepare("DELETE FROM verse WHERE song=?");
  $sth->execute (array ($song_id));
  echo "<li>Deleted " . $sth->rowCount() . " old verses</li>";

  echo "<li> Adding new verses: ";
  echo "<table>";
  echo "<th>Number</th><th>text</th>";
  
  foreach ($verses as $verse) {
    echo "<tr><td>" . $verse["number"] . "</td><td>" . $verse["text"] . "</td></tr>";

    $sth = $dbh->prepare("INSERT INTO verse(number, text, song) VALUES (?,?,?)");
    $sth->execute (array ($verse["number"], $verse["text"], $song_id));

  }
  echo "</table>";
}

if (isset($harmonisations)) {

  echo "<li> Updating harmonisations: ";
  echo "<table>";
  echo "<th>Id</th><th>description</th>";
  
  foreach ($harmonisations as $harmon) {
    echo "<tr><td>" . $harmon["id"] . "</td><td>" . $harmon["description"] . "</td></tr>";

    $sth = $dbh->prepare("UPDATE harmonisation SET notation=?, description=? where id=?");
    $sth->execute (array ($harmon["notation"], $harmon["description"], $harmon["id"]));

  }
  echo "</table>";
}

if (isset($melody)) {
  $sth = $dbh->prepare("UPDATE melody 
                        SET notation=? 
                        WHERE id=(SELECT melody 
                                  FROM song 
                                  WHERE id=?)");
  $update_count=$sth->execute (array ($melody, $song_id));
  echo "<li>Updated melody of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now melody " . $melody . "</li>";
}

if (isset($origin_of_melody)) {
  $sth = $dbh->prepare("UPDATE melody 
                        SET origin=? 
                        WHERE id=(SELECT melody 
                                  FROM song 
                                  WHERE id=?)");
  $update_count=$sth->execute (array ($origin_of_melody, $song_id));
  echo "<li>Updated origin of melody of " . $sth->rowCount() . " songs. Song with id " . $song_id . " have now origin of melody " . $origin_of_melody . "</li>";
}

echo "</ul>";

?>
