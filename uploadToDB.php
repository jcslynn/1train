<?php

  require_once('1trainSongs.php');
  require_once('1trainArtists.php');

  $songid = $_REQUEST['id'];
  $artistid = $_REQUEST['user_id'];
  $title = $_REQUEST['title'];
  $artist = $_REQUEST['user']['username'];
  $art = $_REQUEST['artwork_url'];
  $avatar = $_REQUEST['user']['avatar_url'];

  if($art = ""){
    Songs::create($songid, $title, $artistid, $avatar);
  }
  else{
    Songs::create($songid, $title, $artistid, $art);
  }
  Artists::create($artistid, $artist);

?>
