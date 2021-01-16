$( document ).ready(function() {

        // ZOMATO SECTION

    // =====================================================

    // <div class="col-lg-3">
    //    <div class="card">
    //        <img id="img1" class="card-img-top"  alt="food-pic">
    //        <div class="card-body">
    //              <h5 id="title1" class="card-title"></h5>
    //              <div id="details1">
                                
    //              </div>
    //        </div>
    //     </div>
    // </div>

    var city = "New York City";
    var category = "1";           // Delivery

    function getLocationID() {
        
        $.ajax({
          url: "https://developers.zomato.com/api/v2.1/locations?query=" + city,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2e3bd49f413e2bd7583f307f409118a5');
          },
        }).then(function(response) {
          console.log(response);
          coordSearch(response.location_suggestions[0].latitude, response.location_suggestions[0].longitude, response.location_suggestions[0].entity_id);
        });
      }

      function coordSearch(lat, lon, id) {
        $.ajax({
          url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + id + "&lat=" + lat + "&lon=" + lon + "&category=" + category,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2e3bd49f413e2bd7583f307f409118a5');
          },
        }).then(function(response) {

            var restaurant = response.restaurants
            for (i = 0; i < 4; i++) {
                var foodResultsDiv = $(".food-results");
                var colDiv = $("<div>").attr("class", "col-lg-3");
                var workingsDiv = $("<div>").attr("class", "card").attr("value", i);
                var workingImg = $("<img>").attr("class", "card-img-top").attr("id", "img" + i).attr("alt", "food-pic");
                var cardDiv = $("<div>").attr("class", "card-body");
                var titleTag = $("<h5>").attr("class", "card-title").attr("id", "title" + i);
                var detailsDiv = $("<div>").attr("id", "details" + i)

                cardDiv.append(titleTag);
                cardDiv.append(detailsDiv);
                workingsDiv.append(workingImg)
                workingsDiv.append(cardDiv)
                colDiv.append(workingsDiv);
                foodResultsDiv.append(colDiv);
            }

            console.log(restaurant)
            console.log(restaurant[0].restaurant.thumb)
            $("#img1").attr('src', restaurant[0].restaurant.thumb)
            $("#title1").text(restaurant[0].restaurant.name)
            var cuisine = restaurant[0].restaurant.cuisines
            var phoneNum = restaurant[0].restaurant.phone_numbers
            var priceRange = restaurant[0].restaurant.price_range
            var highlights = restaurant[0].restaurant.highlights
            var address = restaurant[0].restaurant.location.address
            var userScore = restaurant[0].restaurant.user_rating.aggregate_rating
            var userRating = restaurant[0].restaurant.user_rating.rating_text
            var hours = restaurant[0].restaurant.timings

            var price = ""
            var highlight = "Highlights: "
            for (i = 0; i < priceRange; i++) {
                price += "$"
            }
            for (i = 0; i < highlights.length; i++) {
                highlight += highlights[i] + ", "
            }


            $("#details1").append($("<p>").text("Address: " + address))
            $("#details1").append($("<p>").text("Phone: " + phoneNum))
            $("#details1").append($("<p>").text("User Ratings: " + userScore + ", " + userRating))
            $("#details1").append($("<p>").text("Cuisine: " + cuisine))
            $("#details1").append($("<p>").text("Price range: " + price))
            $("#details1").append($("<p>").text("Hours: " + hours))

            $("#details1").append($("<p>").text(highlight))
               
            
        });
      }
      
    getLocationID();


    // =====================================================

    // Jokes commands:
    // Format: ?format=format i.e json, xml, yaml, txt
    // Blacklist Flags: ?blacklistFlags=flag1[,flag2,...] i.e. nsfw, religious, political, racist, sexist, explicit
    // Joke type: ?type=type i.e. single, twopart
    // Joke amount: ?amount=number
  
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
            

            // single joke objects do not have the jokes object inside it so if response.jokes is undefined this will run 
            if (jokes == null){
                // if a joke has two parts 
                if (response.type == "twopart") {
                    var jokeset = response.setup;
                    var jokedelivery = response.delivery;
                    
                    var myjoke = $("<li>").text(jokeset + " " + jokedelivery)

                    $("#joke-entries").append(myjoke)
                }
                // if a joke has only one part
                else if (response.type == "single"){
                    var jokeset = response.joke;
                   
                    var myjoke = $("<li>").text(jokeset)               

                    $("#joke-entries").append(myjoke);          
                }
            }
            else { 
                for (i = 0; i < jokes.length; i++) {
                    // if a joke has two parts 
                    if (jokes[i].type == "twopart") {
                        var jokeset = jokes[i].setup;
                        var jokedelivery = jokes[i].delivery;
                        
                        var myjoke = $("<li>").text(jokeset + " " + jokedelivery)

                        $("#joke-entries").append(myjoke)
                    }
                    // if a joke has only one part
                    else if (jokes[i].type == "single"){
                        var jokeset = jokes[i].joke;
                       
                        var myjoke = $("<li>").text(jokeset)               

                        $("#joke-entries").append(myjoke);          
                    }
                }
            }
        });
    };

    displayJokes();
});