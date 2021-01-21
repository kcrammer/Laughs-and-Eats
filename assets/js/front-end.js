var showMore = false;

$("#food-more").on("click", function(event){
    event.preventDefault();
    console.log("click");
    if(!showMore){
        console.log("yay")
        $(".hidden-element-food").removeClass("hide");
        $("#food-more").text("Show Less");
        showMore = true;
    }
    else{
        $(".hidden-element-food").addClass("hide");
        $("#food-more").text("Show More");
        showMore = false;
    }
})

$("#joke-more").on("click", function(event) {
    event.preventDefault();
    console.log("click");
    if(!showMore){
        console.log("yay")
        $(".hidden-element").removeClass("hide");
        $("#joke-more").text("Show Less");
        showMore = true;
    }
    else{
        $(".hidden-element").addClass("hide");
        $("#joke-more").text("Show More");
        showMore = false;
    }
})