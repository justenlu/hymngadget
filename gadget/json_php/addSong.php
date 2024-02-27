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

$book_id=get_parameter("book_id");

$sth = $dbh->query("INSERT INTO melody() values()");

$sth = $dbh->query("SELECT LAST_INSERT_ID();");
$melody_id=$sth->fetchColumn (0);

$sth = $dbh->prepare("INSERT INTO song(book, melody) VALUES(?, ?)");
$sth->execute (array ($book_id, $melody_id));

$sth = $dbh->query("SELECT LAST_INSERT_ID();");
$song_id=$sth->fetchColumn (0);

echo json_encode($song_id);

?>