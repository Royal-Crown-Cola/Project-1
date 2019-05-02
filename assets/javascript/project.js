
//Weather app api key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var quoteCat = ["management", "inspire", "funny"]
var weatherGif = ["https://thumbs.gfycat.com/WellinformedHoarseAnnashummingbird-size_restricted.gif", "https://thumbs.gfycat.com/ImaginarySoupyHuman-small.gif",
"https://thumbs.gfycat.com/PerfectMemorableAlaskanhusky-max-1mb.gif", "https://media.giphy.com/media/XBwWNIY6WY7g4/giphy.gif", "https://media3.giphy.com/media/NWFgmiGdF4rGo/giphy.gif",
"https://cmgpbpeyeonthestorm.files.wordpress.com/2018/02/download.gif"];

// On click function that retrieves user location input and determines which spotify query to initiate
$("#submit").on("click", function(e) {

    e.preventDefault();
    var city = $("#input_text").val().trim();
    console.log(city);
    $("#input_text").val("");

    // Here we are building the URL we need to query the weather api database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" + city + ",Burundi&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {
        console.log(queryURL);
        console.log(response);
        //displays basic city info on main page
        $("#city-input").text("City: " + city);
        $("#temp-input").text("Temp: " + response.main.temp + " degrees");
        $("#for-input").text("Forecast: " + response.weather[0].main);
        // Generate spotify conten and transfer content to HTML        
        if (response.main.temp >= 70) {
          quoteRender(2);
            
        }
        else if (response.main.temp <= 69 && response.main.temp >= 32) {
          quoteRender(1);
        }
        else {
            quoteRender(0);
              }

        if (response.weather[0].main === "Clouds") {
          console.log("clouds");
          gifRender(0);
        }
        else if (response.weather[0].main === "Rain") {
          console.log("rain");
          gifRender(1);
        }
        else if (response.weather[0].main === "Clear") {
          console.log("clear")
          gifRender(2);
        }
        else if (response.weather[0].main === "Snow") {
          console.log("snow")
          gifRender(3);
        }
        else if (response.weather[0].main === "Thunderstorm") {
        console.log("t-storms");
        gifRender(4);
        }
        else {
          gifRender(5);
        }
        });
    });

//this function renders the appropriate quote
  function quoteRender(x) {
    var key = "SOJfd3xKk_kDAye_unZQwweF";
            var queryURL = "http://quotes.rest/qod.json?category=" + quoteCat[x];

            $.ajax({
                url: queryURL,
                method:"GET",
                beforeSend: function(request) {
                    request.setRequestHeader("X-TheySaidSo-Api-Secret", key);
                }
            }).then(function(response) {
                console.log(response);
                $(".fader-start").removeClass("fader-none2");
                $("#track-table").removeClass("fader-none2");
                $(".fader-start").addClass("fader-go");
                $("#generate").html("&#34" + response.contents.quotes[0].quote + "&#34");
                $("#author").text(response.contents.quotes[0].author);
                $("#category").text(response.contents.quotes[0].category);
            })
  }

//This function renders the appropriate weather gif
  function gifRender(y) {

    var img = $("<img>");
    img.addClass("fader-go");
    img.attr("id", "img-size");
    img.attr("src", weatherGif[y]);

    $("#gif-input").html(img);
  }

  $('#fact').on('click', function (event) {
    
    event.preventDefault();
    var queryURL = "http://numbersapi.com/" + day + "/date";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#logo").text(response);
    
    })
})

var day = moment().format("M/DD");

    
