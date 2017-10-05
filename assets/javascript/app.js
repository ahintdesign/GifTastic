// Array of emotions to start
      var emotions = ["Akward", "Bored", "Scared", "Happy", "Like Dancing", "Hungry", "Terrible", "Sleepy"];


      function displayEmotionGifs() {

        var emotion = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=zmzElrIeWk0nQB8yTpab25TMDXGDR1M5";



        
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          
          var gifDiv = $("<div class='images'>");
      for (i=0; i<response.data.length; i++) {


          var showEmotions = response.data[i].images.fixed_height.url;
          var still = response.data[i].images.fixed_height_still.url;
          var animate = response.data[i].images.fixed_height.url;

          var image = $("<img>");
          image.attr("src", showEmotions);
          //image.attr("data-state" , still);
          //image.attr("class" , gif);


          console.log(image);
          //var pOne = $("<p>").append(image)

          //TESTING

         gifDiv.append(image);

          
          $("#images").prepend(gifDiv);
      }
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