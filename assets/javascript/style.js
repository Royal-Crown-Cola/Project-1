// sign in title render
var signTitle = "Please Enter Your Email";
var signCount = 0;

function openLogin () {
    setInterval(loginRender, 50);
}

function loginRender() {
    $("#log-in-greeting").append(signTitle[signCount]);
    signCount++;
    if (signCount === signTitle.length) {
        clearInterval(loginRender);
    }
}

openLogin();

// this is the scroll function when you click submit
$(document).on("click", "#btnSignUp", function(event){
    console.log("test");
    event.preventDefault();

    var user = $("#inputEmail").val().trim();

    if (user === "") {
        $("#log-in-greeting").text("Please Enter A Valid Email");
    }
    else {
    console.log(user);
    $("#email-input").text(user);
    $("#inputEmail").val("")
    var x = $(".login").height();
    $('html, body').animate({ scrollTop: x }, 500);
    openPage();
    setTimeout(fadeIn, 1000);
    }
});
// this is the scroll function that makes the nav bar become sticky when it reaches the top of the screen
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

$(document).on("click", "#quoteFind", function(event){
    console.log("test");
    event.preventDefault();
    var x = $(".body").height();
    $('html, body').animate({ scrollTop: x }, 500);
    
});



//Logo Populate Variables
var logo = "Inspiration That Follows You";
var logoCount = 0;

//Fades In Page Content
function fadeIn() {
    $(".fader-start").removeClass("fader-none");
    $(".fader-start").addClass("fader-go");
}

//sets interval for logoRender
function openPage() {
    setInterval(logoRender, 50);
}

//Populates application logo
function logoRender() {
    
    $("#logo").append(logo[logoCount]);
    logoCount++;
    if (logoCount === logo.length) {
        clearInterval(logoRender);
    }
}



$("#trivia-btn").on("click", function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });

    var queryURL =     "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
     console.log(response.results);
     console.log(response);
     console.log(response.results[0].question);
     answer = response.results[0].correct_answer.toLowerCase();
      $("#triv-ques").html(response.results[0].question);
});
});

$("#triv-submit").on("click", function(e){
    e.preventDefault();
    console.log(answer);

    var uA = $(".user-answer").val().trim();
    userA = uA.toLowerCase();
    console.log(userA);
    $(".user-answer").val("");

    if (userA === answer) {
        $("#stats").text("Correct!");

        $(".new-but").removeClass("btn-none");
    }
    else {
        $("#stats").text("Incorrect! Try Again!");

    }
    
})

$("#new-question").on("click", function(e) {
    e.preventDefault();
    var queryURL =     "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
     console.log(response.results);
     console.log(response);
     console.log(response.results[0].question);
     answer = response.results[0].correct_answer.toLowerCase();
      $("#triv-ques").html(response.results[0].question);
});
})
