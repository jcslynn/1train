<?php

  require_once('1trainSongs.php');
  require_once('1trainArtists.php');
  require_once('1trainUsers.php');

  $songid = $_REQUEST['id'];
  $artistid = $_REQUEST['user_id'];
  $title = $_REQUEST['title'];
  $artist = $_REQUEST['user']['username'];
  $art = $_REQUEST['artwork_url'];
  $avatar = $_REQUEST['user']['avatar_url'];
  $user_id = $_REQUEST['whoLikedID'];
  $profile = $_REQUEST['whoLiked'];

  header('Content-type: application/json');
  print("success from uploadToDB");

  Artists::create($artistid, $artist);
  Users::create($user_id, $profile);

  if($art == "") {
    $avatar = explode("large", $avatar)[0] . "crop.jpg"; //gets a higher quality image
    echo($avatar);
    Songs::create($songid, $title, $artistid, $avatar, $user_id);

  } elseif ($art=="https://sndcdn.com/images/default_avatar_crop.jpg") { //if no song art or user avatar
      $art = "photoshop/carousel-headphones-black-red.png";
      echo($art);
      Songs::create($songid, $title, $artistid, $art, $user_id);
  }
  else {
    $art = explode("large", $art)[0] . "crop.jpg"; //gets a higher quality image
    echo($art);
    Songs::create($songid, $title, $artistid, $art, $user_id);
  }
  exit();
?>
