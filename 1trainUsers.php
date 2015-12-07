<?php

class Users{
	private $user_id;
	private $profile;

	public static function create($user_id, $profile){

		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$addUser = "INSERT INTO 1trainUsers (user_id, profile_name)
                  VALUES ('$user_id', '$profile')
                  ON DUPLICATE KEY UPDATE profile_name=profile_name";

		$result = $conn->query($addUser);
		if($result){
			return new Users($user_id, $profile);
		}
		return null;
	}

	public static function getUserByID($user_id){
		$servername = "classroom.cs.unc.edu";
		$username = "tklose";
		$password = "TARheels21!!";
		$dbname = "tklosedb";
		$conn = new mysqli($servername, $username, $password, $dbname);

		$select = "SELECT * FROM 1trainUsers WHERE user_id='$user_id'";
		$result = $conn->query($select);
		if($rows->num_rows > 0 ){
			$row = $rows->fetch_assoc();
			return new User(intval($row['user_id']), $row['profile_name']);
		}
		return null;
	}

	private function __construct($user_id, $profile_name){
		$this->user_id = $user_id;
		$this->profile_name = $profile_name;
	}

	public function getUserID(){
		return $this->user_id;
	}

	public function getProfileName(){
		return $this->profiile_name;
	}
	public function getJSON(){
		$json_obj = array("user_id" => $this->user_id,
						  "profile_name" => $this->profile_name);
		return json_encode($json_obj);
	}
}


?>
