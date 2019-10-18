// when appropriate button is clicked, class of button will change for devoured, updates html when end of function is reached
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newEat = $(this).data("neweat");
  
      var newEatState = {
        devoured: newEat
      };
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatState
      }).then(
        function() {
          console.log("changed devoured to", newEat);
          location.reload();
        }
      );
    });
 // allows user to create new burger, adds to database and reloads html when end of function is reached 
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#burgs").val().trim(),
      };
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          location.reload();
        }
      );
    });
  });