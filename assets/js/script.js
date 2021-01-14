$( document ).ready(function() {

    // Jokes commands:
    // Format: ?format=format i.e json, xml, yaml, txt
    // Blacklist Flags: ?blacklistFlags=flag1[,flag2,...] i.e. nsfw, religious, political, racist, sexist, explicit
    // Joke type: ?type=type i.e. single, twopart
    // Joke amount: ?amount=number
  
    function getQuery () {

        // These are currently hardcoded for testing
        var category = ["programming", "misc", "dark"];
        var blacklist = ["nsfw", "religious", "political"]
        var jokeAmount = 5;
        var type = ["twopart"];
        var searchString = "food";

        var url = "https://v2.jokeapi.dev/joke/";

        // Sets category to Any if all categories are set, otherwise add each individual catergory
        if (category.length === 6) {
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

        // Adds blacklist flags to url if there are any
        if (blacklist.length !== 0) {
            url += "?blacklistFlags=";
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
        
        // returns https://v2.jokeapi.dev/joke/programming,misc,dark?blacklistFlags=nsfw,religious,political&type=twopart&contains=food&amount=5
        console.log(url);
        return url;

    }

    // $("#search").click(function(event) {
    function test() {
        //event.preventDefault();

        var query = getQuery();

//        $.ajax({
//            url: query,
//            method: "GET"
//        }).then(showJoke());
    };

    test();

});