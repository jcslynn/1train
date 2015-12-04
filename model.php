<?php

$servername = "classroom.cs.unc.edu";
$username = "tklose";
$password = "TARheels21!!";
$dbname = "tklosedb";

$conn = new mysqli($servername, $username, $password, $dbname);

//Check Connection
if($conn->connect_error){
	die("Connection failed: " . $conn->connect_error);
}

$post = "cool";


function getPostList(){
	global $post;
	$list = array();
	$list[] = $post;
	return $list;
}

function getPostImage($id){
	global $post;
	return $post;
}

function getPostTitle($id){
	global $post;
	return $post;
}

function getPostArtist($id){
	global $post;
	return $post;
}

function ifExists($id){
	return true;
}
?>