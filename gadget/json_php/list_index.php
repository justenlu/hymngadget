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

$dbh = get_db_connection ();

$sth = $dbh->prepare("SELECT id, name FROM list WHERE user=? ORDER BY name");
$sth->execute (array ($user_id));

$lists=array ();

while ($row = $sth->fetch (PDO::FETCH_ASSOC)) {
  $lists[] = $row;
}

echo json_encode($lists);

?>
