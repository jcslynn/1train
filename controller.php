<?php
require_once('1trainSongs.php');
require_once('1trainArtists.php');
require_once('1trainUsers.php');
require_once('1trainSongQueues.php');

$resource_components = explode('/', $_SERVER['PATH_INFO']);
$resource_type = $resource_components[1];

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  if (count($resource_components) < 2) {
    header("HTTP/1.1 400 Bad Request");
    print("No resource specified.");
    exit();
  }

  if(($resource_type != 'posts') and ($resource_type != 'home') and ($resource_type != 'songinfo') and ($resource_type != 'queue')) {
  	header("HTTP/1.1 400 Bad Request");
  	print("Unknown resource: ". $resource_type);
  	exit();
  }

  if(count($resource_components) == 2){
  	if($resource_type == 'posts'){
  		$plist = array();
  		foreach (Songs::getPostList() as $idx => $post){
  			$plist[] = array('id' => $post['id'], 'title' => $post['title'], 'artist' => $post['artist'], 'artwork_url' => $post['artwork_url']);
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

  if(count($resource_components) == 3) {
  	if($resource_type == 'posts') {
      	$user = $resource_components[2];
  		  $plist = array();

    		foreach (Songs::getPostListByUser($user) as $idx => $post) {
    			$plist[] = array('id' => $post['id'], 'title' => $post['title'], 'artist' => $post['artist'], 'artwork_url' => $post['artwork_url']);
    		// print(json_encode($plist));
    		}

  		header('Content-type: application/json');
  		print(json_encode($plist));
  		exit();

  	} else if ($resource_type == 'home') {
    		header('HTTP/1.1 400 Bad Request');
    		print("Too many resources for home");
    		exit();
  	} else if ($resource_type == 'songinfo') {
        $songid = $resource_components[2];
      	$song = Songs::getPostByID($songid);
    		$song = $song->getJSON();
    		header('Content-type: application/json');
    		print($song);
    		exit();
    } else if ($resource_type == 'queue') {
        $user = $resource_components[2];
        foreach (SongQueue::getUsersQueue($user) as $idx => $song) {
          $queue[] = array('user' => $song['user'], 'song' => $song['song'], 'title' => $song['title'], 'artist' => $song['artist'], 'art' => $song['art']);
        }
        header('Content-type: application/json');
    		print(json_encode($queue));
    		exit();
    }

  	header('Content-type: application/json');
  	print($song->getJSON());
  	exit();
    }
  }
  if ($_SERVER['REQUEST_METHOD'] == "POST") {
        if($resource_type == 'queue') {
          $queued = SongQueue::add($_REQUEST['user'], $_REQUEST['id']);
          header('Content-type: application/json');
      		print($queued->getJSON());
          exit();
        }
        print($_SERVER['REQUEST_METHOD']);
    }


  header("HTTP/1.1 400 Bad Request");
  print("Did not understand URL last");

?>
