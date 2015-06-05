var cabinImages;
var cycleContainer = false;
var cycleMethod;
var cabinRates;

/**
 * 
 */
function cllInit() {
   
   $(".cll_page:not(:first)").hide();
	bindNav();
	loadImages();
	//loadRates();
	loadCottages();
    bindMenuView();
}


function bindNav() {
	
	$("#cll_nav").find("a").each(function() {
		
		var pageid = (($(this).text()).toLowerCase()).replace("/","_");
		var parent = $(this).parent();
		
		$(this).click(function() {
			
			$("#cll_nav").find("li").removeClass("active");
			parent.addClass("active");
			pageSelector(pageid);
			
		});
		
	});
	
}


function loadCottages() {
	
	$("#cabin_selector").val("1");
	
	$.getJSON("api/v1/api.php?request=cottages", null, function(msg) {
		
		var rates = msg.rates;
		var descrip = msg.descrip;
		
		setRateDisplay(rates["1"]);
		setCabinDescrip(descrip["1"]);
		
		$("#cabin_selector").change(function() {
			
			setRateDisplay(rates[$(this).val()]);
			setCabinDescrip(descrip[$(this).val()]);
			
			clearTimeout(cycleMethod);
			setImages("img_cabin", cabinImages[$(this).val()]);
			cycleImages();
			
		});
		
	});
	
}


/**
 * 
 */
function loadRates() {
	
	$("#cabin_selector").val("1");
	
	$.getJSON("api/v1/api.php?request=rates", null, function(msg) {
		
		setRateDisplay(msg["1"]);
		
		$("#cabin_selector").change(function() {
			
			setRateDisplay(msg[$(this).val()]);
			
			clearTimeout(cycleMethod);
			setImages("img_cabin", cabinImages[$(this).val()]);
			cycleImages();
			
		});
		
	})
	
}


function setRateDisplay(rates) {
	
	$("#cabin_rates_display tr:not(:first)").remove();
	
	$.each(rates, function(occ, val) {
		
		$("<tr></tr>")
			.append($("<td></td>").text(""))
			.append($("<td></td>").text(val.occupants))
			.append($("<td></td>").text(val.deposit))
			.append($("<td></td>").text(val.spring))
			.append($("<td></td>").text(val.summer))
			.append($("<td></td>").text(val.fall))
			.append($("<td></td>").text(val.winter))
			.append($("<td></td>").text(val.daily))
			.append($("<td></td>").text(val.winterDaily))
			.appendTo("#cabin_rates_display");
		
	});
	
}


function setCabinDescrip(descrip) {
	
	var ulist = $("<ul></ul>").addClass("cll-side-med");
	
	var roomText = parseInt(descrip.rooms) > 1 ? " Bedrooms" : " Bedroom";
	$("<li></li>").text(descrip.rooms+roomText).appendTo(ulist);
	
	if(parseInt(descrip.loft) > 0) {
		$("<li></li>").text("Loft").appendTo(ulist);
	}
	
	if(parseInt(descrip.fullbed) > 0) {
		var fullbedText = parseInt(descrip.fullbed) > 1 ? " Full Beds" : " Full Bed";
		$("<li></li>").text(descrip.fullbed+fullbedText).appendTo(ulist);
	}
	
	if(parseInt(descrip.queenbed) > 0) {
		var queenbedText = parseInt(descrip.queenbed) > 1 ? " Queen Beds" : " Queen Bed";
		$("<li></li>").text(descrip.queenbed+queenbedText).appendTo(ulist);
	}
	
	if(parseInt(descrip.twinbed) > 0) {
		var twinbedText = parseInt(descrip.twinbed) > 1 ? " Twin Beds" : " Twin Bed";
		$("<li></li>").text(descrip.twinbed+twinbedText).appendTo(ulist);
	}
	
	$("<li></li>").text("Air Conditioned").appendTo(ulist);
	$("<li></li>").text("Satellite TV").appendTo(ulist);
	
	$("#cll_cabin_descrip_container")
			.find("ul")
			.remove()
			.end()
			.append(ulist);
}

function loadImages() {
	
	$.getJSON("api/v1/api.php?request=images", null, function(msg) {
		
		setImages("img_resort", msg["img_resort"]["1"]);
		setImages("img_restaurant", msg["img_restaurant"]["1"]);
		cabinImages = msg["img_cabin"];
		
//		setResortImages(msg["img_resort"]["1"]);
//		setRestaurantImages(msg["img_restaurant"]["1"]);
//		cabinImages = msg["img_cabin"];
		
	});
	
}


function setImages(container, imgs) {
	
	$("#"+container).find("img").remove();
	
	$.each(imgs, function(index, imgPath) {
		$("<img>")
			.attr("src", imgPath)
			.appendTo("#"+container)
			.hide();
	});
	
}


function pageSelector(pageid) {
	
	if(cycleContainer) clearTimeout(cycleMethod);
	
	$(".cll_page").hide();
	$("#cll_"+pageid).show();
	
	switch(pageid) {
		case "resort":
			cycleContainer = "img_resort";
			break;
		case "bar_restaurant":
			cycleContainer = "img_restaurant";
			break;
		case "cottages":
			cycleContainer = "img_cabin";
			setImages("img_cabin", cabinImages["1"]);
			break;
		default:
			cycleContainer = false;
			break;
	}
	
	if(!cycleContainer) return;
	
	cycleImgPos = $("#"+cycleContainer).find("img").length - 1;
	cycleImages();
	
}


function cycleImages() {
	
	// no cycle unless multiple images exist
	if($("#"+cycleContainer).find("img").length < 2) {
		
		$("#"+cycleContainer).find("img").show();
		return;
		
	}
	
	$("#"+cycleContainer).find("img").hide();
	cycleImgPos++;
	if(cycleImgPos === $("#"+cycleContainer).find("img").length) cycleImgPos = 0;
	$("#"+cycleContainer+" img:eq("+cycleImgPos+")").show();
	
	cycleMethod = setTimeout("cycleImages()", 3000);
	
}


function bindMenuView() {
	
	$("#cll_menu").dialog({
		autoOpen:false,
		width:880,
		height:1063,
		show: {
			effect: "slide",
			duration: "1000"
		},
		hide: {
			effect: "fade",
			duration: "1000"
		}
	});
	
	$("#cll_menu_view").click(function() {
		$("#cll_menu").dialog("open");
	});
	
}



function loadEvents() {
	
}


