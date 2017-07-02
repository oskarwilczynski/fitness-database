"use strict";
$(document).ready(function() {
    let getExercise = function() {
        let descriptionData, imageData, exerciseId;
        let exercise = $("#term").val();

        if (exercise == "") {
            $("#exercise_status").html("<h2 class='loading'>Please enter something.</h2>");
        } else {
            $("#exercise_status").html("<h2 class='loading'>Loading...</h2>")

            $.when(
                $.getJSON("https://wger.de/api/v2/exercise/?name=" + exercise + "&format=json&language=2&status=2", function(data1) {
                    descriptionData = data1;
                    exerciseId = data1.results[0].id;
                })
            ).done(function() {
                $.getJSON("https://wger.de/api/v2/exerciseimage/?format=json&status=2&exercise=" + exerciseId + "&limit=999", function(data2) {
                    if ("undefined" === typeof descriptionData.results[0]) {
                        $('#exercise_status').html('<h2 class="loading">No exercise found!</h2>');
                    } else {
                        $('#exercise_status').html('<h2 class="loading">Exercise found!</h2>');
                        $('#exercise_img').attr("src", data2.results[0].image);
                        $('#exercise_description').html(descriptionData.results[0].description);
                    }
                })
            })
        }
    };

    (function autocompletePatch() {
        $.ui.autocomplete.prototype._renderItem = function(ul, item) {
            let cleanTerm = this.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            let keywords = $.trim(cleanTerm).replace('  ', ' ').split(' ').join('|');

            let re = new RegExp("(" + keywords + ")", "gi");
            let output = item.label.replace(re, "<span style='color: Blue;'>$1</span>");

            return $("<li>")
                .append($("<a>").html(output))
                .appendTo(ul);
        };
    })();

    {
        let names = [];

        $.getJSON("https://wger.de/api/v2/exercise/?format=json&language=2&limit=999&status=2", function(data) {
            $.each(data.results, function (index, item) {
                names.push(item.name);
            });
        });

        $("#term").autocomplete({source: names});
    }

    $("#search").click(getExercise);

    $("#term").keyup(function(event) {
        if (event.keycode == 13) {
            getExercise();
        }
    });
});
