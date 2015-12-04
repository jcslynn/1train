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

$list = array();
$post = array();
$id = 0;
$getAllIds = "SELECT id, artwork_url FROM 1trainSongs LIMIT 0,10";
$rows = $conn->query($getAllIds);
if($rows->num_rows > 0 ){
	while($row = $rows->fetch_assoc()){
		$post = array('id' => $row['id'], 'artwork_url' => $row['artwork_url']);
		// $id = $id+1;
		// echo($post['artwork_url']);
		$list[] = $post;
	}
}





function getPostList(){
	global $list;
	return $list;
}

// function getPost($id){
// 	$getPost = "SELECT title, artist, artwork_url FROM Songs WHERE id='$id'";
// 	$post = $conn->query($getPost);
// 	if($post->num_rows > 0 ){
// 		$row = $post->fetch_assoc()
// 	}
// 	else{
// 		$row =
// 	}
// 	return $row;
// }
// function getPostImage($id){
// 	$getPost = "SELECT artwork_url FROM Songs WHERE id='$id'";
// 	$post = $conn->query($getPost);
// 	if($post->num_rows > 0 ){
// 		$row = $post->fetch_assoc()
// 		return $row['artwork_url'];
// 	}
// 	else{
// 		return "Error: Image Not Found";
// 	}
// }

// function getPostTitle($id){
// 	$getPost = "SELECT title FROM Songs WHERE id='$id'";
// 	$post = $conn->query($getPost);
// 	if($post->num_rows > 0 ){
// 		$row = $post->fetch_assoc()
// 		return $row['title'];
// 	}
// 	else{
// 		return "Error: Image Not Found";
// 	}
// }

// function getPostArtist($id){
// 	$getPost = "SELECT artist FROM Songs WHERE id='$id'";
// 	$post = $conn->query($getPost);
// 	if($post->num_rows > 0 ){
// 		$row = $post->fetch_assoc()
// 		return $row['artist'];
// 	}
// 	else{
// 		return "Error: Image Not Found";
// 	}
// }

function ifExists($id){
	$getPost = "SELECT artwork_url FROM Songs WHERE id='$id'";
	$post = $conn->query($getPost);
	if($post->num_rows > 0 ){
		return true;
	}
	else{
		return false;
	}
}

$conn->close();
?>