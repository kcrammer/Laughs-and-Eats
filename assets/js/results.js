$( document ).ready(function() {

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