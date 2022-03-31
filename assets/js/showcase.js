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

    // calls 
    adjustShowcaseWidth(targetEl);
}

var adjustShowcaseWidth = function (targetEl) {

    // get the description element of the current target
    var descriptionEl = document.querySelector("#" + targetEl.id + " .showcase-body p");

    // does the calcualtions for the description width. It should be equal to the projects width in the default positiion
    if (showcaseWidth < 900) {
        descriptionEl.style.width = "90%";
    } else if (showcaseWidth < 1250) {
        descriptionEl.style.width = Math.floor(showcaseWidth / 2 - 21) + "px";
    } else {
        descriptionEl.style.width = Math.floor(showcaseWidth / 3 - 21) + "px";
    };

    // 
    if (targetEl.className == "showcase-el" && showcaseWidth >= 900) {

        // gets the row of the current element
        var row = targetEl.getAttribute("data-row");

        // sett the width the other elements take up
        var totalWidthUsed = 0;

        // iterates through all the showcase elements 
        showcaseElList.forEach(function (element) {

            // gets the items in the same row as the target, but not the target
            if (element.getAttribute("data-row") == row && targetEl.id != element.id) {

                // sets the width to just above the size of the <h3> element in the showcase
                element.style.width = (element.firstElementChild.offsetWidth) + 20 + "px";

                // saves that width used by one element
                totalWidthUsed += element.firstElementChild.offsetWidth + 51;
            }
        });

        // finds the remaining width after resizing the other elements
        var remainingWidth = showcaseWidth - totalWidthUsed;
        targetEl.style.width = remainingWidth + "px";
    }
}

// runs update width on load
onload.updateWidth();

// set the pointer events on load to make sure they are set
showcaseElList.forEach(function (element) {
    var bodyEl = document.querySelector("#" + element.id + " .showcase-body");
    bodyEl.setAttribute("style", "pointer-events:none;");
});

// listens for the window to resize and call the update width function again to adjust
onresize = updateWidth();

// sets all the event listeners had to use a listener on each element to avoid bugs with bubbling conflicts
// this can probably be solved with jQuery or significantly more complicated JS 
// this is a performance drag, but there are few enough elements that I think it is okay
for (var i = 0; i < showcaseEl.childElementCount; i++) {
    showcaseElList[i].addEventListener("mouseenter", handleMouseOver);
    showcaseElList[i].addEventListener("touchenter", handleMouseOver);
    showcaseElList[i].addEventListener("mouseleave", updateWidth);
};