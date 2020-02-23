NODE_SERVER_URL="http://flyingwheelchair.com:3000/"
// data has to be in the following format:
// { "origin_code": "LHR", "destination_code": "BCN", "date": "2020-06-20",  "pax_adt": 1, "pax_chd": 1, "SpecialServiceCode": "WCHS"}
function AirShoppingRQ(data) {
	$.post(NODE_SERVER_URL + "/AirShoppingRQ", data, function(){

	});
}

// { "offer_ref_id": "OFFER1", "offer_item_ref_id": "OFFERITEM1_1", "shopping_response_ref_id": "201-2854d1876cd343c9aa78bb60b2afd4a", "special_service_code": "WCHS", "pax_list": [{ "given_name": "John","surname": "Smiths", "title_name": "Mr", "ptc"" "ADT" }]}
function OfferPriceRQ(data) {
	$.post(NODE_SERVER_URL + "/OfferPriceRQ", data, function(){

	});
}

var search_results="";

var flight_offers_rated = [
	{ departure_time: "9am", arrival_time: "11.10am", flight_number: "2232", flight_duration: "1h 25m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Great flight", price: "189"},
	{ departure_time: "9.30am", arrival_time: "11.45am", flight_number: "2432", flight_duration: "1h 15m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Average", price: "209"},
	{ departure_time: "11am", arrival_time: "1pm", flight_number: "2532", flight_duration: "2h 05m", flight_origin: "LHR", flight_destination: "BCN", xs_summary_icon: "greencheckmark.png", xs_summary_text: "Poor flight", price: "489"}
];

var flight_offer_tpl = $.templates("#flight_offer_tpl");


function scrollToResults(){
	$('html, body').animate({ scrollTop: $("#booking_results").offset().top},"slow", "swing", function(){
		location.href="#booking_results";
	});

}

function renderResults() {
	var rendered_html = flight_offer_tpl.render(flight_offers_rated);
	$("#booking_results_table tbody").html(rendered_html);
}

function showResults(){
	renderResults()
	scrollToResults();
}


$(function(){

	$("#booking_form_form").submit(function(){
		console.log("Booking form submitted");
		$('html, body').animate({ scrollTop: $("#booking_wait").offset().top},"slow", "swing", function(){
			location.href="#booking_wait";
		});
		return false;
	});

});

