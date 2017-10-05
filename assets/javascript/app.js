// Array of emotions to start
      var emotions = ["Akward", "Bored", "Scared", "Happy", "Like Dancing", "Hungry", "Terrible", "Sleepy"];


      function displayEmotionGifs() {

        var emotion = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=zmzElrIeWk0nQB8yTpab25TMDXGDR1M5&limit=10";



        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          
          var gifDiv = $("<div class='images'>");
      for (i=0; i<response.data.length; i++) {


          var showEmotions = response.data[i].images.fixed_height.url;
          var rating = response.data[i].rating;
          var still = response.data[i].images.fixed_height_still.url;
          var animate = response.data[i].images.fixed_height.url;
        

          var image = $("<img>");
          image.attr("src", showEmotions);
          image.attr("data-state" , still);
          image.attr("data-still" , still);
          image.attr("data-animate" , animate);
          image.addClass("gif");
          
           //TESTING
           // console.log(image);

          var pOne = $("<p>");
          pOne.append(rating);

       

         gifDiv.append(image);
         gifDiv.append(pOne);
          $("#images").prepend(gifDiv);

      }


     $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
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

      // Function for displaying gifs
      function showButtons() {

    
        $("#buttons").empty();

        // Looping through the array of emotions
        for (var i = 0; i < emotions.length; i++) {

       
          var a = $("<button>");

          // Adding a class to button
          a.addClass("buttonFeeling");

          // Adding a data-attribute
          a.attr("data-name", emotions[i]);

          // Initial button text
          a.text(emotions[i]);

          // Add the button to the buttons-view div
          $("#buttons").append(a);
        }
      }

      // Button to handle click event
      $("#add-emotion").on("click", function(event) {
        event.preventDefault();

        // Grab input from the textbox
        var feeling = $("#input").val().trim();

        // Adding emotion from the textbox to array
        emotions.push(feeling);

        
        showButtons();
      });


      
      $(document).on("click", ".buttonFeeling", displayEmotionGifs);

      showButtons();