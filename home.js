$(document).ready(function () {

		//set up basic layout
		var window_height = $(window).height();
		var window_width = $(window).width();
		$("#main-container").css({ "height": window_height, "width": window_width });

		var media_bar_height = window_height / 12;
		$("#media-bar").css({ "height": media_bar_height });
		$("#media-bar-wrapper > div > img").attr("height", media_bar_height);

		var img_top = (window_height / 2) - ($("img").height() / 2);
		$("#center-div-wrapper > img").css({ "top": (window_height / 2) - ($("img").height() / 2) - 25,
		 																		 "left": (window_width / 2) - ($("img").width() / 2),
																				  });
		$("#links-div").css({ "top": $("img").height() + img_top - 75, "left": (window_width / 2) - ($("#links-div").width() / 2) });

		$("#artwork").css({ "height": "100px", "width": "100px", "background-color": "white" });
		$("<img id='media-bar-artwork' src='media/the-daily-dose-mix.jpg' width='" + media_bar_height + "' height='" + media_bar_height + "'>" );
		$("#artwork").append($("#media-bar-artwork"));
		//media_bar_artwork.css({ "height": "auto", "max-width": media_bar_height });

});
