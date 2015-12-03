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

  $dropGenres = "DROP TABLE if exists Genres";

	if ($conn->query($dropGenres) === FALSE) {
    	echo "Error dropping table Genres: " . $conn->error;
	}

  $createGenres = "CREATE TABLE Genres (
						id INT PRIMARY KEY AUTO_INCREMENT,
						name TEXT,
						UNIQUE INDEX (id, name)
						)";

	if ($conn->query($createGenres) === FALSE) {
    	echo "Error creating table Genres: " . $conn->error;
	}

  $dropArtists = "DROP TABLE if exists Artists";

	if ($conn->query($dropArtists) === FALSE) {
    	echo "Error dropping table Artists: " . $conn->error;
	}

  $createArtists = "CREATE TABLE Artists (
						id INT PRIMARY KEY AUTO_INCREMENT,
						name TEXT,
            bio TEXT,
						UNIQUE INDEX (id, name)
						)";

	if ($conn->query($createArtists) === FALSE) {
    	echo "Error creating table Artists: " . $conn->error;
	}

  $dropSongs = "DROP TABLE if exists Songs";

	if ($conn->query($dropSongs) === FALSE) {
    	echo "Error dropping table Songs: " . $conn->error;
	}

  $createSongs = "CREATE TABLE Songs (
						path TEXT PRIMARY KEY,
						name TEXT,
            artist INT,
            img TEXT,
            FOREIGN KEY (artist) REFERENCES Artists
						)";

	if ($conn->query($createSongs) === FALSE) {
    	echo "Error creating table Songs: " . $conn->error;
	}

  $dropArtistSongs = "DROP TABLE if exists ArtistSongs";

	if ($conn->query($dropArtistSongs) === FALSE) {
    	echo "Error dropping table ArtistSongs: " . $conn->error;
	}

  $createArtistSongs = "CREATE TABLE ArtistSongs (
						id PRIMARY KEY AUTO_INCREMENT,
						song INT,
            artist INT,
            FOREIGN KEY (song) REFERENCES Songs,
            FOREIGN KEY (artist) REFERENCES Artists,
            UNIQUE (song, artist) ON CONFLICT IGNORE
						)";

	if ($conn->query($createArtistSongs) === FALSE) {
    	echo "Error creating table ArtistSongs: " . $conn->error;
	}

  $dropGenreSongs = "DROP TABLE if exists GenreSongs";

	if ($conn->query($dropGenreSongs) === FALSE) {
    	echo "Error dropping table GenreSongs: " . $conn->error;
	}

  $createGenreSongs = "CREATE TABLE GenreSongs (
						id PRIMARY KEY AUTO_INCREMENT,
						song INT,
            genre INT,
            FOREIGN KEY (song) REFERENCES Songs,
            FOREIGN KEY (genre) REFERENCES Genres,
            UNIQUE (song, genre) ON CONFLICT IGNORE
						)";

	if ($conn->query($createGenreSongs) === FALSE) {
    	echo "Error creating table GenreSongs: " . $conn->error;
	}

  $dropGenrePosts = "DROP TABLE if exists GenrePosts";

	if ($conn->query($dropGenreSongs) === FALSE) {
    	echo "Error dropping table Posts: " . $conn->error;
	}

  $createPosts = "CREATE TABLE Posts (
						id PRIMARY KEY AUTO_INCREMENT,
						song INT,
            artist INT,
            genre INT,
            FOREIGN KEY (song) REFERENCES Songs,
            FOREIGN KEY (artist) REFERENCES Artists,
            FOREIGN KEY (genre) REFERENCES Genres,
            UNIQUE (song, artist) ON CONFLICT IGNORE
						)";

	if ($conn->query($createPosts) === FALSE) {
    	echo "Error creating table Posts: " . $conn->error;
	}
?>
