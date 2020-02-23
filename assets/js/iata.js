NODE_SERVER_URL="http://flyingwheelchair.com:3000/"
// data has to be in the following format:
// { "origin_code": "LHR", "destination_code": "BCN", "date": "2020-06-20",  "pax_adt": 1, "pax_chd": 1, "SpecialServiceCode": ""}
function AirShoppingRQ(data) {
	$.post(NODE_SERVER_URL + "/AirShoppingRQ", data, function(){

	});
}

// { "offer_ref_id": "OFFER1", "offer_item_ref_id": "OFFERITEM1_1", "shopping_response_ref_id": "201-2854d1876cd343c9aa78bb60b2afd4a", "special_service_code": "WCHS", "pax_list": [{ "given_name": "John","surname": "Smiths", "title_name": "Mr", "ptc"" "ADT" }]}
function OfferPriceRQ(data) {
	$.post(NODE_SERVER_URL + "/OfferPriceRQ", data, function(){

	});
}
