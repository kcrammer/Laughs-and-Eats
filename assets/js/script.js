$( document ).ready(function() {

    function getQuery () {
        var category = ["programming", "misc", "dark"];
        var url = "https://v2.jokeapi.dev/joke/";


        if (category.length === 6) {
            url += "Any";
        } else {
            for (i = 0; i < category.length; i++) {
                if (i === category.length - 1) {
                    url += category[i];
                } else {
                    url += category[i] + ",";
                }
            }
        }
        
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