$(document).ready(function () {

		//set up basic layout
		var window_height = $(window).height();
		var window_width = $(window).width();
		$("#main-container").css({ "height": window_height, "width": window_width });

		var media_bar_height = window_height / 12;
		$("#media-bar").css({ "height": media_bar_height });
		$("#media-bar-wrapper > div > img").attr("height", media_bar_height);

		//attempt to position logo and text in center
		var img_top = (window_height / 2) - ($("#logo").height() / 2);
		//$("#logo").css({ "top": (window_height / 2) - ($("#logo").height() / 2),
		// 																		 "left": (window_width / 2) - ($("#logo").width() / 2) });
		$("#links-div").css({ "top": $("#logo").height() + img_top - 75, "left": (window_width / 2) - ($("#links-div").width() / 2) });

});
