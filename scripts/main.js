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

    let bbb = $.getJSON( "https://wger.de/api/v2/exercise/?format=json", function( data ) {
        console.log('loaded');
        var names = []; // create array here
        $.each(data.results, function (index, item) {
            names.push(item.name); //push values here
        });
        console.log(names); // see the output here
    });

    $("#term").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://wger.de/api/v2/exercise/?format=json",
                type: "GET",
                data: { name: request.term },
                dataType: "json",
                minLength: 2,
                success: function(data) {
                    var names = [];
                    $.each(data.results, function (index, item) {
                        names.push(item.name);
                    })
                    console.log(names);
                    response(names);
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
