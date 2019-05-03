  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDq5A7kOXmgCqqTmOv1CkqHhZNsqHRi_mk",
    authDomain: "project-weather-storage.firebaseapp.com",
    databaseURL: "https://project-weather-storage.firebaseio.com",
    projectId: "project-weather-storage",
    storageBucket: "project-weather-storage.appspot.com",
    messagingSenderId: "12063233925"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  const txtEmail = $("#inputEmail").val().trim();
  const txtPassword = $("#inputPassword").val().trim();
  const btnLogIn = $('#btnLogIn');
  const btnSignUp = $('#btnSignUp');
  const btnLogOut = $('#btnLogOut');

  $("#btnLogin").on("click", function (e) {

//Weather app api key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var quoteCat = ["management", "inspire", "funny"]
var weatherGif = ["https://thumbs.gfycat.com/WellinformedHoarseAnnashummingbird-size_restricted.gif", "https://thumbs.gfycat.com/ImaginarySoupyHuman-small.gif",
"https://thumbs.gfycat.com/PerfectMemorableAlaskanhusky-max-1mb.gif", "https://media.giphy.com/media/XBwWNIY6WY7g4/giphy.gif", "https://media3.giphy.com/media/NWFgmiGdF4rGo/giphy.gif",
"https://cmgpbpeyeonthestorm.files.wordpress.com/2018/02/download.gif"];
    e.preventDefault();
    const email = $("#inputEmail").val().trim();
    const password = $("#inputPassword").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      //clear the fields
    });
  });

  $("#btnSignUp").on("click", function (e) {

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

    
    const email = $("#inputEmail").val().trim();
    const password = $("#inputPassword").val().trim();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // function to check if email is real
      function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      }
      isEmail();

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  });

  // checks to see if users are logged in or not
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser)
      // when user is not logged in, hide login button show inputs
      $("#btnLogOut").removeClass('hide');
      $("#inputEmail").addClass("hide");
      $("#inputPassword").addClass("hide");
      $("#log-in-greeting").addClass("hide");

    } else {
      console.log("Not logged on")
      // when user is logged in, display logout button and hide inputs
      $("#btnLogOut").addClass('hide');
      $("#inputEmail").removeClass("hide");
      $("#inputPassword").removeClass("hide");
      $("#log-in-greeting").removeClass("hide");
    }
  });

  $("#btnLogOut").on("click", function (e) {

        e.preventDefault();
        firebase.auth().signOut().then(function () {
          // Sign-out successful.
        }).catch(function (error) {
          // An error happened.
          console.log(error)
        });
      });
        // -----------------------------------
        //Weather app api key
        var APIKey = "166a433c57516f51dfab1f7edaed8413";

        // On click function that retrieves user location input and determines which spotify query to initiate
        $("#submit").on("click", function (e) {

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

            .then(function (response) {
              console.log(queryURL);
              console.log(response);
              //displays basic city info on main page
              $("#city-input").text("City: " + city);
              $("#temp-input").text("Temp: " + response.main.temp + " degrees");

              // Generate spotify conten and transfer content to HTML        
              if (response.main.temp >= 70) {


              } else {
                var key = "SOJfd3xKk_kDAye_unZQwweF";
                var queryURL = "http://quotes.rest/qod.json?category=inspire";

                $.ajax({
                  url: queryURL,
                  method: "GET",
                  beforeSend: function (request) {
                    request.setRequestHeader("X-TheySaidSo-Api-Secret", key);
                  }
                }).then(function (response) {
                  console.log(response);
                  $(".fader-start").removeClass("fader-none2");
                  $("#track-table").removeClass("fader-none2");
                  $(".fader-start").addClass("fader-go");
                  var quote = $("#generate").html("&#34" + response.contents.quotes[0].quote + "&#34");
                  $("#author").text(response.contents.quotes[0].author);
                  $("#category").text(response.contents.quotes[0].category);

                  database.ref().child("quotes").push({
                    quote: quote
                  });
                })
              }
            });
        });





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
