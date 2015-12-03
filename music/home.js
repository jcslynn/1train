$(document).ready(function () {
		images = new Array(20);
		images[0] = "../media/audio-push-good-vibe-tribe.jpg";
		images[1] = "../media/case-arnold-as-the-world-turns.jpg";
		images[2] = "../media/fetty-my-way.jpg";
		images[3] = "../media/nyck-world-in-pocket.jpg";
		images[4] = "../media/oddisee.jpg";
		images[5] = "../media/towkio-wav-theory.jpg";
		images[6] = "../media/websterx-lately.jpg";
		images[7] = "../media/audio-push-good-vibe-tribe.jpg";
		images[8] = "../media/case-arnold-as-the-world-turns.jpg";
		images[9] = "../media/fetty-my-way.jpg";
		images[10] = "../media/nyck-world-in-pocket.jpg";
		images[11] = "../media/oddisee.jpg";
		images[12] = "../media/towkio-wav-theory.jpg";
		images[13] = "../media/websterx-lately.jpg";
		images[14] = "../media/case-arnold-as-the-world-turns.jpg";
		images[15] = "../media/fetty-my-way.jpg";
		images[16] = "../media/nyck-world-in-pocket.jpg";
		images[17] = "../media/oddisee.jpg";
		images[18] = "../media/towkio-wav-theory.jpg";
		images[19] = "../media/websterx-lately.jpg";

		carousel[0] = "../photoshop/carousel-headphones-black-red.png";
		carousel[1] = "../media/50-cent-too-rich.jpg";

		caro_text = new Array(2);
		caro_text[0] = "music";
		caro_text[1] = "song of the week";
		curr_caro = 0;

		//set up basic layout
		var window_height = $(window).height();
		var window_width = $(window).width();
		$("#main-container").css({ "height": window_height, "width": window_width });

		var media_bar_height = window_height / 12;
		$("#media-bar").css({ "height": media_bar_height });
		$("#media-bar-wrapper > div > img").attr("height", media_bar_height);

		//layout for media bar
		$("#artwork").css({ "height": media_bar_height, "width": media_bar_height, "left": media_bar_height / 4 })
		$("#pause-button").hide();
		$("#play-pause").css({ "left": media_bar_height * 1.5 });
		$("#song-queue").css({ "right": "0" });
		$("#video-queue").css({ "right": $("#song-queue").width() });
		$("#reading-list").css({ "right": ($("#song-queue").width() * 2) - 20 });
		$("#volume").css({ "right": $("#song-queue").width() * 3 - 10});

		img = $("<img src=\"" + images[Math.floor((Math.random() * 20))] + "\">");
		img.css({ height: "50px", width: "50px" });
		$("#artwork").append(img);

		//attempt to position logo and text in center
		var left_div_height = window_height - media_bar_height;
		var left_div_width = $("#logo").width();
		$("#left").css({ "height": left_div_height, "top": media_bar_height, "width": left_div_width });
		$("#left-div-wrapper").css({ "height": left_div_height, "top": media_bar_height, "width": left_div_width });

		var img_top = (left_div_height / 2) - ($("#logo").height() / 2) - 50;
		var img_left = 75;
		$("#logo").css({ "top": img_top - 100, "left":  img_left });

		$("#links-div").css({ "top": $("#logo").height() + img_top - 150, "left": img_left + ($("#links-div").width() / 4) });
		$("#carousel").css({ "top": $("#logo").height() + img_top - 75, "left": img_left + ($("#logo").width() / 4) - 25 });
		//logo and links are centered

		posts = new makePostsGrid($("#grid"), window_width, media_bar_height);

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

});

var makePostsGrid = function (grid_div, win_wid, media_bar_height) {
	this.grid_div = grid_div;

	//make size of of grid
	grid_div.css({ position: "absolute", width: win_wid / 2, top: media_bar_height + 50, left: win_wid / 2 });

	//make grid
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 2; j++) {
			post = $("<div></div>");
			post.css({position: "absolute", width: "250px", height: "200px", top: i * 225, left: j * 275 + 25 });
			img = $("<img src=\"" + images[j*10 + i] + "\">");
			img.css({ height: "200px", width: "250px" });
			post.append(img);
			grid_div.append(post);
		}
	}
};
