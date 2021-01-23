$( document ).ready(function() {

    // Loads favorited jokes and restaurants
    var favFood = JSON.parse(localStorage.getItem("favorites"));
    var favJokes = JSON.parse(localStorage.getItem("favorite-jokes"));

    if (favFood === null) {
        favFood = [];
    }

    if (favJokes === null) {
        favJokes = [];
    }

    // Checks if favorites are empty or not, will leave a message if they are empty
    if (favFood.length !== 0) {
        for (i = 0; i < favFood.length; i++) {
            getRest(favFood[i]);
        }
    }
    else {
        emptyMsg(1);
    }

    if (favJokes.length !== 0) {
        for (i = 0; i < favJokes.length; i++) {
            getJoke(favJokes[i]);
        }
    }
    else {
        emptyMsg(2);
    }

    // Will place message in restaurants box (1) or jokes box (2)
    function emptyMsg(x) {
        var emptyMsg = $("<h4>").text("No favorites are set").css("text-decoration", "underline");
        
        if (x === 1) {
            $("#foodResults").append(emptyMsg);
        } else {
            $("#jokeResults").append(emptyMsg);
        }
    }

    // Zomato API to get specific restaurant by ID
    function getRest(i)  {
        $.ajax({
          url: "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + i,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2b1443b11e2482648013479d4eba3312');
          },
        }).then(function(response) {
            displayFoodList(response);
        });
    }

    // Restaurant list, with the X button, Image, Title, and link all in one li row each
    function displayFoodList(x) {
        var newRow = $("<li>").attr("class", "row my-2");
        var newBodyRow = $("<div>").attr("class", "row");
        var newBody = $("<div>").attr("class", "col-xs-6 px-4");
        var titleRow = $("<div>").attr("class", "row");
        var descRow = $("<div>").attr("class", "row");
        var removeBtn = $("<img>").attr("class", "col-xs-3 px-2 my-3 foodBtn").attr("alt", "remove button").attr("src", "assets/images/xbutton_87873.png").attr("data-id", x.id);
        var mapLink = $("<a>");

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

        // Placeholder image if returned image is blank
        if (x.thumb == "") {
            workingImg.attr('src', "assets/images/restaurantImagePlaceHolder .png");
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

        // Adds final result to the list of restaurants
        $("#foodResults").append(newRow);
    }

    // Joke API to get specific joke by ID
    function getJoke(i)  {
        $.ajax({
          url: "https://v2.jokeapi.dev/joke/Any?idRange=" + i,
          method: "GET",
        }).then(function(response) {
            displayJokeList(response);
        });
    }

    function displayJokeList(response) {

        var removeBtn = $("<img>").attr("class", "col-xs-3 px-2 my-3 jokeBtn").attr("alt", "remove button").attr("src", "assets/images/xbutton_87873.png").attr("data-id", response.id);
        var newBodyRow = $("<li>").attr("class", "row");

        removeBtn.css("max-height", "50px");
        removeBtn.css("cursor", "pointer");

        newBodyRow.append(removeBtn);

        // sets var jokes to object assuming it has multiple jokes
        var jokes = response.jokes
                

        // single joke objects do not have the jokes object inside it so if response.jokes is undefined this will run 
        if (jokes == null){
            // if a joke has two parts 
            if (response.type == "twopart") {
                var jokeset = response.setup;
                var jokedelivery = response.delivery;
                
                var myjoke = $("<p>").text(jokeset + " " + jokedelivery).attr("class", "col-xs-7 list-group-item");

                myjoke.css("max-width", "70%");

                newBodyRow.append(myjoke);
            }
            // if a joke has only one part
            else if (response.type == "single"){
                var jokeset = response.joke;
                
                var myjoke = $("<p>").text(jokeset).attr("class", "col-xs-7 list-group-item");

                myjoke.css("max-width", "70%");

                newBodyRow.append(myjoke);          
            }
        } else { 
            for (i = 0; i < jokes.length; i++) {
                // if a joke has two parts 
                if (jokes[i].type == "twopart") {
                    var jokeset = jokes[i].setup;
                    var jokedelivery = jokes[i].delivery;
                    
                    var myjoke = $("<p>").text(jokeset + " " + jokedelivery).attr("class", "col-xs-7 list-group-item");

                    myjoke.css("max-width", "70%");

                    newBodyRow.append(myjoke);
                }
                // if a joke has only one part
                else if (jokes[i].type == "single"){
                    var jokeset = jokes[i].joke;
                    
                    var myjoke = $("<p>").text(jokeset).attr("class", "col-xs-7 list-group-item");               

                    myjoke.css("max-width", "70%");

                    newBodyRow.append(myjoke);          
                }
            }
        }
        
        $("#jokeResults").append(newBodyRow);
    }

    // X buttons to remove selected restaurant/joke from favorites list
    $(document).on("click", ".foodBtn", function() {
        var foodID = $(this).attr("data-id");
        favFood.splice(favFood.indexOf(foodID), 1);
        $(this).parent().remove();
        localStorage.setItem("favorites", JSON.stringify(favFood));
        
        if (favFood.length === 0) {
            emptyMsg(1);
        }
    });

    $(document).on("click", ".jokeBtn", function() {
        var jokeID = $(this).attr("data-id");
        favJokes.splice(favJokes.indexOf(jokeID), 1);
        $(this).parent().remove();
        localStorage.setItem("favorite-jokes", JSON.stringify(favJokes));
        
        if (favJokes.length === 0) {
            emptyMsg(2);
        }
    });

    $(document).on("click", "#headerTitle", function() {
        window.location.href = "index.html";
    });
});