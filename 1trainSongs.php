<?php

class Songs{
	private $songid;
	private $title;
	private $artistid;
	private $art;
	private $num;
	private $user_id;

	public static function create($songid, $title, $artistid, $art, $user_id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);


    $addSong = "INSERT INTO 1trainSongs (id, title, artist, artwork_url, user_id)
                VALUES ('$songid', '$title', '$artistid', '$art', '$user_id')
                ON DUPLICATE KEY UPDATE title=title";

		if($conn->query($addSong) === TRUE){
			$getNum = "SELECT num FROM 1trainSongs WHERE id='$songid";
			$rows = $conn->query($getNum);
			if ($rows){
				$row = $rows->fetch_assoc();
				$num = $row['num'];
				return new Songs($songid, $title, $artistid, $art, $num, $user_id);
				// return "success";
			}
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

		$getAllIds = "SELECT id, artwork_url FROM 1trainSongs GROUP BY num LIMIT 0,40";
		$rows = $conn->query($getAllIds);

		if($rows->num_rows > 0 ){
			while($row = $rows->fetch_assoc()){
				$post = array('id' => $row['id'], 'artwork_url' => $row['artwork_url']);
				$list[] = $post;
			}
		}
		return $list;
	}

	public static function getPostListByUser($user_id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$list = array();
		$post = array();

		$getAllIds = "SELECT id, artwork_url FROM 1trainSongs WHERE user_id='$user_id' GROUP BY num LIMIT 0,40";
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
		$result = $conn->query($getPost);
		if(is_null($result)){
			print "error finding song: " . $conn->error;
		}

		if($result->num_rows > 0 ){
			$row = $rows->fetch_assoc();
			return new Songs(intval($row['id']), $row['title'], intval($row['artist']), $row['artwork_url'], $row['num'], $row['user_id']);
			// return "cool";
		}
		return "HEY";
	}

	public static function ifExists($id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$getPost = "SELECT * FROM 1trainSongs WHERE num='$id'";
		$post = $conn->query($getPost);
		if($post->num_rows > 0 ){
			return true;
		}
		else{
			return false;
		}
	}

	private function __construct($songid, $title, $artistid, $art, $num, $user_id){
		$this->songid = $songid;
		$this->title = $title;
		$this->artistid = $artistid;
		$this->art = $art;
		$this->num = $num;
		$this->user_id = $user_id;
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

	public function getNum(){
		return $this->num;
	}

	public function getUser(){
		return $this->user_id;
	}

	public function getJSON(){
		$json_obj = array("num" => $this->num,
						  "id" => $this->songid,
						  "title" => $this->title,
						  "artistid" => $this->artistid,
						  "art" => $this->art,
							"user_id" => $this->user_id);
		return json_encode($json_obj);
	}
}

?>
