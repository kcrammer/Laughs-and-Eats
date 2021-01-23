$( document ).ready(function() {


    // ZOMATO SECTION

    // =====================================================

    // Gets the Lat/Lon location of the searched city
    function getLocationID() {
        var city = $("#city-search").val().trim();
        
        $.ajax({
          url: "https://developers.zomato.com/api/v2.1/locations?query=" + city,
          method: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '2e3bd49f413e2bd7583f307f409118a5');
          },
        }).then(function(response) {
          var zomQuery = getZomQuery(response.location_suggestions[0].latitude, response.location_suggestions[0].longitude, response.location_suggestions[0].entity_id);
          
          // Stores Zomato Query URL to storage
          localStorage.setItem("zomQuery", zomQuery);
          
          // Opens the results page
          window.location.href = "results.html";
        });
    }

    // Creates a url for the Zomato API based on the user's selection
    function getZomQuery(lat, lon, id) {

        var url = "https://developers.zomato.com/api/v2.1/search?entity_id=" + id + "&lat=" + lat + "&lon=" + lon;
        var category = "";
        var cuisine = [];
        var sort = "";
        var order = "";
        var sortArray = [0,0,"cost", "rating"]
        var orderArray = [0,0,"asc","desc"]

        category = $("#food-category-choices option:selected").val();

        if (category !== "0") {
            url += "&category=" + category;
        }

        for (i = 0; i < $("#cuisine-search").children().length; i++) {
            if ($("#cuisine-search").children()[i].checked) {
                cuisine.push($("#cuisine-search").children()[i].getAttribute("id"));
            }
        }

        if (cuisine.length !== 0) {
            url += "&cuisines=";

            for (i = 0; i < cuisine.length; i++) {
                if (i === cuisine.length - 1) {
                    url += cuisine[i];
                } else {
                    url += cuisine[i] + "%2C"; // Adds a comma to url if it's not the last in the array
                }
            }
        }

        sort = $("#sort-by option:selected").val();
        order = $("#sort-order option:selected").val();

        if (sort !== "1" && order !== "1") {
            url += "&sort=" + sortArray[sort] + "&order=" + orderArray[order];
        }

        return url;
    }


    // =====================================================

    // JOKES SECTION

    // =====================================================
  
    function getQuery() {

        var category = [];
        var blacklist = [];
        var jokeAmount = 0;
        var type = [];
        var searchString = "";

        var url = "https://v2.jokeapi.dev/joke/";

        // Checks what categories are checked off by the user and adds them to each indivdual array

        // Categories
        for (i = 0; i < $("#category-choices").children().length; i++) {
            if ($("#category-choices").children()[i].checked) {
                category.push($("#category-choices").children()[i].getAttribute("id"));
            }
        }
        
        // Blacklist
        for (i = 0; i < $("#blacklist").children().length; i++) {
            if ($("#blacklist").children()[i].checked) {
                blacklist.push($("#blacklist").children()[i].getAttribute("id"));
            }
        }

        // Joke Type
        for (i = 0; i < $("#joke-type").children().length; i++) {
            if ($("#joke-type").children()[i].checked) {
                type.push($("#joke-type").children()[i].getAttribute("id"));
            }
        }

        // Number of jokes
        jokeAmount = parseInt( $("#number-jokes option:selected").text() );
        // Keyword search
        searchString = $("#keyword-search").text();

        // Sets category to Any if all categories are set, otherwise add each individual catergory
        if (category.length === 0) {
            url += "Any";
        } else {
            for (i = 0; i < category.length; i++) {
                if (i === category.length - 1) {
                    url += category[i];
                } else {
                    url += category[i] + ","; // Adds a comma to url if it's not the last in the array
                }
            }
            
        }
        url += "?"

        // Adds blacklist flags to url if there are any
        if (blacklist.length !== 0) {
            url += "&blacklistFlags=";
            for (i = 0; i < blacklist.length; i++) {
                if (i === blacklist.length - 1) {
                    url += blacklist[i];
                } else {
                    url += blacklist[i] + ","; // Adds a comma to url if it's not the last in the array
                }
            }
        }

        // If only a single or twopart joke is set, adds the type to it
        if (type.length !== 2) {
            url += "&type=" + type[0];
        }

        // Adds a user-defined search string to url
        if (searchString !== "") {
            url += "&contains=" + searchString;
        }

        // Sets number of jokes to display
        url += "&amount=" + jokeAmount;

        // Saves created URL to storage
        localStorage.setItem("query", url);

        // Gets Zomato crietria
        getLocationID();
    }

    // =====================================================

    // save url into local storage and then redirects to results.html
    function saveCriteria() {
        getQuery();
    };
    
    $("#searchBtn").click(saveCriteria);
});