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

function Logger() {
	var thisLogger=this;
	this.observer=new Array();
	this.userId=null;
	this.loadUser();
	$("#log_in_button").click(function() {thisLogger.login()});
	$("#cancel_log_in_button").click(function() {
		$("#username_field").val("");
		$("#password_field").val("");
		$('#login_div').hide();		
	});
	$('#login_link').click(function (event) {
		//http://bavotasan.com/2013/prevent-default-behaviour-of-hashed-anchor-tag-with-jquery/
		event.preventDefault();
		$('#login_div').show();
	});
	$('#logout_link').click(function (event) {
		event.preventDefault();
		thisLogger.logout();
	});
}

Logger.prototype.addObserver = function(o) {
	this.observer.push(o);
}

Logger.prototype.notifyObservers = function() {
	var i;
	for (i=0; i<this.observer.length; ++i) {
		this.observer[i].notify();
	}
}

Logger.prototype.login = function() {
	var request_data={};
	var thisLogger=this;
	
	request_data.username=$("#username_field").val();
	request_data.password=$("#password_field").val();
	$("#username_field").val("");
	$("#password_field").val("");
	
	console.log("username="+request_data.username);
	console.log("password="+request_data.password);
	jQuery.getJSON("json_php/login.php", request_data, function(response) {
		var user="";
		console.log("Got response from login.php. success="+response["success"]+", first_name="+response["first_name"]+
		", last_name="+response["last_name"]+", username="+response["username"]);
		if (response["success"]) {
			thisLogger.userId=response["user_id"];
			//$("#response").html(message);
			Logger.setLogoutLink(response);
			$("#login_div").hide("slow");
			//$("#response").show();
			thisLogger.notifyObservers();
		}
		else {
			if (response["enabled"]=="Y") {
				$("#response").html("Kirjautuminen epäonnistui, yritä uudelleen.");
			} 
			else {
				$("#response").html("Tunnuksesi on suljettu. Ota yhteyttä palvelun ylläpitäjään.");	
			} 
			$("#response").show("slow").delay(3000).hide("slow"); //http://api.jquery.com/delay/		
		}
	});
}

Logger.prototype.logout = function() {
	var thisLogger=this;
	jQuery.get("json_php/logout.php", function(message) {
		thisLogger.userId=null;
		$("#username_field").val("");
		$("#password_field").val("");
		console.log("Got response from logout.php");
		Logger.setLoginLink();
		//$("#response").html(message);
		//$("#response").show("slow").delay(3000).hide("slow"); //http://api.jquery.com/delay/
		
		var checked=$('input:radio[name=data]:checked').val();
		if (checked=="list") {
			$("#book_radio").click();
		}
		thisLogger.notifyObservers();
	});
}

Logger.prototype.loadUser = function() {
	var thisLogger=this;
	jQuery.getJSON("json_php/get_user.php", function(response) {
		if (response["id"]) {
			thisLogger.userId=response["id"];
			Logger.setLogoutLink(response);
		} 
		else {
			Logger.setLoginLink();
			thisLogger.userId=null;
		}
		console.log("thisLogger.userId="+thisLogger.userId);
		thisLogger.notifyObservers();
	});
}

Logger.setLoginLink = function() {
	$('#logout_link').hide();
	$('#login_link').show();
}

Logger.setLogoutLink = function (response) {
	var user="";
	if (response["first_name"]) {
		user=response["first_name"];
		console.log("user="+user);
	} 
	if (response["last_name"]) {
		user+=" "+response["last_name"];
		console.log("user="+user);
	}
	if (!user) {
		user=response["username"];
		console.log("user="+user);
	}
	$('#user_name').html(user);
	$('#login_link').hide();
	$('#logout_link').show();
	//$("#login_or_logout_link").html("<a href='#' class='small' onclick='logout(); return false;'>Kirjaa ulos " + user + "</a>");
	
}