<?php
require_once('1trainSongs.php');
require_once('1trainArtists.php');
require_once('1trainUsers.php');

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
	} else if($resource_type == 'home'){
		header('HTTP/1.1 200 Success');
		print("Success");
		exit();
	}
}

// if(count($resource_components) == 3){
// 	if($resource_type == 'posts'){
// 		$plist = array();
// 		foreach (Songs::getPostList($resource_id_components[2]) as $idx => $post){
// 			$plist[] = array('id' => $post['id'], 'artwork_url' => $post['artwork_url']);
// 			// print(json_encode($plist));
// 		}
// 		header('Content-type: application/json');
// 		print(json_encode($plist));
// 		exit();
// 	}
// 	else if($resource_type == 'home'){
// 		header('HTTP/1.1 400 Bad Request');
// 		print("Error");
// 		exit();
// 	}
// }


if(count($resource_components) == 3){
	if($resource_type == 'posts'){
    $user = $resource_components[2];
		$plist = array();

		foreach (Songs::getPostListByUser($user) as $idx => $post){
			$plist[] = array('id' => $post['id'], 'artwork_url' => $post['artwork_url']);
			// print(json_encode($plist));
		}

		header('Content-type: application/json');
		print(json_encode($plist));
		exit();
	} else if($resource_type == 'home'){
  		header('HTTP/1.1 400 Bad Request');
  		print("Too many resources for home");
  		exit();
	} else if($resource_type == 'songinfo') {
      $songid = $resource_components[2];
  		$plist = array();

  		foreach (Songs::getPostID($songid) as $idx => $post){
  			$plist[] = json_encode($post));
  			// print(json_encode($plist));
  		}

  		header('Content-type: application/json');
  		print(json_encode($plist));
  		exit();
      }

      header('Content-type: application/json');
      print($song->getJSON());
      exit();
  }
}

// if(count($resource_components) == 3){
// 	$resource_id_components = explode(".", $resource_components[2]);
//
// 	if(count($resource_id_components) > 2) {
// 		header("HTTP/1.1 400 Bad Request");
// 	    print("Resource id badly formed: " . $resource_components[2]);
// 	    exit();
// 	}
//
// 	$resource_id = intval($resource_id_components[0]);
//
// 	if(!Songs::ifExists($resource_id)){
// 		header("HTTP/1.1 404 Not Found");
// 		print("No message with id = " . $resource_id);
// 	}
//
	// $post = Songs::getPostByID($resource_id);
	// $post = $post->getJSON();
	// header('Content-type: application/json');
	// print($post);
	// exit();
// }

header("HTTP/1.1 400 Bad Request");
print("Did not understand URL");
?>
