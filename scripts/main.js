$(document).ready(function(){
    $("#term").focus(function() {
        let full = $("#exercise").has("img").length ? true : false;
        if (full == false) {
            $("#exercise").empty();
        }
    })

    let getExercise = function() {
        let exercise = $("#term").val();

        if (film == "") {
            $("#exercise").html("<h2 class='loading'>Please enter something.</h2>")
        } else {
            $("#exercise").html("<h2 class='loading'>Exercise is on its way.</h2>")
        }
    }
})