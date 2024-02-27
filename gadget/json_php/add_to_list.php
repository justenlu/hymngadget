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
$item_array=get_parameter("item_array");
$new_list_name=get_parameter("new_list_name");

//echo "<ul>";
$message="";

if (is_array($item_array)) {
  $message = $message . "item_array is an array. ";
}
else {
  $message = $message . "item_array is not an array. ";
}

if ($new_list_name!=null) {

  $sth = $dbh->prepare("INSERT INTO list(name, user) VALUES(?,?)");
  $sth->execute (array ($new_list_name, $user_id));
  $message = $message .  "<li>Added a new list ($new_list_name) for user $user_id</li>";

  $sth = $dbh->query("SELECT LAST_INSERT_ID();");
  $list_id=$sth->fetchColumn (0);
}

if ($list_id!=null) {
  
  $sth = $dbh->prepare("SELECT MAX(order_no)
                        FROM list_item
                        WHERE list=?");
  $sth->execute (array ($list_id));
  $max_order_no = $sth->fetchColumn (0);
  if (isset($max_order_no)) {
    $order_no=$max_order_no+1;
  }
  else {
    $order_no=1;
  }

  foreach ($item_array as $item) {
    if (isset($item["harmonisation"])) {
      $harmonisation=$item["harmonisation"];
    }
    else {
      $harmonisation=null;
    }
    $sth = $dbh->prepare("INSERT INTO list_item(song, list, order_no, verses, transpose_interval, transpose_interval_quality, harmonisation) VALUES(?,?,?,?,?,?,?)");
    $sth->execute (array ($item["song_id"], $list_id, $order_no, $item["verses"], $item["transpose_interval"],  
                   $item["transpose_interval_quality"], $harmonisation));
    $message = $message .  "<li>Added song " . $item['song_id'] . " to list $list_id</li>";
    $order_no++;
  }
  
}

echo json_encode($message);

?>