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

$list_id=get_parameter("list_id");

$reply["deleted"]=false;

if (isset($list_id)) {
  
  $sth = $dbh->prepare("SELECT name 
                        FROM list 
                        WHERE id=?");
  $sth->execute (array ($list_id));
  $row = $sth->fetch (PDO::FETCH_ASSOC);
  $reply["name"]=$row["name"];

  $sth = $dbh->prepare("DELETE FROM list 
                        WHERE id=?");
  $sth->execute (array ($list_id));

  if ($sth->rowCount() > 0) {
    $reply["deleted"]=true;
  }

}

echo json_encode($reply);

?>
