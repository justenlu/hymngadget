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
$username=get_parameter("username");
$password=get_parameter("password");
session_start();

$dbh = get_db_connection ();

$dbh->query("LOCK TABLES user WRITE");

$sth = $dbh->prepare("SELECT id, username, first_name, last_name, admin 
                      FROM user 
                      WHERE username=? AND 
                            password=PASSWORD(?) AND
                            enabled='Y'");
$sth->execute (array ($username, $password));
//$sth->execute (array ($username));

if ($row=$sth->fetch (PDO::FETCH_ASSOC)) {
  $_SESSION['user_id'] = $row["id"];
  $_SESSION['username'] = $username;
  $_SESSION['first_name'] = $row["first_name"];
  $_SESSION['last_name'] = $row["last_name"];
  $arr = array('success' => true, 'user_id' => $row["id"], 'username' => $username, 'first_name' => $row["first_name"], 'last_name' => $row["last_name"], 'admin' => $row["admin"]);

  $sth = $dbh->prepare("UPDATE user
                        SET wrong_passwd_after_last_login=0
                        WHERE username=?");
  $sth->execute (array ($username));

}
else {
  
  $sth = $dbh->prepare("UPDATE user
                        SET wrong_passwd_after_last_login=wrong_passwd_after_last_login+1,
                            wrong_guesses_for_current_passwd=wrong_guesses_for_current_passwd+1
                        WHERE username=?");
  $sth->execute (array ($username));
  
  $sth = $dbh->prepare("UPDATE user
                        SET enabled='N'
                        WHERE username=? AND 
                              (wrong_passwd_after_last_login>30 OR
                              wrong_guesses_for_current_passwd>1000)");
  $sth->execute (array ($username));

  $sth = $dbh->prepare("SELECT enabled
                        FROM user
                        WHERE username=?");
  $sth->execute (array ($username));
  $row=$sth->fetch (PDO::FETCH_ASSOC);
  $enabled=$row['enabled'];

  $arr = array('success' => false, 'enabled' => $enabled);
  
}

$dbh->query("UNLOCK TABLES");

echo json_encode($arr);

?>
