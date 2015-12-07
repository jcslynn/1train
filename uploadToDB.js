SC.initialize({ client_id: 'b587094d7c883db6a341a2faeb24c587' });

$(document).ready(function() {
  var ids = [];
  var usernames = [];
  var titles = [];
  var artwork = [];
  var myUserID;

  var profile = prompt("Enter SoundCloud Profile", "");
  SC.get('/resolve?url=http://soundcloud.com/'+ profile +'&client_id=b587094d7c883db6a341a2faeb24c587').then( function(result) {
    console.log(result['id'] + ': ' + result['username']);
    myUserID = result['id'];
    // alert(result['id']);
    //get tracks from my soundcloud favorites

    SC.get('/users/' + myUserID + '/favorites').then( function(tracks) {
      // console.log(tracks);
      for (var i = 0; i < tracks.length; i++) {
          console.log(tracks[i]['id'] + ': ' + tracks[i]['title'] + ' by ' + tracks[i]['user_id'] + ':'
          + tracks[i]['user']['username'] + ' with artwork at ' + tracks[i]['artwork_url']  + ' and isStreamable() = ' + tracks[i]['streamable']);

          if (tracks[i]['streamable']) {
             $.ajax("uploadToDB.php",
             {
               type: "POST",
               dataType: "json",
               data: tracks[i],
               success: function(art, textStatus, jqXHR) { console.log(art); },
               error: function(jqXHR, textStatus, error){
               console.log(jqXHR.responseText);
               }

             });
           } else {
            console.log(tracks[i]['title'] + " is not streamable by api");
           }

      }
    });
  });
});
