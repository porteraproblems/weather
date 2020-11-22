//Document Ready Funciton
$(document).ready(function () {

    //Search Button
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var searchValue = $("#search-value").val();
    $("search-value").val("");
    searchValue(searchValue)
    var citiesSearch = [];

    citiesSearch = JSON.parse(localStorage.getItem("citiesSearch")) || [];
    citiesSearch.push(searchValue);
    localStorage.setItem("citiesSearch", JSON.stringify(citiesSearch));

    searchWeather(searchValue);
});


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
        var temp =$("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
        var tempLow =$("<p>").addClass("card-text").text("Low Temp: " + data.main.tempLow);
        var tempHigh = $("<p>").addClass("card-text").text("High Temp: " + data.main.tempHigh);
        var condition = $("<p>").addClass("card-text").text("Weather Conditions: " + data.main.condition);
        var icon = (Image);
        var cardBody = $("<div").addClass("card-body");

        cardBody.append(title, wind, humid, temp, tempHigh, tempLow, condition, icon)
        card.append(cardBody);
        $("#today").append(card)
    });
};

// function to get a 5 day forecast, it's a different url
//use a forloop to loop over all forecasts (by spec)


//function to ger UV index, this is a third url call

// get current search history, if there s any

//print out search history