// $(document).ready(function(){
//     $("#term").focus(function() {
//         let full = $("#exercise").has("img").length ? true : false;
//         if (full == false) {
//             $("#exercise").empty();
//         }
//     })
// })

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://wger.de/api/v2/?format=json');
ourRequest.onload = function() {
    var ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData["workout"]);
};
ourRequest.send();