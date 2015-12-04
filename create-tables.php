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

	$dropSongs = "DROP TABLE if exists 1trainSongs";

	if ($conn->query($dropSongs) === FALSE) {
			echo "Error dropping table 1trainSongs: " . $conn->error;
	}

	$dropArtists = "DROP TABLE if exists 1trainArtists";

	if ($conn->query($dropArtists) === FALSE) {
			echo "Error dropping table 1trainArtists: " . $conn->error;
	}

  $createArtists = "CREATE TABLE 1trainArtists (
						id INT PRIMARY KEY,
						name CHAR(50)
						)";

	if ($conn->query($createArtists) === FALSE) {
    	echo "Error creating table 1trainArtists: " . $conn->error;
	}

  $createSongs = "CREATE TABLE 1trainSongs (
						id INT PRIMARY KEY,
						title CHAR(50),
            artist INT,
						artwork_url CHAR(255),
            FOREIGN KEY (artist) REFERENCES 1trainArtists(id)
						)";

	if ($conn->query($createSongs) === FALSE) {
    	echo "Error creating table 1trainSongs: " . $conn->error;
	}
?>
