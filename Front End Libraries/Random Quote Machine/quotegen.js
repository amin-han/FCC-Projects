//quotes API
var forismaticAPI = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

$(document).ready(function() {
  $.getJSON(forismaticAPI, function(data) {
    //on load
            $('#text').append('<blockquote>' + data.quoteText + '</blockquote>');
            $('#author').append('<blockquote>' + data.quoteAuthor + '</blockquote>');   
        });
  //on click
    $('#new-quote').on("click", function() {
        $.getJSON(forismaticAPI, function(data) {
            $('#text').empty();
            $('#author').empty();
            $('#text').append('<blockquote>' + data.quoteText + '</blockquote>');
            $('#author').append('<blockquote>' + data.quoteAuthor + '</blockquote>');   
        });
    });
});

//tweet button
   function twitter() {
        var tweet_quote = $('#text').text();
        var tweet_author = $('#author').text();
        
        var tweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet_quote) + ' - ' + encodeURIComponent(tweet_author);
        
         window.open(tweet, '_blank');   
    }

 $('#tweet-quote').on('click', function(){
        twitter();
    });

//random color
var myColors = ['#ff3333', '#6600cc', '#E84751', '#0039e6', '#e62e00', '#323643'];
                
function colorShift(){
  var randomize = Math.floor(Math.random()*myColors.length);
  $('body').css("background-color", myColors[randomize]);
}
