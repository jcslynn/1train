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

      $result = $conn->query("SELECT S.id as id, A.name as artist, S.title as title, S.artwork_url as art, Q.user as user, Q.pos as position  FROM 1trainSongQueue as Q, 1trainSongs as S, 1trainArtists as A WHERE Q.user='$user_id' and Q.id=S.id and S.artist=A.id GROUP BY Q.pos");
      if($result) {
        while($row = $result->fetch_assoc()){
          $song = array('user' => $row['user'], 'song' => $row['id'], 'title' => $row['title'], 'artist' => $row['artist'], 'art' => $row['art'], 'position' => $row['position']);
  				$fullQueue[] = $song;
        }
        return $fullQueue;
      }

      return null;
    }

    public static function remove($user_id, $song_id, $position) {
      $servername = "classroom.cs.unc.edu";
      $username = "tklose";
      $password = "TARheels21!!";
      $dbname = "tklosedb";
      $conn = new mysqli($servername, $username, $password, $dbname);

      $delete = "DELETE FROM 1trainSongQueue WHERE user='$user_id' AND id='$song_id' AND pos='$position'";
      $result = $conn->query($delete);

      if(!$result) {
        echo "error removing song from queue database" . $conn->error;
      }

      return SongQueue::getUsersQueue($user_id);
    }

    public function getJSON(){
      $json_obj = array("user" => $this->user,
  						  "song" => $this->song,
  						  "position" => $this->pos);
  		return json_encode($json_obj);
    }

  }
?>
