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

$arr=Array();

if (isset($_SESSION['user_id'])) {
  $arr['id']=$_SESSION['user_id'];
}
if (isset($_SESSION['username'])) {
  $arr['username']=$_SESSION['username'];
}
if (isset($_SESSION['first_name'])) {
  $arr['first_name']=$_SESSION['first_name'];
}
if (isset($_SESSION['last_name'])) {
  $arr['last_name']=$_SESSION['last_name'];
}

echo json_encode($arr);
?>
