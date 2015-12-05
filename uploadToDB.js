SC.initialize({ client_id: 'b587094d7c883db6a341a2faeb24c587' });

$(document).ready(function() {
  var ids = [];
  var usernames = [];
  var titles = [];
  var artwork = [];
  var myUserID;


  SC.get('/resolve?url=http://soundcloud.com/soundsbytk&client_id=b587094d7c883db6a341a2faeb24c587').then( function(result) {
    console.log(result['id'] + ': ' + result['username']);
    myUserID = result['id'];

    //get tracks from my soundcloud favorites
    SC.get('/users/' + myUserID + '/favorites').then( function(tracks) {
      console.log(tracks);

      for (var i = 0; i < tracks.length; i++) {
        console.log(/*tracks[i]['id'] + ': ' + tracks[i]['title'] + ' by ' + tracks[i]['user_id'] + ':'
         + tracks[i]['user']['username'] + ' with artwork at ' +*/ tracks[i]['artwork_url']);


         $.ajax("uploadToDB.php/",
         {
           type: "POST",
           dataType: "json",
           data: tracks[i],
           success: function(art, textStatus, jqXHR) { console.log(art); },
           error: function(jqXHR, textStatus, error){
            console.log(jqXHR.responseText);
           }

         });

      }
    });
  });




    /*
    //play specified song
    SC.stream('/tracks/' + ids[1]).then(function(player){
                              player.play();
    });
    */
});
