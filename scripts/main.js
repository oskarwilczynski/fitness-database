"use strict";
$(document).ready(function() {
    let getExercise = function() {
        let exercise = $("#term").val();

        if (exercise == "") {
            $("#exercise_status").html("<h2 class='loading'>Please enter something.</h2>");
        } else {
            $("#exercise_status").html("<h2 class='loading'>Loading...</h2>")
            
            $.getJSON("https://wger.de/api/v2/exercise/?name=" + exercise + "&format=json&language=2&status=2", function(descriptionData) {
                if ("undefined" === typeof descriptionData.results[0]) {
                    $('#exercise_status').html('<h2 class="loading">No exercise found!</h2>');
                    $('#exercise_img').attr("src", "");
                    $('#exercise_description').empty();
                    $('#exercise_description').css({"border": "", "border-radius": ""});

                } else {
                    $.getJSON("https://wger.de/api/v2/exerciseimage/?format=json&status=2&exercise=" + descriptionData.results[0].id + "&limit=999", function(imageData) {
                        if ("undefined" === typeof imageData.results[0]) {
                            $('#exercise_img').attr("src", "images/no-img-available.png");
                        } else {
                            $('#exercise_img').attr("src", imageData.results[0].image);
                        }

                        $('#exercise_status').html('<h2 class="loading">Exercise found!</h2>');
                        $('#exercise_description').html(descriptionData.results[0].description);
                        $('#exercise_description').css({"border": "2px solid #f8f8f8", "border-radius": "10px"});
                    })
                }
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
