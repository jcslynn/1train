<?php

  class SongQueue {
    private $pos;
    private $song;
    private $user;

    public static function add($user_id, $song){
      $servername = "classroom.cs.unc.edu";
      $username = "tklose";
      $password = "TARheels21!!";
      $dbname = "tklosedb";
      $conn = new mysqli($servername, $username, $password, $dbname);

      $position;
      $insert = "INSERT INTO 1trainSongQueue VALUES (NULL, '$user_id', '$song')";
      $result = $conn->query($insert);
      if($result) {
        $position = $conn->insert_id;
      }

      return new SongQueue($user_id, $song, $position);
    }

    private function __construct($user_id, $song, $position){
      $this->user = $user_id;
      $this->song = $song;
      $this->pos = $position;
    }

    public static function getUsersQueue($user_id) {
      $servername = "classroom.cs.unc.edu";
      $username = "tklose";
      $password = "TARheels21!!";
      $dbname = "tklosedb";
      $conn = new mysqli($servername, $username, $password, $dbname);

      $fullQueue = array();
  		$song = array();

      $result = $conn->query("SELECT S.id as id, A.name as artist, S.title as title, S.artwork_url as art, Q.user as user  FROM 1trainSongQueue as Q, 1trainSongs as S, 1trainArtists as A WHERE Q.user='$user_id' and Q.id=S.id and S.artist=A.id GROUP BY Q.pos");
      if($result) {
        while($row = $result->fetch_assoc()){
          $song = array('user' => $row['user'], 'song' => $row['id'], 'title' => $row['title'], 'artist' => $row['artist'], 'art' => $row['art']);
  				$fullQueue[] = $song;
        }
        return $fullQueue;
      }

      return null;
    }

    public function getJSON(){
      $json_obj = array("user" => $this->user,
  						  "song" => $this->song,
  						  "position" => $this->pos);
  		return json_encode($json_obj);
    }

  }
?>
