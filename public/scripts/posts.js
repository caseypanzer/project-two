var $tagLine = $(".tag-line"),
    $addressBookDisplay = $(".address-book-display"),
    $rootNavButtonHolder = $(".root-nav-button-holder");

$tagLine.on("click",function(e){
    $(this).siblings('.content').toggle(0);
});

$rootNavButtonHolder.on("mouseenter",function(e){
    $(this).children(".unanchored").toggle(100);
});

$rootNavButtonHolder.on("mouseleave",function(e){
    $(this).children(".unanchored").toggle(200);
});

$addressBookDisplay.on("click",function(e){
  console.log(this);
    $(this).siblings('.address-book-detail').toggle(200);
});


// $("$.inital-comments").autoGrow()
