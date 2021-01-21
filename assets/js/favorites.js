$( document ).ready(function() {

    var favJokes = JSON.parse(localStorage.getItem("favJokes"));
    var favFood = JSON.parse(localStorage.getItem("favFood"));

    // Hardcoded for testing
    favFood = ["16769546", "16771079"];

    for (i = 0; i < favFood.length; i++) {
        getRest(favFood[i]);
    }

    function getRest(i)  {
        $.ajax({
          url: "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + i,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2b1443b11e2482648013479d4eba3312');
          },
        }).then(function(response) {
            console.log(response);
            displayFoodList(response);
        });
    }

    function displayFoodList(x) {
        var newRow = $("<li>").attr("class", "row");
        var newBodyRow = $("<div>").attr("class", "row");
        var newBody = $("<div>").attr("class", "col-xs-6 px-4");
        var titleRow = $("<div>").attr("class", "row");
        var descRow = $("<div>").attr("class", "row");
        var removeBtn = $("<img>").attr("class", "col-xs-3 px-2 my-3").attr("alt", "remove button").attr("src", "https://cdn.icon-icons.com/icons2/1350/PNG/64/xbutton_87873.png").attr("data-id", x.id);
        var mapLink = $("<a>");
        var newHr = $("<hr>");

        mapLink.attr("href", "https://www.google.com/maps/search/?api=1&query=" + x.name + "+" + x.location.address);
        mapLink.attr("target", "_blank");

        mapLink.text("Directions");
        descRow.append(mapLink);

        var newTitle = $("<h5>");
        var workingImg = $("<img>").attr("class", "img-thumbnail col-xs-2 px-2").attr("alt", "food-pic");
        workingImg.css("max-width", "100px");
        workingImg.css("max-height", "100px");
        removeBtn.css("max-height", "50px");
        removeBtn.css("cursor", "pointer");

        if (x.thumb == "") {
            workingImg.attr('src', "http://clipart-library.com/images/BigrpRd6T.png");
        }
        else {
            workingImg.attr('src', x.thumb);
        }

        newTitle.text(x.name);
        titleRow.append(newTitle);
        newBody.append(titleRow);
        newBody.append(descRow);

        newBodyRow.append(removeBtn);
        newBodyRow.append(workingImg);
        newBodyRow.append(newBody);

        newRow.append(newBodyRow);

        $("#foodResults").append(newRow);
        $("#foodResults").append(newHr);
    }

});