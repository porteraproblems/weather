//Document Ready Funciton
$(document).ready(function () {
    //Search Button
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var searchValue = $("#search-value").val();
        $("search-value").val("");
        searchValue(searchValue);
        var citiesSearch = [];
        citiesSearch = JSON.parse(localStorage.getItem("citiesSearch")) || [];
        citiesSearch.push(searchValue);
        localStorage.setItem("citiesSearch", JSON.stringify(citiesSearch));
        searchWeather(searchValue);
    });

    // function to search weather
    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appdid=166a4335751651dfab1fedead8413&units=imperial",
            dataType: "json",
        }).then(function (data) {
            console.log(data);
            $("#today").empty();
            // creating a card for appending
            var title = $("<h3>").addClass("card-title").text(data.name);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind speed: " + data.wind.speed);
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity);
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
            var tempLow = $("<p>").addClass("card-text").text("Low Temp: " + data.main.tempLow);
            var tempHigh = $("<p>").addClass("card-text").text("High Temp: " + data.main.tempHigh);
            var condition = $("<p>").addClass("card-text").text("Weather Conditions: " + data.main.condition);
            var icon = (`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
            var cardBody = $("<div").addClass("card-body");
            //appends
            cardBody.append(title, wind, humid, temp, tempHigh, tempLow, condition, icon)
            card.append(cardBody);
            $("#today").append(card)
            uvIndex();
            forecast(searchValue);
        });
    };
    // function to get a 5 day forecast, it's a different url
    //use a forloop to loop over all forecasts (by spec)
    function forecast(searchValue) {
        $.ajax({
            type: "GET",
            url: "",
            dataType: "JSON",
        }).then(function (data) {
            console.log(data)
            for (var i = 4; i < data.list.length; i += 8) {
                var setDate = data.list[i].dt_txt;
                setDate = setDate.split("-");
                var month = setDate[1];
                var day = setDate[2].slice(0, 2);
                var year = setDate[0];
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity);
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
                var icon = (`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`)
                var title = $("<h5>").addClass("card-title").text(`Date: ${month} /${day} / ${year}`);
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind speed: " + data.wind.speed);
                var cardBody = $("<div").addClass("card-body");
                cardBody.append(title, icon, temp, humid, wind)
                card.append(cardBody);
                $("#today").append(card);
            }
        })
    }
    //function to ger UV index, this is a third url call
    function uvIndex() {
        $.ajax({
            type: "GET",
            url: "",
            type: "JSON",
        }).then(function (data) {
            var uvIndex = $("<p>").addClass("card-text").text(`UV-Index: ${data.value}`);
            var button = $("<button>").addClass("btn uIndex");
            button.append(uvIndex);
            console.log(data);
            if (data.value < 3) {
                $(".uTndex").addClass("low");
            }
            else if (data.value <= 6) {
                $(".uTndex").addClass("moderate");
            }
            else if (data.value < 8) {
                $(".uTndex").addClass("high");
            }
            else if (data.value < 11) {
                $(".uTndex").addClass("veryHigh");
            }
            else if (data.value > 11) {
                $(".uTndex").addClass("extreme");
            }
        })
    }
    //History recall
    function searched() {
        var searchedLocalStorage = JSON.parse(localStorage.getItem("searched")) || [];
        for (i = 0; i < searchedLocalStorage.length; i++) {
            searchedFromLocal = searchedFromLocal[i];
            $("#city-list").append("<div>" + "<button class = 'itemList brn brn-primary' >" + searchedFromLocal + "</button");
        }
    }
})
