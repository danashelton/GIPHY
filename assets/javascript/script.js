$(document).ready(function(){
    // Initial array of gifs
    var gifSearch = ["fail", "bye", "excited"];

    // displayGif function re-renders the HTML to display the appropriate content
    function displayGif($el) {

      var gif = $el.attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=MjEBhKwTXmxUoIN2jc71wXYkSxcrA1BC&limit=10";

      // Creates AJAX call for the specific button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
        $("#gifview").empty();

        var results = response.data;

        // Retrieves the Rating Data
        console.log(response);

        // Loops the gif for limit 10
        for(var i = 0; i < results.length; i++) {

          // Creates a div to hold the gif
          var gifDiv = $("<div class='col-sm-6 col-lg-4'>");

          // Make the class for style.css
          gifDiv.addClass("gifpictures");

          // Creates an element to have the rating displayed
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          p.addClass('card-text small class=text-muted');

          // The Images can still or animate to call the class "gifImage" for click.
          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_width_still.url);
          gifImage.attr("data-still", results[i].images.fixed_width_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_width.url);
          gifImage.attr("data-state", "still");
          gifImage.addClass('gifImage');

          // Displays the rating
          gifDiv.prepend(p);

          // Displays the gif Image
          gifDiv.prepend(gifImage);
          $("#gifview").prepend(gifDiv);
        }

        //if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        // If state does not equal 'still', then update the src attribute of this
        // image to it's data-animate value and update the data-state attribute to 'still'
        $(".gifImage").on("click", function() {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });        
    }

    // Function for displaying gif data
    function renderButtons() {

      // Deletes the results prior to adding new results
      // (this is necessary otherwise you will have repeat buttons)
      
      $("#gifbuttons").empty();

      for(var i = 0; i < gifSearch.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        var gifAdd = $("<button>");

        // Adds a class of "btn btn-outline-secondary btn-sm gif" to our button
        gifAdd.addClass("btn btn-outline-secondary btn-sm gif");

        // Adds a data-name attribute
        gifAdd.attr("data-name", gifSearch[i]);

        // Provided the initial button text
        gifAdd.text(gifSearch[i]);

        // Added the button to the buttons-view div
        $("#gifbuttons").append(gifAdd);
      }
    }

    // This function handles events where the add gif button is clicked
    $("#gif-form").on("submit", function(event){
      event.preventDefault();

      // This line of code will grab the input from the textbox
      var gif = $("#search-input").val().trim();

        if (!gif) {
          return false
        }

        if (gifSearch.indexOf(gif) === -1) {
            gifSearch.push(gif);
        }

      // Calling renderButtons which handles the processing of our gif array
      renderButtons();
      displayGif($('button[data-name="' + gif + '"]'));
      $("#search-input").val('');
      console.log(event)
    });

    // Adding click event listeners to all elements with a class of "gif"
    $(document).on("click", ".gif", function () {
      displayGif($(this))
    });


    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});

