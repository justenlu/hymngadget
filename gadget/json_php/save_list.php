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

$item_array=get_parameter("item_array");

//echo "<ul>";
$message="";
$update_count=0;


/*
if (is_array($item_array)) {
  $message = $message . "item_array is an array.<br> ";
}
else {
  $message = $message . "item_array is not an array.<br> ";
}
*/

foreach ($item_array as $item) {
  if (isset($item["harmonisation"])) {
    $harmonisation=$item["harmonisation"];
  }
  else {
    $harmonisation=null;
  }
  $sth = $dbh->prepare("UPDATE list_item 
                        SET order_no=?,
                            verses=?,
                            transpose_interval=?,
                            transpose_interval_quality=?,
                            harmonisation=?
                        WHERE id=?");
  $sth->execute (array ($item["order_no"], $item["verses"], 
                        $item["transpose_interval"], $item["transpose_interval_quality"], $harmonisation,
                        $item["id"]));
  $update_count++;

}

echo json_encode($update_count);

?>
