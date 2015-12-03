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

		//set up basic layout
		var window_height = $(window).height();
		var window_width = $(window).width();
		//$("#main-container").css({ "height": window_height, "width": window_width });

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
		img.css({ height: media_bar_height, width: media_bar_height });
		img.attr("height", media_bar_height);
		img.attr("width", media_bar_height);
		$("#artwork").append(img);
});
