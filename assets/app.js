var gifs = ['Dave Chappelle', 'Rick James', 'Donald Trump', 'Hillary Clinton', 'Lil Wayne', 'Pauly D', 'The Rock', 'Michael Jackson', 'Al Pacino' ]

//Creating giphy buttons for each item in the giphy array
function renderButtons() {
//Delete previous render buttons so there are not 2 of the same buttons
$('#buttons-view').empty();
 for (var i = 0; i < gifs.length; i++){
   var gifButton = $('<button>');
          gifButton.addClass('giphy');
          gifButton.attr('data-name', gifs[i]);
          gifButton.text(gifs[i]);
  $('#buttons-view').append(gifButton);
 }
}

//Adding new buttons on click with submit
$('#add-giphy').on('click', function(event){
  event.preventDefault();
  //grabing input from textbox
  var giphy = $('#giphy-input').val().trim();
  gifs.push(giphy);
  renderButtons();
  //clears search after it has been submitted.
  $('#giphy-input').val("");
})

//Evoking renderButtons function
renderButtons();





// Generating images when buttons are clicked
$(document).on('click', '.giphy', function() {
$('#giphy-view').empty();
var giphy = $(this).attr("data-name");
  // Constructing a queryURL using the giphy name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    giphy + "&api_key=dc6zaTOxFJmzC&limit=12";
//Performing an AJAX request to Giphy API
console.log('clicked');
$.ajax({
    url: queryURL,
    method: "GET"
  })

//When done return an image and rating
.done(function(response){
  console.log(queryURL);
  console.log(response);
  // storing the data from the AJAX request in the results variable
  var results = response.data;
  // Looping through each result item
  for (var i = 0; i < results.length; i++) {
      var giphyDiv = $('<div>');
          giphyDiv.addClass('col-md-3 giphyDiv')
      var p = $('<p>').text('Rating: ' + results[i].rating);
      var giphyImage = $('<img>');
          giphyImage.attr({'src': results[i].images.original_still.url, 'data-still': results[i].images.original_still.url, 'data-animate': results[i].images.original.url, 'data-state': 'still'});
          giphyImage.addClass('giphyImage');

      giphyDiv.append(p);
      giphyDiv.append(giphyImage);
      $('#giphy-view').append(giphyDiv);



  }

});

});



$('body').on('click', '.giphyImage', function() {
    var state = $(this).attr('data-state');
    console.log(this);
    if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }

});
