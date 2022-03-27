var showcaseEl = document.querySelector(".showcase");
var showcaseElList = document.querySelectorAll(".showcase a");
var showcaseWidth;

var updateWidth = function () {
    showcaseWidth = showcaseEl.clientWidth;

    var count = 0;

    showcaseElList.forEach(function (element) {
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

var adjustShowcaseWidth = function (event) {
    var targetEl = event.target;
    if (targetEl.tagName == "A") {
        var row = targetEl.getAttribute("data-row");
        var totalWidthUsed = 0;
        showcaseElList.forEach(function (element) {
            element.style.width = (element.firstElementChild.offsetWidth) + 20 + "px";
            if (element.getAttribute("data-row") == row) {
                totalWidthUsed += element.firstElementChild.offsetWidth + 40;
            }
        });
        var remainingWidth = (showcaseWidth - totalWidthUsed) + targetEl.firstElementChild.offsetWidth;
        targetEl.style.width = remainingWidth + "px";
    }
}

updateWidth();

window.onresize = updateWidth;
showcaseEl.addEventListener("mouseover", adjustShowcaseWidth);
showcaseEl.addEventListener("mouseout", updateWidth);