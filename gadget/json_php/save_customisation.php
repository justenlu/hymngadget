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

$song_id=get_parameter("song_id");
if (!isset($song_id)) {
  die("Song id not set.");
}

$dbh = get_db_connection ();

$transpose_interval=get_parameter("transpose_interval");
$transpose_interval_quality=get_parameter("transpose_interval_quality");
$verses=get_parameter("verses");
$harmonisation=get_parameter("harmonisation");

//If some customisation parameters are provided, but there is no row in the table for this user and song, add the row
if ((isset($transpose_interval) && isset($transpose_interval_quality)) ||
     isset($verses) || isset($harmonisation)) {
  //echo "Parameter found. ";
  $sth = $dbh->prepare("SELECT user 
                        FROM customisation
                        WHERE user=? AND
                              song=?");
  $sth->execute (array ($user_id, $song_id));
  
  
  if (!$sth->fetch (PDO::FETCH_ASSOC)) {
    //echo "Inserting a row. ";
    $sth = $dbh->prepare("INSERT INTO customisation(user, song) 
                          VALUES(?,?)");
    $sth->execute (array ($user_id, $song_id));
  }

}

if (isset($transpose_interval) && isset($transpose_interval_quality)) {
  //echo "Updating transpose parameters. ";
  $sth = $dbh->prepare("UPDATE customisation
                        SET transpose_interval=?,
                            transpose_interval_quality=?
                        WHERE user=? AND
                              song=?");
  $sth->execute (array ($transpose_interval, $transpose_interval_quality, $user_id, $song_id));
}

if (isset($verses)) {
  //echo "Updating verse selection. ";
  $sth = $dbh->prepare("UPDATE customisation
                        SET verses=?
                        WHERE user=? AND
                              song=?");
  $sth->execute (array ($verses, $user_id, $song_id));
}

if (isset($harmonisation)) {
  //echo "Updating selected harmonisation. ";
  $sth = $dbh->prepare("UPDATE customisation
                        SET harmonisation=?
                        WHERE user=? AND
                              song=?");
  $sth->execute (array ($harmonisation, $user_id, $song_id));
}

$reply="";

echo json_encode($reply);
?>
