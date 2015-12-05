<?php

class Songs{
	private $songid;
	private $title;
	private $artistid;
	private $art;

	public static function create($songid, $title, $artistid, $art){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);


	    $addSong = "INSERT INTO 1trainSongs (id, title, artist, artwork_url)
	                VALUES ('$songid', '$title', '$artistid', '$art')
	                ON DUPLICATE KEY UPDATE title=title";

		if($conn->query($addSong) === TRUE){
			// return new Songs($songid, $title, $artistid, $art);
			return "success";
		}
		else{
			return "fail" . $conn->error;
		}
	}

	public static function getPostList(){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$list = array();
		$post = array();

		$getAllIds = "SELECT id, artwork_url FROM 1trainSongs LIMIT 0,10";
		$rows = $conn->query($getAllIds);

		if($rows->num_rows > 0 ){
			while($row = $rows->fetch_assoc()){
				$post = array('id' => $row['id'], 'artwork_url' => $row['artwork_url']);
				$list[] = $post;
			}
		}
		return $list;
	}

	public static function getPostByID($id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$getPost = "SELECT * FROM 1trainSongs WHERE id='$id'";
		$rows = $conn->query($getPost);

		if($rows->num_rows > 0 ){
			$row = $rows->fetch_assoc();
			return new Songs(intval($row['id']), $row['title'], intval($row['artist']), $row['artwork_url']);
		}
		return null;
	}

	public static function ifExists($id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$getPost = "SELECT * FROM Songs WHERE id='$id'";
		$post = $conn->query($getPost);
		if($post->num_rows > 0 ){
			return true;
		}
		else{
			return false;
		}
	}

	private function __construct($songid, $title, $artistid, $art){
		$this->songid = $songid;
		$this->title = $title;
		$this->artistid = $artistid;
		$this->art = $art;
	}

	public function getSongID(){
		return $this->songid;
	}
	public function getTitle(){
		return $this->title;
	}
	public function getArtistID(){
		return $this->artistid;
	}
	public function getArt(){
		return $this->art;
	}

	public function getJSON(){
		$json_obj = array("id" => $this->songid,
						  "title" => $this->title,
						  "artistid" => $this->artistid,
						  "art" => $this->art);
		return json_encode($json_obj);	
	}
}

?>