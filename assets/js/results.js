$( document ).ready(function() {

    // Jokes commands:
    // Format: ?format=format i.e json, xml, yaml, txt
    // Blacklist Flags: ?blacklistFlags=flag1[,flag2,...] i.e. nsfw, religious, political, racist, sexist, explicit
    // Joke type: ?type=type i.e. single, twopart
    // Joke amount: ?amount=number
  
    function getQuery () {

        // These are currently hardcoded for testing
        var category = [];
        var blacklist = ["nsfw"]
        var jokeAmount = 1;
        var type = ["twopart"];
        var searchString = "";

        var url = "https://v2.jokeapi.dev/joke/";

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
        
        // returns https://v2.jokeapi.dev/joke/programming,misc,dark?blacklistFlags=nsfw,religious,political&type=twopart&contains=food&amount=5
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

            
            var jokes = response.jokes

            if (jokes == null){
                var jokeset = response.setup;
                var jokedelivery = response.delivery;

                var myjoke = $("<li>").text(jokeset + ". " + jokedelivery);

                $("#joke-entries").append(myjoke);
            }
            else {for (i = 0; i < jokes.length; i++) {
                if (jokes[i].type == "twopart") {
                    var jokeset = jokes[i].setup;
                    var jokedelivery = jokes[i].delivery;
                    // var setupDiv = $("<div>");
                    // var deliveryDiv = $("<div>");

                    // setupDiv.text(jokeset + ". " + jokedelivery);
                    // deliveryDiv.text(jokedelivery);
                    var myjoke = $("<li>").text(jokeset + " " + jokedelivery)

                    // $("#my-joke").append(setupDiv);
                    // $("#my-joke").append(deliveryDiv);
                    $("#joke-entries").append(myjoke)
                }
                else if (jokes[i].type == "single"){
                    var jokeset = jokes[i].joke;
                    
                    var jokeDiv = $("<div>");                    

                    jokeDiv.text(jokeset);                   

                    $("#my-joke").append(jokeDiv);  
                    $("#my-joke").append($("<div>''</div>"));          
                }
            }
            
             
            }});
    };

    test();

});