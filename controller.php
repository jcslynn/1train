<?php
require_once('1trainSongs.php');
require_once('1trainArtists.php');

$resource_components = explode('/', $_SERVER['PATH_INFO']);

if (count($resource_components) < 2) {
  header("HTTP/1.1 400 Bad Request");
  print("No resource specified.");
  exit();
}

$resource_type = $resource_components[1];

if(($resource_type != 'posts') and ($resource_type != 'home')) {
	header("HTTP/1.1 400 Bad Request");
	print("Unknown resource: ". $resource_type);
	exit();
}

if(count($resource_components) == 2){
	if($resource_type == 'posts'){
		$plist = array();
		foreach (Songs::getPostList() as $idx => $post){
			$plist[] = array('id' => $post['id'], 'artwork_url' => $post['artwork_url']);
			// print(json_encode($plist));
		}
		header('Content-type: application/json');
		print(json_encode($plist));
		exit();
	}
	else if($resource_type == 'home'){
		header('HTTP/1.1 200 Success');
		print("Success");
		exit();
	}
}

if(count($resource_components) == 3){
	$resource_id_components = explode(".", $resource_components[2]);

	if(count($resource_id_components) > 2) {
		header("HTTP/1.1 400 Bad Request");
	    print("Resource id badly formed: " . $resource_components[2]);
	    exit();
	}

	$resource_id = intval($resource_id_components[0]);
	
	if(!Songs::ifExists($resource_id)){
		header("HTTP/1.1 404 Not Found");
		print("No message with id = " . $resource_id);
	}

	$post = Songs::getPostByID($resource_id);
	$post = $post->getJSON();
	header('Content-type: application/json');
	print($post);
	exit();
}
header("HTTP/1.1 400 Bad Request");
print("Did not understand URL");
?>