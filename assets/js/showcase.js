var showcaseEl = document.querySelector(".showcase");
var showcaseElList = document.querySelectorAll(".showcase .showcase-el");
var showcaseWidth;

var updateWidth = function () {
    showcaseWidth = showcaseEl.clientWidth;

    var count = 0;

    showcaseElList.forEach(function (element) {
        var bodyEl = document.querySelector("#" + element.id + " .showcase-body");
        if(bodyEl.style.display == 'flex') {
            bodyEl.style.opacity = '0';
            setTimeout(function() {
                bodyEl.style.display = 'none'
            } , 1000);
        }

        if (showcaseWidth < 900) {
            element.style.width = "100%";
        } else if (showcaseWidth < 1250) {
            element.style.width = Math.floor(showcaseWidth / 2 - 21) + "px";
            element.setAttribute("data-row", Math.floor(count / 2));
        } else {
            element.style.width = Math.floor(showcaseWidth / 3 - 21) + "px";
            element.setAttribute("data-row", Math.floor(count / 3));
        };
        count++;
    });
}

var handleMouseOver = function(event) {
    var targetEl = event.target;
    var bodyEl = document.querySelector("#" + targetEl.id + " .showcase-body");
    var descriptionEl = document.querySelector("#" + targetEl.id + " .showcase-body p");
    bodyEl.style.display = 'flex';
    bodyEl.style.opacity = '0';
    
    waitForElm("#" + targetEl.id + " .showcase-body").then((elm) => {
        console.log('Element is ready');
        elm.style.opacity = '1';
    });

    if (showcaseWidth < 900) {
        descriptionEl.style.width = "100%";
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

var waitForElm = function(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

updateWidth();

window.onresize = updateWidth;
for(var i = 0; i < showcaseEl.childElementCount; i++) {
    showcaseElList[i].addEventListener("mouseenter", handleMouseOver);
    showcaseElList[i].addEventListener("touchenter", handleMouseOver);
    showcaseElList[i].addEventListener("mouseleave", updateWidth);
};