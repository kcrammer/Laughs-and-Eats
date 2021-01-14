$( document ).ready(function() {

    // Jokes commands:
    // Format: ?format=format i.e json, xml, yaml, txt
    // Blacklist Flags: ?blacklistFlags=flag1[,flag2,...] i.e. nsfw, religious, political, racist, sexist, explicit
    // Joke type: ?type=type i.e. single, twopart
    // Joke amount: ?amount=number
  
    function getQuery () {

        var category = [];
        var blacklist = [];
        var jokeAmount = 0;
        var type = [];
        var searchString = "";

        var url = "https://v2.jokeapi.dev/joke/";

        // Checks what categories are checked off by the user and adds them to each indivdual array

        // Categories
        for (i = 0; i < $("#category-choices").children().length; i+=2) {
            if ($("#category-choices").children()[i].checked) {
                category.push($("#category-choices").children()[i].getAttribute("id"));
            }
        }
        
        // Blacklist
        for (i = 0; i < $("#blacklist").children().length; i+=2) {
            if ($("#blacklist").children()[i].checked) {
                blacklist.push($("#blacklist").children()[i].getAttribute("id"));
            }
        }

        // Joke Type
        for (i = 0; i < $("#joke-type").children().length; i+=2) {
            if ($("#joke-type").children()[i].checked) {
                type.push($("#joke-type").children()[i].getAttribute("id"));
            }
        }

        // Number of jokes
        jokeAmount = parseInt( $("#number-jokes option:selected").text() );
        // Keyword search
        searchString = $("#keyword-search").text();

        console.log(category);
        console.log(blacklist);
        console.log(type);
        console.log(jokeAmount);
        console.log(searchString);

        

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

        console.log(url);
        return url

    }

    // $("#search").click(function(event) {
    function test() {
        //event.preventDefault();

        var query = getQuery();

        $.ajax({
            url: query,
            method: "GET"
        }).then(function(response){
            console.log(response)
            // if joke is single line response.joke retrieves the joke
            // if joke is two part response.setup and response.delivery retrieves the two parts of the joke
            
             
            });
    };

    test();

});