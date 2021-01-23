var showMore = false;

//Function to expand food input form
$("#food-more").on("click", function(event){
    event.preventDefault();
    
    //check if form need to expand or minimize
    //Expand
    if(!showMore){
        $(".hidden-element-food").removeClass("hide");
        $("#food-more").text("Show Less");
        showMore = true;
    }
    //minimize
    else{
        $(".hidden-element-food").addClass("hide");
        $("#food-more").text("Show More");
        showMore = false;
    }
})

//Function to expand joke input form
$("#joke-more").on("click", function(event) {
    event.preventDefault();

    //check if need to expand or minimize
    //expand
    if(!showMore){
        $(".hidden-element").removeClass("hide");
        $("#joke-more").text("Show Less");
        showMore = true;
    }
    //minimize
    else{
        $(".hidden-element").addClass("hide");
        $("#joke-more").text("Show More");
        showMore = false;
    }
})