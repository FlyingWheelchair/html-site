NODE_SERVER_URL="http://flyingwheelchair.com:3000"
// data has to be in the following format:
// { "origin_code": "LHR", "destination_code": "BCN", "date": "2020-06-20",  "pax_adt": 1, "pax_chd": 1, "SpecialServiceCode": "WCHS"}

flights_offers = [];
function AirShoppingRQ(data) {
	$.ajax({
	    type: "POST",
	    url: NODE_SERVER_URL + "/AirShoppingRQ",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(data),
		contentType: "application/json",
	    dataType: "json",
	    success: function(response){
			console.log("Received " + response.length + " flight offers");
			flights_offers = response;
			rateFlightsOffers();
	    },
	    failure: function(errMsg) {
	        alert(errMsg);
	    }
	});
}

// { "offer_ref_id": "OFFER1", "offer_item_ref_id": "OFFERITEM1_1", "shopping_response_ref_id": "201-2854d1876cd343c9aa78bb60b2afd4a", "special_service_code": "WCHS", "pax_list": [{ "given_name": "John","surname": "Smiths", "title_name": "Mr", "ptc"" "ADT" }]}
function OfferPriceRQ(data) {
	$.post(NODE_SERVER_URL + "/OfferPriceRQ", data, function(){

	});
}

var search_results="";

var flights_offers = [
	{ departure_time: "9am", arrival_time: "11.10am", flight_number: "2232", flight_duration: "1h 25m", flight_origin: "LHR", flight_destination: "BCN", price: "189", aircraft: "B737" }
];

var flight_offers_rated = [
	{ departure_time: "9am", arrival_time: "11.10am", flight_number: "2232", flight_duration: "1h 25m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Great flight", price: "189"},
	{ departure_time: "9.30am", arrival_time: "11.45am", flight_number: "2432", flight_duration: "1h 15m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Average", price: "209"},
	{ departure_time: "11am", arrival_time: "1pm", flight_number: "2532", flight_duration: "2h 05m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Poor flight", price: "489"}
];

var flight_offer_tpl = $.templates("#flight_offer_tpl");

var xsdata = {
	"airport_rating": { "LHR": "has poor accessiblity", "BCN": "has great accessiblity" },
	"aircraft": { 
		"B737": {"cargo_door": "just large enough", "armrest": "movable", "aisle": "average", "bathroom": "average" }, 
		"A320": {"cargo_door": "larger than needed", "armrest": "movable", "aisle": "average", "bathroom": "large" },
		"A319": {"cargo_door": "larger than needed", "armrest": "not movable", "aisle": "large", "bathroom": "average" }
	}
};

function rateFlightsOffers() {
	// first filter out wrong results
	flights_offers = flights_offers.filter(function(value){
    	return (value.flight_origin == "LHR" && value.flight_destination == "BCN");
	});	

	$.each( flights_offers, function(idx,flight_offer){
		// originally in this format "P0DT1H59M0S"
		flight_offer.flight_duration = flight_offer.flight_duration.replace("P0DT","").replace("0S","").replace("H","h").replace("M","m");
	});
	// assign aircraft
	flights_offers[0].aircraft = "A320";
	flights_offers[0].xs_summary_text = "Great flight";
	flights_offers[0].xs_summary_icon = "greencheck.png";
	flights_offers[1].aircraft = "A319";
	flights_offers[1].xs_summary_text = "Average";
	flights_offers[1].xs_summary_icon = "warning.png";
	flights_offers[2].aircraft = "B737";	
	flights_offers[2].xs_summary_text = "Poor";
	flights_offers[2].xs_summary_icon = "close.png";
	// keep only first three
	flights_offers = flights_offers.slice(0,3);

	// add meta
	$.each( flights_offers, function(idx, flight_offer) {
		flight_offer.gate =
		flight_offer.bathroom = xsdata.aircraft[flight_offer.aircraft].bathroom; 
		flight_offer.armrest = xsdata.aircraft[flight_offer.aircraft].armrest;
		flight_offer.cargo_door = xsdata.aircraft[flight_offer.aircraft].cargo_door;
		flight_offer.aisle = xsdata.aircraft[flight_offer.aircraft].aisle;
		flight_offer.departure_airport_rating = xsdata.airport_rating[flight_offer.flight_origin];
		flight_offer.arrival_airport_rating = xsdata.airport_rating[flight_offer.flight_destination];	
	});
	showResults();
}

function scrollToResults(){
	$('html, body').animate({ scrollTop: $("#booking_results").offset().top},"slow", "swing", function(){
		location.href="#booking_results";
	});

}

function renderResults() {
	var rendered_html = flight_offer_tpl.render(flights_offers);
	$("#booking_results_table tbody").html(rendered_html);
	$("#booking_results_table tbody tr").click(function(){
		// scroll to payment_form
	$("#selected_flight_table  tbody").html(flight_offer_tpl.render(flights_offers[0]));
	$('html, body').animate({ scrollTop: $("#payment_form").offset().top},"slow", "swing", function(){
		location.href="#payment_form";
	});

	});
}

function showResults(){
	renderResults()
	scrollToResults();
}


$(function(){

	$("#booking_form_form").submit(function(){
		console.log("Booking form submitted");
		form_data = { };
		$.each($( this ).serializeArray(),function(key,value){
			form_data[value.name] = value.value;
		});
		console.log("Form data =");
		console.log(form_data);
		AirShoppingRQ({
			"origin_code": form_data.booking_form_origin,
			"destination_code": form_data.booking_form_destination,
			"date": form_data.booking_form_date
		});
		console.log("AirShoppingRQ method called");
		$('html, body').animate({ scrollTop: $("#booking_wait").offset().top},"slow", "swing", function(){
			location.href="#booking_wait";
		});

		return false;
	});

});

