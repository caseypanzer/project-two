// Index of the currently 'active' section
var activeCache = null;

// Actual rendered height of a header element
var cloneHeight = function(){
//apprend to container of item holding headers. headers need to have sticky clone class?
    var $clone = $('<div class="sticky-clone"></div>').appendTo('body'),
        cloneHeight = $clone.outerHeight();
    $clone.remove();
    return cloneHeight;
}();

// Top offsets of each header
var offsets = [];

// Figure out which section is 'active'
var activeHeaderIndex = function(){
//need to figure out how to access the element which will have the sticky thing.
    var scrollTop = document.body.scrollTop;
    for ( var i = 0; i < offsets.length; i++ )
        if ( offsets[i] - cloneHeight > scrollTop )
            return Math.max( i - 1, 0 );
}

// Build the 'offsets' array
$('.sticky-header').each(function(i, obj){
    offsets.push( $(this).offset().top );
});

// Listen to scroll events
//change listeners to be on scroll of item?
$(window).on('scroll', function(){
    var active = activeHeaderIndex(),
        scroll = document.body.scrollTop,
        clone = $('.sticky-clone').length,
        $active = $('.sticky-header').eq(active),
        prevTitle = $('.sticky-header').eq(active - 1).text(),
        title = $active.text(),
        $fixed = $('.sticky-fixed');
    // Hide fixed header
    if ( offsets[active] > scroll ){
        if ( !clone ){
            $('.sticky-header').eq(0).hide();
            $('<li class="sticky-clone">' + prevTitle + '</li>').insertBefore($active);
        }
        $fixed.hide();
    // Show fixed header
    } else {
        if ( clone ){
            $('.sticky-header').eq(0).show();
            $('.sticky-clone').remove();
        }
        $fixed.show();
    }
    // If we're not changing headers, exit
    if ( active == activeCache ) return;
    // Update active index
    activeCache = active;
    // Remove old fixed header (if any)
    $('.sticky-fixed').remove();
    // Add a new fixed header
    $fixed = $('<div class="sticky-fixed">' + title + '</div>').appendTo('body');
}).trigger('scroll');
