$(document).ready(function() {
var tvShow = ["The Americans","Atlanta","The Assassination of Gianni Versace", "American Crime Story","Barry","Billions","The Chi ","Dear White People","Divorce","Flint Town","Glow","killing Eve","One Day At a Time"];

//populate buttons on DOM from strings in tvShow array
function renderButtons() {
	for (var i = 0; i < tvShow.length; i++) {
		var showbutton = $("<button>");
		showbutton.html(tvShow[i]);
		showbutton.addClass("tv-button btn btn-secondary");
		showbutton.attr("data-name", tvShow[i]);
		$("#buttondiv").append(showbutton);
	}
}

//add a new button for user input
$("#add-show").on("click", function() {
	event.preventDefault();

	var newShow = $("#show-input").val();
	tvShow.push(newShow);
	$("#buttondiv").empty();
	renderButtons();
})

//click event for movie button
$("#buttondiv").on("click", ".tv-button", function() {
	//empty div for new results
	$("#gifdiv").empty();

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&limit=10&api_key=dc6zaTOxFJmzC";
	//ajax call to giphy
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){

		var results = response.data;

		//loop through the results
		for (var i = 0; i < results.length; i++) {
			var tvShowDiv = $("<div>");
			var p = $("<p>");
			p.html("Rating: " + results[i].rating.toUpperCase());

			var tvShowImg = $("<img>");
			//assign still and animate state and url to each giphy
			tvShowImg.attr("src", results[i].images.fixed_height_still.url);
			tvShowImg.attr("data-still", results[i].images.fixed_height_still.url);
			tvShowImg.attr("data-animate", results[i].images.fixed_height.url);
			tvShowImg.attr("data-state", "still");
			tvShowImg.addClass("imgclick");
			tvShowDiv.append(tvShowImg);
			tvShowDiv.append(p);
			tvShowDiv.addClass("gif-div");
			$("#gifdiv").prepend(tvShowDiv);
		}
	})
})

//change state of giphy and animate when clicked
$("#gifdiv").on("click", ".imgclick", function() {

	var state = $(this).attr("data-state");

	if(state === "still") {
		var animates = $(this).attr("data-animate");
		//change giphy link to the one to animate
		$(this).attr("src", animates);
		//change state of giphy to animate
        $(this).attr("data-state", "animate");
    } else {
        var still = $(this).attr("data-still");
        //change giphy link to the one that is still
        $(this).attr("src", still);
        //change state of giphy to animate
        $(this).attr("data-state", "still");
	}

})
renderButtons();
})
