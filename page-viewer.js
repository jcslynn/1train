//establish connection with soundcloud api
SC.initialize({ client_id: 'b587094d7c883db6a341a2faeb24c587' });

//get dimensions of current window height and width
var window_height = $(window).height();
var window_width = $(window).width();
var media_bar_height = 62;
var currently_playing;
var user;
var play_queue_showing = false;

$(document).ready(function(){
	//layout for media bar
	$("#media-bar").css({ "height": media_bar_height });
	$("#media-bar-wrapper > div > img").attr("height", media_bar_height);
	$("#artwork").css({ "height": media_bar_height, "width": media_bar_height, "left": media_bar_height / 4, "top": 5 });
	$("#pause-button").hide();
	$("#play-pause").css({ "left": media_bar_height * 1.5 });
	$("#song-queue").css({ "right": "0" });
	$("#video-queue").css({ "right": $("#song-queue").width() });
	$("#reading-list").css({ "right": ($("#song-queue").width() * 2) - 20 });
	$("#volume").css({ "right": $("#song-queue").width() * 3 - 10});
	$("#muted").hide();
	$('body').append($('<div id="play-queue"></div'));
	$('#play-queue').css({ "height": "90%", "width": "50%", "background-color": "black", "position": "absolute", "top": 62, "right": 0, "color": "white", "overflow": "scroll" });
	$('#play-queue').hide();

	$('#song-queue').on('mousedown', function (e) {
		e.preventDefault();
	});

	$('#song-queue').click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
				$('#play-queue').empty();
		    console.log('song-queue pressed');
				$.ajax("controller.php/queue/" + user,{
					type: "GET",
					datatype: "json",
					success: function(queue, textStatus, jqXHR){
						if(play_queue_showing) {
							hide_play_queue();
						} else {
							show_play_queue();
						}

						for(var i = 0; i < queue.length; i++) {
							song = queue[i];
							new QueueRow(i+1, song['song'], song['title'], song['artist'], song['art']);
						}

					},
					error: function(jqXHR, textStatus, error){
						console.log("error getting queue");
					}
				});
		}
  	});

	$('#play-button').on('mousedown', function (e) {
		e.preventDefault();
	});

  $('#play-button').click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
		    console.log('play-button pressed');
				if(currently_playing) {
					currently_playing.play();
				}
		}
  });

	$('#pause-button').on('mousedown', function (e) {
		e.preventDefault();
	});

	$('#pause-button').click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
			console.log('pause-button pressed');
			if(currently_playing) {
				currently_playing.pause();
			}
		//console.log('x: ' + tile.x + ' y: ' + tile.y)
		}
	});

	$('#loud').on('mousedown', function (e) {
		e.preventDefault();
	});

	$('#loud').click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
			console.log("loud clicked");
		    if(currently_playing) {
		    	currently_playing.mute();
		    }
		}
  	});

	$('#muted').on('mousedown', function (e) {
		e.preventDefault();
	});


	$('#muted').click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
			console.log("muted clicked");
		    if(currently_playing) {
		    	currently_playing.loud();
		    }
		}
  	});

	//finished setting up media

	get_user_info();
});

var get_user_info = function (){
  var ids = [];
  var usernames = [];
  var titles = [];
  var artwork = [];
	var profile;

	var mainContent = $('#main-content');
	mainContent.empty();

	//populate splash page

	mainContent.append($('<div id="center"></div>'));
	mainContent.css({ "height": window_height - media_bar_height });

	$('#center').css({ "position": "relative", "margin": "auto 0", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "100%", "width": "100%" });
	$('#center').append($('<div id="logo-div"></div>'));
	$('#logo-div').append($('#logo'));
	$('#logo-div').css({ "position": "absolute", "top": ((window_height - media_bar_height) / 2) - ($('#logo').height() / (4/3)),
												"width": "100%", "height": $('#logo').height() });
	$('#logo').css({"position":"absolute", "left": window_width / 2 - $('#logo').width() / 2 });
	//$('#logo').css({"position":"absolute", "top": -250, "left": window_width / 2 - $('#logo').width() / 2 });

	$('#center').append($('<div id="user-info-div"></div>'));
	$('#user-info-div').append($('<div class="text">enter soundcloud extension below<br></div>'));
	$('#user-info-div').append($('<input type="text" id="sc-ext">'));
	$('.text').css({ "display":"inline" });
	$('#user-info-div').css({ "font-size": "200%", "text-align":"center", "width": "100%", "position": "absolute",
												"top": parseInt($('#logo-div').css('top')) + $('#logo-div').height() / (6/5) });
	$('#sc-ext').css({ "margin-top": 10, "width": $('#logo').width(), "height": $('.text').height() + 10, "text-align": "center",
  										"font-size": "100%", "font-family": "hobo-std", "border": "none", "border-bottom": "solid thick black", "outline": "none" });
	$('#sc-ext').prop('defaultValue', 'soundsbytk');
	$('#sc-ext').focus();

	$('#sc-ext').keypress(function (e) {
	  if (e.which == 13) {
	    profile = $('#sc-ext').val();
		  SC.get('/resolve?url=http://soundcloud.com/'+ profile +'&client_id=b587094d7c883db6a341a2faeb24c587').then( function(result) {
				user = result['id'];
		    //get tracks from my soundcloud favorites

		    SC.get('/users/' + user + '/favorites').then( function(tracks) {
		      // console.log(tracks);
		      for (var i = 0; i < tracks.length; i++) {
							tracks[i]['whoLikedID'] = user;
							tracks[i]['whoLiked'] = profile;
		          if (tracks[i]['streamable']) {
		             $.ajax("uploadToDB.php",
		             {
		               type: "POST",
		               dataType: "json",
		               data: tracks[i],
		               success: function(art, textStatus, jqXHR) { console.log('success'); },
									 error: function(jqXHR, textStatus, error) { console.log(jqXHR.responseText); }
		             });
		           } else {
		            console.log(tracks[i]['title'] + " is not streamable by api");
		           }
		      }
		    });
				switch_to_homepage();
			});
	    return false;
	  }
	});
};


var switch_to_homepage = function (){
	console.log('switched to homepage');
	var mainContent = $('#main-content');
	mainContent.empty();

	//populate home page

	mainContent.append($('<div id="center"></div>'));
	mainContent.css({ "height": window_height - media_bar_height });

	$('#center').css({ "position": "relative", "margin": "auto 0", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "auto", "width": "auto" });
	$('#center').append($('<div id="logo-div"></div>'));
	$('#logo-div').append($('<img id="logo" src="photoshop/1train-logo-clean.png">'));
	$('#logo-div').css({ "position": "relative", "top": ((window_height - media_bar_height) / 2) - ($('#logo').height() / (4/3)),
												"width": "100%", "height": $('#logo').height() });
	$('#logo').css({"position":"absolute", "left": window_width / 2 - $('#logo').width() / 2 });

	$('#center').append($('<div id="links-div"></div>'));
	$('#links-div').append($('<div class="link" id="1">music</div>'));
	$('#links-div').append($('<div class="bar"> | </div>'));
	$('#links-div').append($('<div class="link" id="2">sports</div>'));
	$('#links-div').append($('<div class="bar"> | </div>'));
	$('#links-div').append($('<div class="link" id="3">about</div>'));
	$('.bar').css({ "display":"inline" });
	$('.link').css({ "display":"inline" });
	$('#links-div').css({ "font-size": "200%", "text-align":"center", "width": "100%", "position": "absolute",
												"top": parseInt($('#logo-div').css('top')) + $('#logo-div').height() / (6/5) });
	$('#center').append($('#links-div'));

	$.ajax("controller.php/home",{
		type: "GET",
		datatype: "json",
		success: function(textStatus, jqXHR){
			$('#links-div > #1').on('click', function(){console.log('switching to music'); switch_to_music(user);});
			$('#links-div > #2').on('click', switch_to_sports);
			$('#links-div > #3').on('click', switch_to_about);
		},
		error: function(jqXHR, textStatus, error){
			console.log("this still isnt working");
		}
	});
};

var switch_to_music = function () {

	var mainContent = $('#main-content');
	mainContent.empty();


	mainContent.append($('<div id="left"></div>'));
	$('#left').css({ "width": "50%", "height": "100%", "position": "absolute", "top": 0, "left": 0 });
	$('#left').append($('<div id="left-top"></div>'));

	$('#left-top').css({ "position": "relative", "margin": "auto 0", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "50%", "width": "auto" });
	$('#left-top').append($('<div id="logo-div"></div>'));
	$('#logo-div').append($('<img id="logo" src="photoshop/1train-logo-clean.png">'));
	$('#logo-div').css({ "position": "relative", "width": "100%", "height": $('#logo').height() });
	$('#logo').css({ "position": "absolute", "left": ($('#logo-div').width() / 2) - ($('#logo').width() / 2),
 										"top":  ($('#left-top').height() / 2) - ($('#logo').height() / 2)});

 	$('#left').append($('<div id="left-bottom"></div>'));
	$('#left-bottom').css({ "position": "relative", "margin": "auto 0", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "50%", "width": "auto", "font-size": "175%" });
	$('#left-bottom').append($('<div id="info-div"></div>'));
	$('#info-div').append($('<div id="artist"><div id="artist-label">artist: </div><div id="artist-name"> nothing is playing </div></div>'));
	$('#info-div').append($('<div id="song"><div id="song-label">title: </div><div id="song-name"> nothing is playing </div></div>'));
	$('#info-div').css({ "position": "relative", "width": "100%", "height": $('#logo').height() });
	$('#artist-label').css({ "position": "absolute", "left": 0, "width": "50%", "text-align": "center" });
	$('#artist-name').css({ "position": "absolute", "right": 0, "width": "50%", "text-align": "left" });
	$('#song-label').css({ "position": "absolute", "top": $('#artist-label').height(), "left": 0, "width": "50%", "text-align": "center" });
	$('#song-name').css({ "position": "absolute", "top": $('#artist-label').height(), "right": 0, "width": "50%", "text-align": "left" });

	mainContent.append($('<div id="right"></div>'));
	$('#right').css({ "width": "50%", "height": "100%", "position": "absolute", "top": 0, "right": 0 });
	$('#right').append($('<div id="grid"></div>'));

	$('#grid').css({ "height": "87.5%", "overflow": "scroll", "margin-top": "5%" });

	$.ajax("controller.php/posts/" + user, {
		type: "GET",
		datatype: "json",
		success: function(plist, textStatus, jqXHR){
			makePostsGrid($("#grid"), window_width, media_bar_height, plist);
			$("#logo").on('click', switch_to_homepage);
		},
		error: function(jqXHR, textStatus, error){
			console.log(jqXHR.responseText);
		}
	});

};

var switch_to_about = function(){
	var mainContent = $('#main-content');
	mainContent.empty();
	mainContent.append($('<h1 id="title">about us</h1>'));
	$("#title").css({"text-align":"center", "font-size":"400%"})

	$.ajax("controller.php/home",{
		type: "GET",
		datatype: "json",
		success: function(textStatus, jqXHR){
			var homeButton = $("<div class='home'>home</div>");
			mainContent.append(homeButton);
			homeButton.css({"position":"absolute","font-size": "200%", "text-align":"center"});
			homeButton.on('click', switch_to_homepage);
		},
		error: function(jqXHR, textStatus, error){
			console.log(jqXHR.responseText);
		}
	});
};

var switch_to_sports = function() {
	var mainContent = $('#main-content');
	mainContent.empty();

	$.ajax("controller.php/home",{
		type: "GET",
		datatype: "json",
		success: function(textStatus, jqXHR){
			var homeButton = $("<div class='home'>home</div>");
			mainContent.append(homeButton);
			homeButton.css({"position":"absolute","font-size": "200%", "text-align":"center"});
			homeButton.on('click', switch_to_homepage);
		},
		error: function(jqXHR, textStatus, error){
			console.log(jqXHR.responseText);
		}
	});
};

var makePostsGrid = function (grid_div, win_wid, media_bar_height, songs) {
	console.log(songs.length);
	var numOfRows = songs.length / 2;
	this.grid_div = grid_div;
	this.tiles = new Array(numOfRows);
	//make size of of grid
	grid_div.css({ "position": "absolute", "width": "100%" });

	//make grid
	console.log(numOfRows);
	for (i = 0; i < numOfRows; i++) {
		this.tiles[i] = new Array(2);
		for (j = 0; j < 2; j++) {
			//make new space, hand in grid div and image -- changed it to handing in the song object
			var tile = new Tile(i, j, songs[i * 2 + j]);
			this.tiles[i][j] = tile;
			grid_div.append(tile.getTileDiv());
		}
	}
};

var show_play_queue = function() {
	$('#play-queue').show();
	play_queue_showing = true;
};

var hide_play_queue = function() {
	$('#play-queue').hide();
	play_queue_showing = false;
};

var Tile = function (i, j, song) {
	//grab properties from song object passed it
	console.log("song passed in: ");
	console.log(song);
	this.id = song.id;
	this.title = song.title;
	this.artist = song.artist;
	this.image = song.artwork_url;
	this.x = j;
	this.y = i;
	var tile = this;
	this.is_playing = false;
	this.sound;
	//create cell
	this.tile_div = $("<div></div>").css({position: "absolute", width: "250px", height: "200px",
	 																				top: i * 225, left: j * 275 + 25 });
	img = $("<img src=\"" + tile.image + "\">");
	img.css({ height: "200px", width: "250px" });
	this.tile_div.append(img);

	this.tile_div.on('mousedown', function (e) {
		e.preventDefault();
	});

  this.tile_div.click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
		    tile.leftClick(tile.id);
		    console.log("artist: " + tile.artist);
				// tile.fetchInfo();
				//console.log('x: ' + tile.x + ' y: ' + tile.y)
		} else if ((e.button == 0) && e.altKey) {
		    tile.altClick();
		} else if ((e.button == 0) && e.shiftKey) {
		    tile.shiftClick();
		}
  });
};

Tile.prototype.isPlaying = function (){
	return this.is_playing;
}
Tile.prototype.play = function(){
	currently_playing = this;
	this.is_playing = true;
	$('#play-button').hide();
	$('#pause-button').show();
	this.sound.play();
	console.log("play-pause: play");
}

Tile.prototype.pause = function(){
	this.is_playing = false;
	$('#pause-button').hide();
	$('#play-button').show();
	this.sound.pause();
	console.log("play-pause: pause");
}

Tile.prototype.loud = function(){
	this.sound.setVolume(1);
	$('#muted').hide();
	$('#loud').show();
	console.log("louded");
}

Tile.prototype.mute = function(){
	this.sound.setVolume(0);
	$('#muted').show();
	$('#loud').hide();
	console.log("muted");
}

Tile.prototype.getTileDiv = function () {
	return this.tile_div;
};

Tile.prototype.getSongID = function() {
	return this.id;
};

Tile.prototype.displayInfo = function() {
	$("#artist-name").empty();
	$("#song-name").empty();
	$("#artist-name").append(this.artist);
	$("#song-name").append(this.title);

	$("#artwork").empty();
	$("#artwork").append('<img src="' +  this.image + '" height=' + (media_bar_height - 10) + ' width=' + media_bar_height + '>');
};

Tile.prototype.leftClick = function (id) {
	console.log("left click.");
	var t = this;

	if(t.sound) {

		if(t.isPlaying()){
				t.pause();
			} else if(!t.isPlaying()){

				t.play();
			 }
	} else {
		// SC.get('/tracks/' + id).then(function(track){$('#player').html(track.title);})
		SC.stream('/tracks/' + id).then(function(player){
			// console.log("cool")
			// console.log(this.isPlaying());
			//player.play();
			t.sound = player;
			t.play();
		});

	}

	this.displayInfo();
};

Tile.prototype.shiftClick = function () {
	console.log("shift click, this is to add songs to queue, not play them now.");
	info = {};
	info['user'] = user;
	info['id'] = this.id;
	console.log(info);

	$.ajax("controller.php/queue",
	{
		type: "POST",
		dataType: "json",
		data: info,
		success: function(queued, textStatus, jqXHR) { console.log(queued); },
		error: function(jqXHR, textStatus, error) { console.log(jqXHR.responseText); }
	});

};

Tile.prototype.altClick = function () {
	console.log("alt click.");
};

var QueueRow = function (pos, song_id, song_title, artist_name, art) {
	this.id = song_id;
	this.image = art;
	this.title = song_title;
	this.artist = artist_name;
	var queuerow = this;
	this.is_playing = false;
	this.sound;

	img = $('<img style="position: absolute; right: 30px;" src="' + this.image + '" height="60" width="62">');
	row = $('<div>' + pos + ' ' + this.title + ' by ' + this.artist + '</div>');
	row.append(img);
	row.css({ "position": "absolute", "top": "0", "width": "100%", "height": "62px", "line-height": "62px" });
	this.row_div = $('<div style="position: relative; height: 62px; width: 99%; padding-left: 1%;"></div>')
	this.row_div.append(row);
	$('#play-queue').append(this.row_div);

	this.row_div.on('mousedown', function (e) {
		e.preventDefault();
	});


	this.row_div.click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
				console.log('row in play queue clicked, song: ' + queuerow.id + ' would be played');
				queuerow.leftClick(queuerow.id);

		}
	});


};

QueueRow.prototype.leftClick = function (id) {
	console.log("left click.");
	var t = this;

	if(t.sound) {
		if(t.isPlaying()){
				t.pause();
			} else if(!t.isPlaying()){
				t.play();
			 }
	} else {
		SC.stream('/tracks/' + id).then(function(player){
			t.sound = player;
			t.play();
		});

	}

	//this.displayInfo();
};

QueueRow.prototype.isPlaying = function (){
	return this.is_playing;
}
QueueRow.prototype.play = function(){
	currently_playing = this;
	this.is_playing = true;
	$('#play-button').hide();
	$('#pause-button').show();
	this.sound.play();
	console.log("queue row: play");
}

QueueRow.prototype.pause = function(){
	this.is_playing = false;
	$('#pause-button').hide();
	$('#play-button').show();
	this.sound.pause();
	console.log("queue row: pause");
}

QueueRow.prototype.loud = function(){
	this.sound.setVolume(1);
	$('#muted').hide();
	$('#loud').show();
	console.log("louded");
}

QueueRow.prototype.mute = function(){
	this.sound.setVolume(0);
	$('#muted').show();
	$('#loud').hide();
	console.log("muted");
}

QueueRow.prototype.getRowDiv = function () {
	return this.row_div;
};

QueueRow.prototype.getSongID = function() {
	return this.id;
};

QueueRow.prototype.displayInfo = function() {
	$("#artist-name").empty();
	$("#song-name").empty();
	$("#artist-name").append(this.artist);
	$("#song-name").append(this.title);

	$("#artwork").empty();
	$("#artwork").append('<img src="' +  this.image + '" height=' + (media_bar_height - 10) + ' width=' + media_bar_height + '>');
};
