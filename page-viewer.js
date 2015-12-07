//establish connection with soundcloud api
SC.initialize({ client_id: 'b587094d7c883db6a341a2faeb24c587' });

//get dimensions of current window height and width
var window_height = $(window).height();
var window_width = $(window).width();
var media_bar_height = 62;
var currently_playing;

$(document).ready(function(){
	//layout for media bar
	$("#media-bar").css({ "height": media_bar_height });
	$("#media-bar-wrapper > div > img").attr("height", media_bar_height);
	$("#artwork").css({ "height": media_bar_height, "width": media_bar_height, "left": media_bar_height / 4 });
	$("#pause-button").hide();
	$("#play-pause").css({ "left": media_bar_height * 1.5 });
	$("#song-queue").css({ "right": "0" });
	$("#video-queue").css({ "right": $("#song-queue").width() });
	$("#reading-list").css({ "right": ($("#song-queue").width() * 2) - 20 });
	$("#volume").css({ "right": $("#song-queue").width() * 3 - 10});

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

	get_user_info();
});

var get_user_info = function (){
  var ids = [];
  var usernames = [];
  var titles = [];
  var artwork = [];
	var profile;
	var myUserID;

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
				myUserID = result['id'];
		    //get tracks from my soundcloud favorites

		    SC.get('/users/' + myUserID + '/favorites').then( function(tracks) {
		      // console.log(tracks);
		      for (var i = 0; i < tracks.length; i++) {
							tracks[i]['whoLikedID'] = myUserID;
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
				switch_to_homepage(myUserID);
			});
	    return false;
	  }
	});
};


var switch_to_homepage = function (){
	console.log('switched to homepage');
	var mainContent = $('#main-content');
	var user;
	mainContent.empty();
	if(arguments.length > 0) {
		user = arguments[0];
	}

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
		error: function(jqXHR, textStatus, error) { console.log("error getting home"); }
	});
};

var switch_to_music = function () {

	var mainContent = $('#main-content');
	mainContent.empty();

	var user;
	if(arguments.length > 0) {
		user = arguments[0];
	}

	mainContent.append($('<div id="left"></div>'));
	$('#left').css({ "width": "50%", "height": "100%", "position": "absolute", "top": 0, "left": 0 });
	$('#left').append($('<div id="left-top"></div>'));

	$('#left-top').css({ "position": "relative", "margin": "auto 0", "top": 0, "bottom": 0, "left": 0, "right": 0, "height": "50%", "width": "auto" });
	$('#left-top').append($('<div id="logo-div"></div>'));
	$('#logo-div').append($('<img id="logo" src="photoshop/1train-logo-clean.png">'));
	$('#logo-div').css({ "position": "relative", "width": "100%", "height": $('#logo').height() });
	$('#logo').css({ "position": "absolute", "left": ($('#logo-div').width() / 2) - ($('#logo').width() / 2),
 										"top":  ($('#left-top').height() / 2) - ($('#logo').height() / 2)});
	/*
	$('#left-top').append($('<div id="links-div"></div>'));
	$('#links-div').append($('<div class="link" id="1">music</div>'));
	$('#links-div').append($('<div class="bar"> | </div>'));
	$('#links-div').append($('<div class="link" id="2">sports</div>'));
	$('#links-div').append($('<div class="bar"> | </div>'));
	$('#links-div').append($('<div class="link" id="3">about</div>'));
	$('.bar').css({ "display":"inline" });
	$('.link').css({ "display":"inline" });
	$('#links-div').css({ "font-size": "200%", "text-align":"center", "width": "100%", "position": "absolute", "top": $('#logo-div').height() - $('#links-div').height() * 2 });
	$('#left-top').append($('#links-div'));
	//<img id="logo" src="photoshop/1train-logo-clean.png"><div id="links-div" class="tk-hobo-std"><div class="links"><a>hottest</a></div><div class="links"> | </div><div class="links"><a>newest</a></div><div class="links"> | </div><div class="links"><a>random</a></div></div><div id="carousel"><img src="photoshop/carousel-headphones-black-red.png"><div id="carousel-text">text should change with image</div></div></div>');
	*/

	mainContent.append($('<div id="right"></div>'));
	$('#right').css({ "width": "50%", "height": "100%", "position": "absolute", "top": 0, "right": 0 });
	$('#right').append($('<div id="grid"></div>'));

	$('#grid').css({ "height": "87.5%", "overflow": "scroll", "margin-top": "5%" });
	/*
	$('#logo').css({ "padding-left": "50%", "padding-right": "50%" })

	var carousel = new Array(2);

	carousel[0] = "photoshop/carousel-headphones-black-red.png";
	carousel[1] = "media/50-cent-too-rich.jpg";

	caro_text = new Array(2);
	caro_text[0] = "music";
	caro_text[1] = "song of the week";
	curr_caro = 0;


	var slideshow = window.setInterval(function() {
	if(curr_caro == 0) {
		curr_caro = 1;
		$("#carousel > img").attr("src", carousel[curr_caro]);
		$("#carousel > div").text(caro_text[curr_caro]);
	} else {
		curr_caro = 0;
		$("#carousel > img").attr("src", carousel[curr_caro]);
		$("#carousel > div").text(caro_text[curr_caro]);
	}}, 5000);

	img = $("<img src='media/50-cent-too-rich.jpg'>");
	img.css({ height: "50px", width: "50px" });
	$("#artwork").append(img);
	*/
	$.ajax("controller.php/posts/" + user, {
		type: "GET",
		datatype: "json",
		success: function(plist, textStatus, jqXHR){
			var imgs = new Array(plist.length);
			var ids = new Array(plist.length);
			for(var i=0; i<plist.length; i++){
				var post = plist[i];
				imgs[i] = post.artwork_url;
				ids[i] = post.id;
			}

			makePostsGrid($("#grid"), window_width, media_bar_height, ids, imgs);
			$("#logo").on('click', switch_to_homepage);
		},
		error: function(jqXHR, textStatus, error){
		console.log(/*jqXHR.responseText*/ "error getting image");
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
		}
	});
};

var makePostsGrid = function (grid_div, win_wid, media_bar_height, ids, images) {
	var numOfRows = images.length / 2;
	this.grid_div = grid_div;
	this.tiles = new Array(numOfRows);
	//make size of of grid
	grid_div.css({ "position": "absolute", "width": "100%" });

	//make grid
	console.log(numOfRows);
	for (i = 0; i < numOfRows; i++) {

		this.tiles[i] = new Array(2);
		for (j = 0; j < 2; j++) {
			//make new space, hand in grid div and image
			var tile = new Tile(i, j, ids[i * 2 + j], images[i * 2 + j]);
			this.tiles[i][j] = tile;
			grid_div.append(tile.getTileDiv());
			console.log('iterating');
		}
	}
};

var Tile = function (i, j, id, image) {
	this.image = image;
	this.id = id;
	this.x = j;
	this.y = i;
	//console.log('num:' + (i*2 +j) + 'x, y: ' + i + ', ' + j);
	// this.sc_id = id;
	var tile = this;
	this.is_playing = false;
	this.sound;
	//create cell
	this.tile_div = $("<div></div>").css({position: "absolute", width: "250px", height: "200px",
	 																				top: i * 225, left: j * 275 + 25 });
	img = $("<img src=\"" + image + "\">");
	img.css({ height: "200px", width: "250px" });
	this.tile_div.append(img);

	this.tile_div.on('mousedown', function (e) {
		e.preventDefault();
	});

  this.tile_div.click(function (e) {
		e.preventDefault();
		if ((e.button == 0) && !e.shiftKey && !e.altKey)  {
		    tile.leftClick(id);
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
Tile.prototype.getTileDiv = function () {
	return this.tile_div;
};

// Tile.prototype.getSongID = function() {
// 	return this.id;
// };
//
// Tile.prototype.fetchInfo = function() {
// 	$songID = this.getSongID()
// 	$.ajax("controller.php/songinfo/" + $songID, {
// 		type: "GET",
// 		datatype: "json",
// 		success: function(song, textStatus, jqXHR){
//
// 			console.log("successfully got fetched song info: " + song);
// 			//change left bottom div
// 		},
// 		error: function(jqXHR, textStatus, error){
// 		console.log(textStatus);
// 		}
// 	});
// };

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

	this.fetchInfo();

};

Tile.prototype.shiftClick = function () {
	console.log("shift click, this is to add songs to queue, not play them now.");
};

Tile.prototype.altClick = function () {
	console.log("alt click.");
};
