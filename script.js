$(document).ready(function () {

    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();
    })

    $("search-value").val("");
    searchValue(searchValue)
})

function searchWeather(searchValue) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appdid=166a4335751651dfab1fedead8413&units=imperial",
        dataType: "json",
    }).then(function (data) {
        // create history link for the search (look up .push()) this is sued to set items to localstorage


        $("#today").empty();

        // creating a card for appending
        var title = $("<h3>").addClass("card-title").text(data.name);
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind speed: " + data.wind.speed);
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity);
        var cardBody = $("<div").addClass("card-body");

        cardBody.append(title, wind, humid)
        card.append(cardBody);
        $("#today").append(card)
    });
};

// function to get a 5 day forecast, it's a different url
//use a forloop to loop over all forecasts (by spec)


//function to ger UV index, this is a third url call

// get current search history, if there s any

//print out search history