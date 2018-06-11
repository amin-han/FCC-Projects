//quotes API
var forismaticAPI = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';
$(document).ready(function() {
  
    $('#quotearea').on("click", function() {
        $.getJSON(forismaticAPI, function(data) {
            $('#quotearea').empty();
            $('#quotearea').append('<blockquote>' + data.quoteText + '</blockquote>' + '<p id="author"> —  ' + data.quoteAuthor + '</p>');
            $('#quotearea').show();
        });
    });
});

//tweet button
   function twitter() {
        var tweet_quote = $('#quotearea').text();
        var tweet_author = $('#author').text();
        
        var tweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet_quote)
        
        window.open(tweet, '_blank');    
    }

 $('.twitter-share-button').on('click', function(){
        twitter();
    });
