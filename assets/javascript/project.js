
//Weather app api key
var APIKey = "166a433c57516f51dfab1f7edaed8413";

var weatherResponses = [];

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

        //Pushes Weather info to an array
        weatherResponses.push(response.name);
        weatherResponses.push(response.main.temp);
        weatherResponses.push(response.weather[0].main);
        weatherResponses.push(response.main.humidity);
        console.log(weatherResponses);
        weatherStore();

        // Generate spotify conten and transfer content to HTML        
        if (response.main.temp >= 70) {
            
            
        }
        else {
            var key = "SOJfd3xKk_kDAye_unZQwweF";
            var queryURL = "http://quotes.rest/qod.json?category=inspire";

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
        });
    });
    
    //Firebase configuration
    var config = {
        apiKey: "AIzaSyDq5A7kOXmgCqqTmOv1CkqHhZNsqHRi_mk",
        authDomain: "project-weather-storage.firebaseapp.com",
        databaseURL: "https://project-weather-storage.firebaseio.com",
        projectId: "project-weather-storage",
        storageBucket: "project-weather-storage.appspot.com",
        messagingSenderId: "12063233925"
      };
      firebase.initializeApp(config);
      var database = firebase.database();

//Function that saves weather data
function weatherStore() {
    debugger;
    database.ref().push({
        city: weatherResponses[0],
        temp: weatherResponses[1],
        forecast: weatherResponses[2],
        humidity: weatherResponses[3]
    });
}
weatherStore();

database.ref().on("child_added", function(childSnapshot) {
    //populates the weater section with a more thorough forcast
    var tr = $("<tr>");
    tr.addClass("weather-font");

    var td1 = $("<td>");
    td1.html(childSnapshot.val().city);

    var td2 = $("<td>");
    td2.html(childSnapshot.val().temp);

    var td3 = $("<td>");
    td3.html(childSnapshot.val().forecast);

    var td4 = $("<td>");
    td4.html(childSnapshot.val().humidity);

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);

    $(".weather-body").append(tr);
    weatherResponses = [];
})

// //Extract spotify generated token from redirect url
// var hash = window.location.href.substr(1); //url of the current page
// var arHash = hash.split('='); //this splits the url at the = sign
// var brHash =  arHash[1]; // this stores the second half of the url
// var crHash = brHash.split('&'); //this splits the second half at the &
// var token = crHash[0]; // this stores the first half of the remainder

// console.log(token);


//spotify 1st call

// //spotify query
// var queryURL = "https://api.spotify.com/v1/tracks/7KwZNVEaqikRSBSpyhXK2j"; 
// //spotify api retrieve
// $.ajax({
//   url: queryURL,
//   method: "GET",
//   beforeSend: function(request) {
//     request.setRequestHeader("Accept", "application/json");
//     request.setRequestHeader("Content-Type", "application/json");
//     request.setRequestHeader("Authorization", "Bearer", token);
//   },
//   }).then(function(response) {
//     console.log(response);
//     //Retrieves song info
//     title = response.name;
//     artist = response.artists[0].name;
//     album = response.album.name
//     //retrieves and inserts song mp3
//     var iframe = $("<iframe>");
//     iframe.attr("src", response.preview_url);
//     $("#generate").html(iframe);
//     //inserts song info
//     $("#track-table").removeClass("fader-none");
//     $("#artist").html(artist);
//     $("#track").html(title);
//     $("#album").html(album); 
//   });



//spotify second call

// //spotify query
// var queryURL = "https://api.spotify.com/v1/tracks/0WKYRFtH6KKbaNWjsxqm70"; 
// //spotify api retrieve
// $.ajax({
//   url: queryURL,
//   method: "GET",
//   beforeSend: function(request) {
//     request.setRequestHeader("Accept", "application/json");
//     request.setRequestHeader("Content-Type", "application/json");
//     request.setRequestHeader("Authorization", "Bearer", token);
//   },
//   }).then(function(response) {
//     //retrieves song info
//     title = response.name;
//     artist = response.artists[0].name;
//     album = response.album.name
//     console.log(response);
//     //retrieves and inserts mp3
//     var iframe = $("<iframe>");
//     iframe.attr("src", response.preview_url);
//     $("#generate").html(iframe);
//     //inserts song info
//     $("#track-table").removeClass("fader-none");
//     $("#artist").html(artist);
//     $("#track").html(title);
//     $("#album").html(album);
//   });