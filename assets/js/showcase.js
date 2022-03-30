// queries to be used later
var showcaseEl = document.querySelector(".showcase");
var showcaseElList = document.querySelectorAll(".showcase .showcase-el");

// establishing global variables to be used later
var showcaseWidth;
var currentBody = "";

// runs at start and everytime the user hovers off an element
var updateWidth = function () {

    // gets the total width of the showcase element
    showcaseWidth = showcaseEl.clientWidth;

    // counter variable for calculating row names
    var count = 0;

    // runs through each of the elements in the showcase
    showcaseElList.forEach(function (element) {

        // get the body element of the current project
        var bodyEl = document.querySelector("#" + element.id + " .showcase-body");

        // looks to see if the current element is visible if so animate until its not
        if (bodyEl.style.visibility == 'visible') {
            animateFade(bodyEl);
        }

        // does the math of setting row values and default widths for each project
        if (showcaseWidth < 900) {
            element.style.width = "100%";
        } else if (showcaseWidth < 1250) {
            element.style.width = Math.floor(showcaseWidth / 2 - 21) + "px";
            element.setAttribute("data-row", Math.floor(count / 2));
        } else {
            element.style.width = Math.floor(showcaseWidth / 3 - 21) + "px";
            element.setAttribute("data-row", Math.floor(count / 3));
        };

        // iterates the counter for row calcualation
        count++;
    });
}

// uses jQuery animation to fade bodyEl
var animateFade = function (bodyEl) {

    // if it's visible the site plays a jQuery animation to make the the body element disappear
    $(bodyEl).animate({
        'opacity': '0',
    }, {
        duration: 1500,

        // queue is set to false for all animations to prevent element from fading and appearing repeatedly
        queue: false,

        // on completion it sets style to just contain the pointer element because visiblity and opacity are off by defualt this works.
        complete: function () {
            if (currentBody != bodyEl) {
                bodyEl.setAttribute("style", "pointer-events:none;");
            }
        }
    });
}

// mouseenter and touchenter events initially run this
var handleMouseOver = function (event) {

    // get our variables ready
    var targetEl = event.target;
    var bodyEl = document.querySelector("#" + targetEl.id + " .showcase-body");
    var descriptionEl = document.querySelector("#" + targetEl.id + " .showcase-body p");

    // set the current body element as a global variable to help with tracking in 'complete' functions
    currentBody = bodyEl;

    // makes the bodyEl visible
    bodyEl.style.visibility = 'visible';

    // animates the body element into existance
    $(bodyEl).animate({
        'opacity': '1',
    }, {
        duration: 1500,
        queue: false,

        // on completition get the current style and then reassigns them with the none in pointer-events with all
        complete: function () {
            var currentStyle = bodyEl.getAttribute("style").replace('none', 'all');
            bodyEl.setAttribute("style", currentStyle);
        }
    });

    // does the calcualtions for the body width it should be equal to the projects width in the default positiion
    if (showcaseWidth < 900) {
        descriptionEl.style.width = "90%";
    } else if (showcaseWidth < 1250) {
        descriptionEl.style.width = Math.floor(showcaseWidth / 2 - 21) + "px";
    } else {
        descriptionEl.style.width = Math.floor(showcaseWidth / 3 - 21) + "px";
    };



    adjustShowcaseWidth(targetEl);
}

var adjustShowcaseWidth = function (targetEl) {

    if (targetEl.className == "showcase-el" && showcaseWidth >= 900) {
        var row = targetEl.getAttribute("data-row");
        var totalWidthUsed = 0;
        showcaseElList.forEach(function (element) {
            if (element.getAttribute("data-row") == row) {
                element.style.width = (element.firstElementChild.offsetWidth) + 20 + "px";
                totalWidthUsed += element.firstElementChild.offsetWidth + 40;
            }
        });
        var remainingWidth = (showcaseWidth - totalWidthUsed) + targetEl.firstElementChild.offsetWidth;
        targetEl.style.width = remainingWidth + "px";
    }
}

updateWidth();

showcaseElList.forEach(function (element) {
    var bodyEl = document.querySelector("#" + element.id + " .showcase-body");
    bodyEl.setAttribute("style", "pointer-events:none;");
});

window.onresize = updateWidth;
for (var i = 0; i < showcaseEl.childElementCount; i++) {
    showcaseElList[i].addEventListener("mouseenter", handleMouseOver);
    showcaseElList[i].addEventListener("touchenter", handleMouseOver);
    showcaseElList[i].addEventListener("mouseleave", updateWidth);
};