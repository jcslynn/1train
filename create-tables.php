<?php
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

	$dropSongQueue = "DROP TABLE if exists 1trainSongQueue";

	if ($conn->query($dropSongQueue) === FALSE) {
			echo "Error dropping table 1trainSongQueue: " . $conn->error;
	}

	$dropSongs = "DROP TABLE if exists 1trainSongs";

	if ($conn->query($dropSongs) === FALSE) {
			echo "Error dropping table 1trainSongs: " . $conn->error;
	}

	$dropArtists = "DROP TABLE if exists 1trainArtists";

	if ($conn->query($dropArtists) === FALSE) {
			echo "Error dropping table 1trainArtists: " . $conn->error;
	}

	$dropUsers = "DROP TABLE if exists 1trainUsers";

	if ($conn->query($dropUsers) === FALSE) {
			echo "Error dropping table 1trainUsers: " . $conn->error;
	}

	$createUsers = "CREATE TABLE 1trainUsers (
										user_id INT PRIMARY KEY,
										profile_name CHAR(50)
									)";

	if ($conn->query($createUsers) === FALSE) {
			echo "Error creating table 1trainUsers: " . $conn->error;
	}

  $createArtists = "CREATE TABLE 1trainArtists (
						id INT PRIMARY KEY,
						name CHAR(50)
						)";

	if ($conn->query($createArtists) === FALSE) {
    	echo "Error creating table 1trainArtists: " . $conn->error;
	}

  $createSongs = "CREATE TABLE 1trainSongs (
		  						num INT PRIMARY KEY AUTO_INCREMENT,
									id INT,
									title CHAR(50),
			           	artist INT,
									artwork_url CHAR(255),
									user_id INT,
			            FOREIGN KEY (artist) REFERENCES 1trainArtists(id),
									FOREIGN KEY (user_id) REFERENCES 1trainUsers(user_id),
									UNIQUE KEY (id)
									)";

	if ($conn->query($createSongs) === FALSE) {
    	echo "Error creating table 1trainSongs: " . $conn->error;
	}

	$createSongQueue = "CREATE TABLE 1trainSongQueue (
											pos INT PRIMARY KEY AUTO_INCREMENT,
											user INT,
											id INT,
											FOREIGN KEY (user) REFERENCES 1trainUsers (user_id),
											FOREIGN KEY (id) REFERENCES 1trainSongs (id)
											)";

	if ($conn->query($createSongQueue) === FALSE) {
    	echo "Error creating table 1trainSongQueue: " . $conn->error;
	}
?>
