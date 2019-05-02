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

//Calls logo render function and sets timeout for all page fadeins
openPage();
setTimeout(fadeIn, 1000);

// var title = "Your Places";
// var titleCount = 0;

// //Fades In Page Content
// function weatherFadeIn() {
//     $(".fader-start").removeClass("fader-none");
//     $(".fader-start").addClass("fader-go");
// }

// //sets interval for weatherRender
// function weatherPage() {
//     setInterval(weatherRender, 50);
// }

// //Populates application logo
// function weatherRender() {
    
//     $(".weather-head").append(title[titleCount]);
//     titleCount++;
//     if (titleCount === 11) {
//         clearInterval(weatherRender);
//     }
// }

// //Calls logo render function and sets timeout for all page fadeins
// weatherPage();
// setTimeout(weatherFadeIn, 1000);