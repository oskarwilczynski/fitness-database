"use strict";
$(document).ready(function() {

    let getExercise = function() {
        let exercise = $("#term").val();

        if (exercise == "") {
            $("#exercise").html("<h2 class='loading'>Please enter something.</h2>")
        } else {
            $("#exercise").html("<h2 class='loading'>Exercise is on its way.</h2>")

            $.getJSON("https://wger.de/api/v2/exercise/?name=" + exercise + "&format=json&language=2", function(json) {
                $('#exercise').html('<h2 class="loading">Exercise found!</h2>' + json.results[0].description);
            })
        }
    }

    $("#term").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://wger.de/api/v2/exercise/?format=json",
                type: "GET",
                data: { name: request.term },
                dataType: "json",
                minLength: 2,
                success: function(data) {
                    response($.map(data.results, function(item) {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    }));
                }
            });
        }
    });

    $("#search").click(getExercise);

    $("#term").keyup(function(event) {
        if (event.keycode == 13) {
            getExercise();
        }
    })
})
