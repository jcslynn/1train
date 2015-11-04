$(document).ready(function () {

	for (i = 0; i < 9; i++) {
		$("#mus-img-" + i).hide();
	}
	
	var img_srcs = ["src='http://thedosemusic.com/wp-content/uploads/2015/11/10249201_1607342699554366_224367251_n-400x260.jpg'",
					"src='http://thedosemusic.com/wp-content/uploads/2015/11/CSlUBamUkAAVe3l-400x260.jpg'",
					"src='http://thedosemusic.com/wp-content/uploads/2015/11/Ru9E1yus8861Hq53fA3rE2oxlpB0tradM3eXMKLzyklPUhe0vyRad2lU4VNhugrvODtNWi3dqFKyOwyjKlfVm1lkjMks2048-400x260.jpg'"];
	
	var img_alts = ["young roddy my business", "lashaun love impressions", "taylor bennett"];			
					
	var cat_width = ($(window).width()) / 2;
	var cat_height = ($(window).height()) / 2;
	
	console.log(cat_width);
	console.log(cat_height);
	
	$(".category").css({ "width": cat_width, "height": cat_height });
	$("#music").css({ "top": 0, "left": 0  });
	$("#sports").css({ "top": cat_height, "left": 0 });
	$("#art").css({ "top": 0, "right": 0 });
	$("#fashion").css({ "top": cat_height, "right": 0 });
	
	var cell_width = $(".category").width() / 3;
	var cell_height = $(".category").height() / 3;
	
	for (i = 0; i < 9; i++) {
		if (i != 8) {
			mus = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			mus.addClass("cell");
			
			mus_div = $("<div class='cell-img-div'></div>");
			mus_div.css({ "width": cell_width * .75, "height": cell_height * .75 });
			mus_div.appendTo(mus);
			cell_img = $("#mus-img-" + i).clone();
			//cell_img.attr("src", "http://thedosemusic.com/wp-content/uploads/2015/11/CSlUBamUkAAVe3l-400x260.jpg");
			cell_img.attr("width", cell_width * .8);
			cell_img.attr("height", cell_height * .9);
			cell_img.css({ "width": cell_width * .8, "height": cell_height * .9 });
	
			cell_img.show();
			cell_img.appendTo(mus_div);
			
			$("#music > .cat_div").append(mus);
		} else {
			mus = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			mus.addClass("cell");
			mus.css({ "background-color": "#345496", "color": "white", "font-size": "120%" });
			mus.append("<p>music.</p>");
			$("#music > .cat_div").append(mus);
		}
		
		if (i != 2) {
			sports = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });							
			sports.addClass("cell");
			$("#sports > .cat_div").append(sports);
		} else {
			sports = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			sports.addClass("cell");
			sports.css({ "background-color": "#345496" });
			$("#sports > .cat_div").append(sports);
		}
		
		if (i != 6) {
			art = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			art.addClass("cell");
			$("#art > .cat_div").append(art);
		} else {
			art = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			art.addClass("cell");
			art.css({ "background-color": "#345496" });
			$("#art > .cat_div").append(art);
		}
		
		if (i != 0) {
			fash = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });	
			fash.addClass("cell");
			$("#fashion > .cat_div").append(fash);
		} else {
			fash = $("<div></div>").css({ "width": cell_width, "height" : cell_height, "position": "absolute",
									"top": Math.floor(i / 3) * cell_height, "left": (i % 3) * cell_width });
			fash.addClass("cell");
			fash.css({ "background-color": "#345496" });
			$("#fashion > .cat_div").append(fash);
		}
	}	
	
	$(".cell").css({ "border": "thin solid #345496 " });
	
	$("#logo").css({ "height": cell_height * 2, "width": cell_width * 2, "top": 2 * cell_height, "left": 2 * cell_width });
});