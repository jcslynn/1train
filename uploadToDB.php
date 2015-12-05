<?php

  require_once('1trainSongs.php');
  require_once('1trainArtists.php');

  $songid = $_REQUEST['id'];
  $artistid = $_REQUEST['user_id'];
  $title = $_REQUEST['title'];
  $artist = $_REQUEST['user']['username'];
  $art = $_REQUEST['artwork_url'];
  $avatar = $_REQUEST['user']['avatar_url'];

  header('Content-type: application/json');
  print($art);

  Artists::create($artistid, $artist);
  if($art == ""){
    // echo($avatar);
    Songs::create($songid, $title, $artistid, $avatar);
    
  }
  else{
    // echo($art);
    Songs::create($songid, $title, $artistid, $art);
  }
  exit();


?>
