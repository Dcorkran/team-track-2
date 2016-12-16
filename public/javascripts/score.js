

$(document).ready(function() {
  $('#delete-button').on('click',function(){
    var whatID = window.location.pathname.split('/')[2];
    $.ajax({
      type: 'DELETE',
      url: `/score/${whatID}`,
      success: function() {
        window.location='/scores';
      }
    }
    );
  });
  $('#edit-button').on('click',function(){
    addEdit();
  });
});

function addEdit(){
  let $newForm1 = $(`
    <div class="input-field col s4">
      <input id="team-1-score-update" type="number" length="2" name="team_1_score"required>
      <label for="team-1-score-update">Team 1 Score</label>
    </div>`);
  let $newForm2 = $(`
      <div class="input-field col s4">
        <input id="team-2-score-update" type="number" length="2" name="team_2_score"required>
        <label for="team-2-score-update">Team 2 Score</label>
      </div>`);
  let $submitButton = $(`<a id="submit-button"class="waves-effect waves-light btn col s10 pull-s1 green">Submit</a>`);
  // let $buttonDiv = $(`<div id="update-here"class ="row"></div>`);
  $('#score1 div:eq(1)').remove();
  $('#score2 div:eq(1)').remove();
  $('#score1').append($newForm1);
  $('#score2').append($newForm2);
  // $('#buttons').after($buttonDiv);
  addUpdateHandler($submitButton);
  $('#confirm-button').append($submitButton);

}

function addUpdateHandler(button){
  button.on('click',function(){
    var whatID = window.location.pathname.split('/')[2];
    $.ajax({
      type: "PUT",
      url: `/score/${whatID}`,
      contentType: 'application/json',
      dataType: "JSON",
      data: JSON.stringify({
        score1:$('#team-1-score-update').val(),
        score2:$('#team-2-score-update').val()
      }),
      success: function(data) {
        window.location=`/score/${whatID}`;
      },
      fail: function(data){
      }
    }).then((message)=>{
      console.log(message);
    });
  });
}
