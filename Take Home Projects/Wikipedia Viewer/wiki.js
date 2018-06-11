$("document").ready(function(){
/*hover over random box*/
   $(".random").hover(function(){
    $("#surprise").show();
  }, function(){
    $("#surprise").hide();
  });

});

function fetch(query) {
  return $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: { action: 'query', list: 'search', srsearch: query, format: 'json' },
    dataType: 'jsonp',
  });
}

function render(results) {
  var $out = $("out");
  var html = results.map(function(result) {
    return '<a class="result"' +
           '   href="https://en.wikipedia.org/wiki/'+result.title+'">' +
           '  <h3>'+result.title+'</h3>' +
           '  <div>'+result.snippet+'</div>' +
           '</a><hr>';
  }).join("\n\n");
  $out.html("");
  $(html).appendTo($out);
}

$("#searchform").on("submit", function(event) {
  event.preventDefault();
  var query = $("#searchquery").val();
  fetch(query)
    .done(function(data) {
      console.log(data);
      render(data.query.search);
    });
});
