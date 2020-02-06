var button = $("#button");
var textArea = $("#burgerName");
var beforeDisplay = $("#beforeDiv");
var beforeBtn = $("#buttonsDiv");
var afterDisplay = $("#afterDiv");
// when the submit button is clicked
if(localStorage.getItem("Burgers")){
    var OfflineBurgers = JSON.parse(localStorage.getItem("Burgers"));
    if (navigator.onLine) {
        for(i = 0; i < OfflineBurgers.length; i++){
            aPostCall(OfflineBurgers[i]);
        }
        localStorage.clear();
    }
}
else{
    var OfflineBurgers = [];
}

button.on("click", function () {
    var burgerName = textArea.val();
    textArea.val("");
    if (navigator.onLine) {
        aPostCall(burgerName);
    }
    else{
        OfflineBurgers.push(burgerName);
        localStorage.setItem("Burgers" ,JSON.stringify(OfflineBurgers));
        offlineList();
    }
    
});
// when the devoused button is click
beforeBtn.on("click", ".buttons", function () {
    var burgerId = $(this).attr("burgerid");

    updatingDevoure(burgerId);
});
// a post call that will add a new burger name to the database using api
function aPostCall(burgerName) {
    var burger = {
        name: burgerName
    }
    $.ajax("/api/burger", {
        type: "POST",
        data: burger
    }).then(function (res) {

        aGetCall();
    });
}
// api call to get all information about burgers
function aGetCall() {
    $.ajax("/api/burger", {
        type: "GET"
    }).then(function (res) {
        displayBurgers(res);
    })
}
// this will use the information get from the api to display it to user
function displayBurgers(burgers) {
    beforeBtn.html("");
    beforeDisplay.html("");
    afterDisplay.html("");
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
// this will change the devoured to true in database.
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

function offlineList(){
    var offlineListBox = $("#offlineList");
    offlineListBox.html("");
    for(i=0; i < OfflineBurgers.length; i++){
        var list = $("<li>");
        list.html(OfflineBurgers[i]);
        offlineListBox.append(list);
    }

}
// run aGetCall when the page is done loading
$(document).ready(function () {
    if (navigator.onLine) {
        aGetCall();
    }
});