"use strict";
$(document).ready(function() {

    let getExercise = function() {
        let exercise = $("#term").val();

        if (exercise == "") {
            $("#exercise").html("<h2 class='loading'>Please enter something.</h2>")
        } else if (exercise == "undefined") {
            $("#exercise").html("<h2 class='loading'>Exercise not found.</h2>")
        } else {
            $("#exercise").html("<h2 class='loading'>Exercise is on its way.</h2>")

            $.getJSON("https://wger.de/api/v2/exercise/?name=" + exercise + "&format=json&language=2", function(json) {
                $('#exercise').html('<h2 class="loading">Exercise found!</h2>' + json.results[0].description);
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

        $.getJSON("https://wger.de/api/v2/exercise/?format=json&language=2&limit=999", function(data) {
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
