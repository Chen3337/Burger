var button = $("#button");
var textArea = $("#burgerName");
var beforeDisplay = $("#beforeDiv");
var beforeBtn = $("#buttonsDiv");
var afterDisplay = $("#afterDiv");
button.on("click", function () {
    var burgerName = textArea.val();
    textArea.val("");
    aPostCall(burgerName);
});

beforeBtn.on("click", ".buttons", function () {
    var burgerId = $(this).attr("burgerid");

    updatingDevoure(burgerId);
});

function aPostCall(burgerName) {
    var burger = {
        name: burgerName
    }
    $.ajax("/api/burger", {
        type: "POST",
        data: burger
    }).then(function (res) {
        beforeBtn.html("");
        beforeDisplay.html("");
        afterDisplay.html("");
        aGetCall();
    });
}
function aGetCall() {
    $.ajax("/api/burger", {
        type: "GET"
    }).then(function (res) {
        displayBurgers(res);
    })
}
function displayBurgers(burgers) {
    for (i = 0; i < burgers.length; i++) {
        var newDiv = $("<div>");
        newDiv.html(burgers[i].id + ". " + burgers[i].burger_name);
        newDiv.addClass("burgertags");
        if (burgers[i].devoured) {

            afterDisplay.append(newDiv);
        }
        else {
            beforeDisplay.append(newDiv);
            var newBtn = $("<button>");
            newBtn.text("Devoure!!");
            newBtn.attr("burgerid", burgers[i].id);
            newBtn.addClass("btn btn-danger buttons");
            beforeBtn.append(newBtn);
        }
    }
}
function updatingDevoure(id) {
    $.ajax({
        url: "/api/burger/" + id,
        type: "PUT"
    }).then(function (res) {
        beforeBtn.html("");
        beforeDisplay.html("");
        afterDisplay.html("");
        aGetCall();
    });
}
$(document).ready(function () {
    aGetCall();
});