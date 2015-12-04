<?php
  $songid = $_REQUEST['id'];
  $artistid = $_REQUEST['user_id'];
  $title = $_REQUEST['title'];
  $artist = $_REQUEST['user']['username'];
  $art = $_REQUEST['artwork_url'];
  $avatar = $_REQUEST['user']['avatar_url'];

  // Create connection
  $servername = "classroom.cs.unc.edu";
  $username = "tklose";
  $password = "TARheels21!!";
  $dbname = "tklosedb";

  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $addArtist = "INSERT INTO 1trainArtists (id, name)
                VALUES ('$artistid', '$artist')
                ON DUPLICATE KEY UPDATE name=name";

  if ($conn->query($addArtist) === FALSE) {
      echo "Error adding artist to table 1trainArtists: " . $conn->error;
  }

  if ($art == "") {
    $addSong = "INSERT INTO 1trainSongs (id, title, artist, artwork_url)
                VALUES ('$songid', '$title', '$artistid', '$avatar')
                ON DUPLICATE KEY UPDATE title=title";
  } else {
    $addSong = "INSERT INTO 1trainSongs (id, title, artist, artwork_url)
                VALUES ('$songid', '$title', '$artistid', '$art')
                ON DUPLICATE KEY UPDATE title=title";
  }
  if ($conn->query($addSong) === FALSE) {
      echo "Error adding song to table 1trainSongs: " . $conn->error;
  }

/*
  if (count($resource_components) < 2) {
    header("HTTP/1.1 400 Bad Request");
    print("No resource specified.");
    exit();
  }

  $resource_type = $resource_components[1];

  if ($resource_type != "addToDB") {
    header("HTTP/1.1 400 Bad Request");
    print("Unknown resource: " . $resource_type);
    exit();
  }

  if (count($resource_components) == 2) {
      insertArtist($_POST['user_id'], $_POST['user']['username']);
      insertSong($_POST['id'], $_POST['title'], $_POST['artwork_url']);
      exit();
  }

  if (count($resource_components) > 2) {
    header("HTTP/1.1 400 Bad Request");
    print("Too many resources specified.");
    exit();
  }
*/

?>
