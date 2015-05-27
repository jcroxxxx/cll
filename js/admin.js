var cabins;

function loadCabins() {

	$("#cabin_selector").val("1");

	$.getJSON("api/cll.php", "cntrl=load", function(msg) {
		cabins = msg;
		occupantCount = setOccupants("1");
		setRates("1", occupantCount);
	});
	
	
	$("#cabin_selector").change(function() {
		var num = $(this).val();
		occupantCount = setOccupants(num);
		setRates(num, occupantCount);
	});
	
	
	$("#occupants").change(function() {
		var num = $("#cabin_selector").val();
		var occupantCount = ""+$(this).val();
		setRates(num, occupantCount);
	});
	
}


/**
 *
 */
function setOccupants(num) {

	$("#occupants").find("option").remove();

	var cabin = cabins.rates[num];
	var occupantCount = null;
	
	$.each(cabin, function(occupants, vals) {
	
		$("#occupants")
			.append(
				$("<option></option>")
					.val(occupants)
					.text(occupants));
					
		if(occupantCount == null) occupantCount = occupants;
					
	});
	
	return occupantCount;

}


/**
 *
 */
function setRates(num, occupants) {

	$("#cabin_title").text("Cabin " + num);

	var cabin = cabins.rates[num][occupants];
	
	$.each(cabin, function(field, rate) {
	
		$("#"+field).val(rate);
	
	});

}


/**
 *
 */
function bindRatesDialog() {

	$("#admin_cottage_rates").dialog({
		autoOpen: false,
		height: 500,
		width: 600,
		modal: true,
		buttons: {
			"Save": function() {
				$(this).dialog("close");
			},
			"Cancel": function() {$(this).dialog("close");}
		}
	});
	
	$("#btnRates").click(function() {
		$("#admin_cottage_rates").dialog("open");
	});

}




