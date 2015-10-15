var $tagLine = $(".tag-line");

$tagLine.on("click",function(e){
      $(this).siblings('.content').toggle(0);
});

var $anchored = $(".root-nav-button-holder");

$anchored.on("mouseenter",function(e){
    $(this).children(".unanchored").toggle(100);
});

$anchored.on("mouseleave",function(e){
    $(this).children(".unanchored").toggle(200);
});
