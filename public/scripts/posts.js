var $tagLine = $(".tag-line");

$tagLine.on("click",function(e){
      $(this).siblings('.content').toggle(0);
});
