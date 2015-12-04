var window_height = $(window).height();
var window_width = $(window).width();
var media_bar_height = 62;

$(document).ready(function(){
	switch_to_homepage();
	

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
});

var leftDivWrapper = $('<div id="left-div-wrapper"><img id="logo" src="photoshop/1train-logo-clean.png"><div id="links-div" class="tk-hobo-std"><div class="links"><a>hottest</a></div><div class="links"> | </div><div class="links"><a>newest</a></div><div class="links"> | </div><div class="links"><a>random</a></div></div><div id="carousel"><img src="photoshop/carousel-headphones-black-red.png"><div id="carousel-text">text should change with image</div></div></div>'); 

var switch_to_homepage = function (){
	var mainContent = $('#main-content');
	mainContent.empty();

	//populate home page
	mainContent.append($('<div id="logo-div"><img id="logo" src="photoshop/1train-logo-clean.png"></div><div id="links-div"><div class="link1">music</div><div class="bar"> | </div><div class="link2">sports</div><div class="bar"> | </div><div class="link3">about</div></div>'));

	// $('#center-div-wrapper div').css({"position":"absolute"});
	// $('#center-div-wrapper').css({"position":"relative", "width":"100%"});
	$('#logo-div').css({"width":"100%", "position":"relative"});
	$('#logo').css({"position":"absolute", "margin":"auto", "top":"500px", "left":"0","right":"0","bottom":"0"});
	// $('#links-div').css({"position" : "absolute"});
	$('#links-div').css({"position":"absolute","font-size": "200%", "text-align":"center"});
	$('.link1').css({"display":"inline"});
	$('.bar').css({"display":"inline"});
	$('.link2').css({"display":"inline"});
	$('.link3').css({"display":"inline"});
	
	// $('.links > a').css({"color": "black",	"text-decoration": "none"});
		// $('.a:hover').css({"color": "#ff0016"});
	$.ajax("controller.php/home",{
		type: "GET",
		datatype: "json",
		success: function(textStatus, jqXHR){
			$('.link1').on('click', switch_to_music);
			$('.link2').on('click', switch_to_sports);
			$('.link3').on('click', switch_to_about);
		}
	});
};

var switch_to_music = function () {
	var mainContent = $('#main-content');
	mainContent.empty();
	// alert("cool");
	mainContent.append($('<div id="left"></div><div id="grid"></div>'));
	$('#left').append(leftDivWrapper);

	$.ajax("controller.php/posts", {
		type: "GET",
		datatype: "json",
		success: function(plist, textStatus, jqXHR){
			var imgs = new Array(plist.length);
			for(var i=0; i<plist.length; i++){
				imgs[i] = plist.img;
			}
			makePostsGrid($("#grid"), window_width, media_bar_height, imgs);
			// $("#grid").append($("<div>" + plist.img + " ," + plist.title + " ," + plist.name + "</div>"));
			// var homeButton = $("<div class='home'>home</div>");
			// // homeButton.on("click",switch_to_homepage);
			// mainContent.append(homeButton);
			// homeButton.css({"position":"absolute","font-size": "200%", "text-align":"center"});
			$("#logo").on('click', switch_to_homepage);

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

var makePostsGrid = function (grid_div, win_wid, media_bar_height, images) {
	this.grid_div = grid_div;

	//make size of of grid
	grid_div.css({ position: "absolute", width: win_wid / 2, top: media_bar_height + 50, left: win_wid / 2 });

	var numOfRows = images.length / 2;
	//make grid
	for (i = 0; i < numOfRows; i++) {
		for (j = 0; j < 2; j++) {
			post = $("<div></div>");
			post.css({position: "absolute", width: "250px", height: "200px", top: i * 225, left: j * 275 + 25 });
			img = $("<img src=\"" + images[j* numOfRows + i] + "\">");
			img.css({ height: "200px", width: "250px" });
			post.append(img);
			grid_div.append(post);
		}
	}
};