var cycleMethodName = false;
var cycleMethod;

/**
 * 
 */
function cllInit() {
   
   $(".cll_page:not(:first)").hide();
	bindNav();
	loadRates();
	loadImages();
       
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


/**
 * 
 */
function loadRates() {
	
	$("#cabin_selector").val("1");
	
	$.getJSON("http://localhost/cll/api/v1/rates", null, function(msg) {
		
		setRateDisplay(msg["1"]);
		
		$("#cabin_selector").change(function() {
			
			setRateDisplay(msg[$(this).val()]);
			
		});
		
	})
	
}


function setRateDisplay(rates) {
	
	$("#cabin_rates_display tr:not(:first)").remove();
	
	$.each(rates, function(occ, val) {
		
		$("<tr></tr>")
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

function loadImages() {
	
	$.getJSON("http://localhost/cll/api/v1/images", null, function(msg) {
		
		setResortImages(msg["img_resort"]["1"]);
		setRestaurantImages(msg["img_restaurant"]["1"]);
		
	});
	
}


function setResortImages(imgs) {
	
	resortImageCount = imgs.length;
	resortImagePos = 0;
	
	$.each(imgs, function(index, imgPath) {
			
		$("<img>")
			.attr("src", imgPath)
			.appendTo("#img_resort")
			.hide();

	});
	
	$("#img_resort img:eq(0)").show().addClass("activeImage");
	
}


function cycleResortImages() {
	
	$("#img_resort img:eq("+resortImagePos+")").hide();
	
	resortImagePos++;
	if(resortImagePos == resortImageCount) resortImagePos = 0;
	
	$("#img_resort img:eq("+resortImagePos+")").show();
	
	cycleMethod = setTimeout("cycleResortImages()", 3500);
	
}


function setRestaurantImages(imgs) {
	
	restImageCount = imgs.length;
	restImagePos = 0;
	
	$.each(imgs, function(index, imgPath) {
		
		$("<img>")
			.attr("src", imgPath)
			.appendTo("#img_restaurant")
			.hide();
		
	});
	
}

function cycleRestaurantImages() {
	
	$("#img_restaurant img:eq("+restImagePos+")").hide();
	
	restImagePos++;
	if(restImagePos == restImageCount) restImagePos = 0;
	
	$("#img_restaurant img:eq("+restImagePos+")").show();
	
	cycleMethod = setTimeout("cycleRestaurantImages()", 3500);
	
}





function loadEvents() {
	
}


function pageSelector(pageid) {
	
	if(cycleMethodName) clearTimeout(cycleMethod);
	
	$(".cll_page").hide();
	$("#cll_"+pageid).show();
	
	switch(pageid) {
		case "resort":
			cycleMethodName = "cycleResortImages()";
			cycleResortImages();
			break;
		case "bar_restaurant":
			cycleMethodName = "cycleRestaurantImages()";
			cycleRestaurantImages();
			break;
		default:
			cycleMethod = false;
			break;
	}
	
}
