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



