$( document ).ready(function() {

        // ZOMATO SECTION

    // =====================================================
   
    var zomQuery = localStorage.getItem("zomQuery");
    var start = 0
    var finish = 4

    //saves favorite restaurant to local storage
    function saveButtonClick() {
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        
        if (favorites == null){
            favorites = []
        }

        if (favorites.includes(this.value) == false) {
            favorites.push(this.value);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // if you get no restaurants from zomato this will show an error message
    function noRestaurant() {
        var foodResultsDiv = $("#results");
        var workingsDiv = $("<div>").attr("class", "card");
        var cardDiv = $("<div>").attr("class", "card-body");
        var titleTag = $("<h5>").attr("class", "card-title");
        var detailsDiv = $("<p>");
        
        titleTag.text("Woops!");
        detailsDiv.text("Try reducing your search criteria to find some great restaurants!")
            
    
        cardDiv.append(titleTag);
        cardDiv.append(detailsDiv);
        workingsDiv.append(cardDiv);
        foodResultsDiv.append(workingsDiv);
        foodResultsDiv.attr("class", "text-center full-width")
    }

    // this function creates divs in html to place information from zomato and will iterate start and finish variable so if this function is called again it will iterate throught the next 4 restaurants in the array until there are no more restaurants
    function createLocations() {
        if (restaurant.length === 1){
            var foodResultsDiv = $("#results");
            var workingsDiv = $("<div>").attr("class", "card");
            var workingImg = $("<img>").attr("class", "card-img-top").attr("alt", "food-pic");
            var cardDiv = $("<div>").attr("class", "card-body");
            var titleTag = $("<h5>").attr("class", "card-title");
            var detailsDiv = $("<div>");
            var mapLink = $("<a>");
                
    
            mapLink.attr("href", "https://www.google.com/maps/search/?api=1&query=" + restaurant[0].restaurant.name + "+" + restaurant[0].restaurant.location.address);
            mapLink.attr("target", "_blank");
    
    
            // if no thumbnail put in this placeholder image
            if (restaurant[i].restaurant.thumb == "") {
                workingImg.attr('src', 'assets/images/restaurantImagePlaceHolder .png')
            }
            else {
                workingImg.attr('src', restaurant[0].restaurant.thumb)
            }
            workingImg.attr("class", "small-img")
                
            //setting variables to information in the DOM
            titleTag.text(restaurant[0].restaurant.name)
            var cuisine = restaurant[0].restaurant.cuisines
            var phoneNum = restaurant[0].restaurant.phone_numbers
            var priceRange = restaurant[0].restaurant.price_range
            var highlights = restaurant[0].restaurant.highlights
            var address = restaurant[0].restaurant.location.address
            var userScore = restaurant[0].restaurant.user_rating.aggregate_rating
            var userRating = restaurant[0].restaurant.user_rating.rating_text
            var hours = restaurant[0].restaurant.timings
            var saveID = restaurant[0].restaurant.id
               
    
            var saveBtn = $("<button>").attr("value", saveID).text("Save Favorites")
            saveBtn.attr("class", "btn btn-minor save-button ").attr("id", "try-again")
            saveBtn.click(saveButtonClick)
    
            //loop to create a number of dollar signs based on the price value in the DOM
            var price = ""
            var highlight = "Highlights: "
            for (j = 0; j < priceRange; j++) {
                price += "$"
            }
            //loop to create all the highlighs a particular restaurant has attributed to it
            for (k = 0; k < highlights.length; k++) {
                highlight += highlights[k] + ", "
            }
    
            // appending all information to the correct html divs
            detailsDiv.append(mapLink.text("Address: " + address))
            detailsDiv.append($("<p>").text("Phone: " + phoneNum))
            detailsDiv.append($("<p>").text("User Ratings: " + userScore + ", " + userRating))
            detailsDiv.append($("<p>").text("Cuisine: " + cuisine))
            detailsDiv.append($("<p>").text("Price range: " + price))
            detailsDiv.append($("<p>").text("Hours: " + hours))
            detailsDiv.append($("<p>").text(highlight))
            detailsDiv.append(saveBtn)
            
                
    
            cardDiv.append(titleTag);
            cardDiv.append(detailsDiv);
            workingsDiv.append(workingImg)
            workingsDiv.append(cardDiv);
            foodResultsDiv.append(workingsDiv);
            foodResultsDiv.attr("class", "text-center full-width")
        }
        else {
            for (i = start; i < finish; i++) {
            
                //create all the divs for zomato info
                var foodResultsDiv = $("#results");
                var colDiv = $("<div>").attr("class", "col-md-6 col-lg-3");
                var workingsDiv = $("<div>").attr("class", "card");
                var workingImg = $("<img>").attr("class", "card-img-top").attr("alt", "food-pic");
                var cardDiv = $("<div>").attr("class", "card-body");
                var titleTag = $("<h5>").attr("class", "card-title");
                var detailsDiv = $("<div>");
                var mapLink = $("<a>");
                
    
                mapLink.attr("href", "https://www.google.com/maps/search/?api=1&query=" + restaurant[i].restaurant.name + "+" + restaurant[i].restaurant.location.address);
                mapLink.attr("target", "_blank");
    
    
                // if no thumbnail put in this placeholder image
                if (restaurant[i].restaurant.thumb == "") {
                    workingImg.attr('src', "assets/images/restaurantImagePlaceHolder .png")
                }
                else {
                    workingImg.attr('src', restaurant[i].restaurant.thumb)
                }
                
                //setting variables to information in the DOM
                titleTag.text(restaurant[i].restaurant.name)
                var cuisine = restaurant[i].restaurant.cuisines
                var phoneNum = restaurant[i].restaurant.phone_numbers
                var priceRange = restaurant[i].restaurant.price_range
                var highlights = restaurant[i].restaurant.highlights
                var address = restaurant[i].restaurant.location.address
                var userScore = restaurant[i].restaurant.user_rating.aggregate_rating
                var userRating = restaurant[i].restaurant.user_rating.rating_text
                var hours = restaurant[i].restaurant.timings
                var saveID = restaurant[i].restaurant.id
               
    
                var saveBtn = $("<button>").attr("value", saveID).text("Save Favorites")
                saveBtn.attr("class", "btn btn-primary btn-minor save-button fav-btn").attr("id", "try-again")
                saveBtn.click(saveButtonClick)
    
                //loop to create a number of dollar signs based on the price value in the DOM
                var price = ""
                var highlight = "Highlights: "
                for (j = 0; j < priceRange; j++) {
                    price += "$"
                }
                //loop to create all the highlighs a particular restaurant has attributed to it
                for (k = 0; k < highlights.length; k++) {
                    highlight += highlights[k] + ", "
                }
    
                // appending all information to the correct html divs
                detailsDiv.append(mapLink.text("Address: " + address))
                detailsDiv.append($("<p>").text("Phone: " + phoneNum))
                detailsDiv.append($("<p>").text("User Ratings: " + userScore + ", " + userRating))
                detailsDiv.append($("<p>").text("Cuisine: " + cuisine))
                detailsDiv.append($("<p>").text("Price range: " + price))
                detailsDiv.append($("<p>").text("Hours: " + hours))
                detailsDiv.append($("<p>").text(highlight))
                detailsDiv.append(saveBtn)
                
    
                cardDiv.append(titleTag);
                cardDiv.append(detailsDiv);
                workingsDiv.append(workingImg)
                workingsDiv.append(cardDiv)
                colDiv.append(workingsDiv);
                foodResultsDiv.append(colDiv).attr("class", "row");
            }
    
            start = start + 4;
            finish = finish + 4;
        }        
    }

    // zomato API call function
    function coordSearch() {
        $.ajax({
          url: zomQuery,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2e3bd49f413e2bd7583f307f409118a5');
          },
        }).then(function(response) {

            restaurant = response.restaurants

            if (restaurant == ""){
                noRestaurant()
            }
            else {
                createLocations(restaurant)
            }
        });
    }
      
    coordSearch();


    // =====================================================

    // Jokes commands:
    // Format: ?format=format i.e json, xml, yaml, txt
    // Blacklist Flags: ?blacklistFlags=flag1[,flag2,...] i.e. nsfw, religious, political, racist, sexist, explicit
    // Joke type: ?type=type i.e. single, twopart
    // Joke amount: ?amount=number


    // saves favorite jokes to local storage
    function saveJokes() {
        var favorites = JSON.parse(localStorage.getItem("favorite-jokes"));
        
        if (favorites == null){
            favorites = []
        }

        if (favorites.includes(this.value) == false) {
            favorites.push(this.value);
        }

        localStorage.setItem("favorite-jokes", JSON.stringify(favorites));
    }

    function noJokes() {
        var myjoke = $("<li>").text("No jokes were found that match your provided filter(s)").attr("class", "list-group-item");
        $("#joke-entries").prepend(myjoke);
    }
  
    function displayJokes() {

        // retrieves joke url from local storage
        var query = localStorage.getItem("query");

        // ajax call for jokesAPI
        $.ajax({
            url: query,
            method: "GET"
        }).then(function(response){

            console.log(response)
            
            // sets var jokes to object assuming it has multiple jokes
            var jokes = response.jokes
            
            if (response.message == "No matching joke found"){
                noJokes()
            }

            // single joke objects do not have the jokes object inside it so if response.jokes is undefined this will run 
            if (jokes == null){
                // if a joke has two parts 
                if (response.type == "twopart") {
                    var jokeset = response.setup;
                    var jokedelivery = response.delivery;
                    var jokeID = response.id;
                    
                    var myjoke = $("<li>").text(jokeset + " " + jokedelivery).attr("class", "list-group-item");

                    var saveBtn = $("<button>").attr("value", jokeID).text("Save");
                    saveBtn.attr("class", "btn btn-primary btn-minor save-button joke-btn").attr("id", "try-again");
                    saveBtn.click(saveJokes);

                    myjoke.append(saveBtn);
                    $("#joke-entries").prepend(myjoke);
                }
                // if a joke has only one part
                else if (response.type == "single"){
                    var jokeset = response.joke;
                    var jokeID = response.id;
                   
                    var myjoke = $("<li>").text(jokeset).attr("class", "list-group-item")  

                    var saveBtn = $("<button>").attr("value", jokeID).text("Save");

                    saveBtn.attr("class", "btn btn-primary btn-minor save-button joke-btn").attr("id", "try-again");
                    saveBtn.click(saveJokes);

                    myjoke.prepend(saveBtn);
                    $("#joke-entries").append(myjoke);          
                }
            }
            else { 
                for (i = 0; i < jokes.length; i++) {
                    // if a joke has two parts 
                    if (jokes[i].type == "twopart") {
                        var jokeset = jokes[i].setup;
                        var jokedelivery = jokes[i].delivery;
                        var jokeID = jokes[i].id
                        
                        var myjoke = $("<li>").text(jokeset + " " + jokedelivery).attr("class", "list-group-item");

                        var saveBtn = $("<button>").attr("value", jokeID).text("Save");

                        saveBtn.attr("class", "btn btn-primary btn-minor save-button joke-btn").attr("id", "try-again");
                        saveBtn.click(saveJokes);

                        myjoke.prepend(saveBtn);
                        $("#joke-entries").append(myjoke)
                    }
                    // if a joke has only one part
                    else if (jokes[i].type == "single"){
                        var jokeset = jokes[i].joke;
                        var jokeID = jokes[i].id
                       
                        var myjoke = $("<li>").text(jokeset).attr("class", "list-group-item");

                        var saveBtn = $("<button>").attr("value", jokeID).text("Save");
                      
                        saveBtn.attr("class", "btn btn-primary btn-minor save-button joke-btn").attr("id", "try-again");
                        saveBtn.click(saveJokes);

                        myjoke.prepend(saveBtn);
                        $("#joke-entries").append(myjoke);          
                    }
                }
            }
        });
    };

    displayJokes();

    $("#more-results").click(createLocations);

    $(document).on("click", "#headerTitle", function() {
        window.location.href = "index.html";
    });
});