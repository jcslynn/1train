<?php

class Artists{
	private $artistid;
	private $artist;

	public static function create($artistid, $artist){

		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$addArtist = "INSERT INTO 1trainArtists (id, name)
                VALUES ('$artistid', '$artist')
                ON DUPLICATE KEY UPDATE name=name";

		$result = $conn->query($addArtist);
		if($result){
			return new Artists($artistid, $artist);
		}
		return null;
	}

	public static function getArtistByID($id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$select = "SELECT * FROM 1trainArtists WHERE id='$id'";
		$result = $conn->query($select);
		if($rows->num_rows > 0 ){
			$row = $rows->fetch_assoc();
			return new Artists(intval($row['id']), $row['name']);
		}
		return null;
	}

	private function __construct($artistid, $artist){
		$this->artistid = $artistid;
		$this->artist = $artist;
	}

	public function getArtistID(){
		return $this->artistid;
	}

	public function getArtistName(){
		return $this->artist;
	}
	public function getJSON(){
		$json_obj = array("id" => $this->artistid,
						  "name" => $this->artist);
		return json_encode($json_obj);	
	}
}


?>