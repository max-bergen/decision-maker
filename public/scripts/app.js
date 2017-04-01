$(document).ready(function() {

// Scripts for index.ejs
  //adds has-error class to empty input fields
  $('#pollForm').on('submit', function(event) {
    $('.email-field').removeClass("has-error");
    $('.title-field').removeClass("has-error");

    if ( ($('.email').val())  === ""){
      $('.email-field').addClass("has-error");
    }
     if ( ($('.title').val())  === ""){
      $('.title-field').addClass("has-error");
    }else{
      $('.poll-success').removeClass("hide");
    }

  });
  //Plus and minus buttons for adding and removing new option field
  $('.addButton').click(function() {
    var currLoc = $('#title').data("options");
    if(currLoc === 1){
      $('.minusButton').removeClass("hide");
    }
    if(currLoc === 5){
      $('.addButton').addClass("hide");
    }
    var newLoc = ($('#title').data("options")+1);
    $('#pollTemplate'+newLoc).removeClass("hide");
    $('#title').data("options", newLoc);
  });

  $('.minusButton').click(function() {
    var currLoc = $('#title').data("options");
    if(currLoc === 2){
      $('.minusButton').addClass("hide");
    }
    if(currLoc === 6){
      $('.addButton').removeClass("hide");
    }
    var newLoc = ($('#title').data("options")-1);
    $('#pollTemplate'+currLoc).find('input').val('');
    $('#pollTemplate'+currLoc).find('textarea').val('');
    $('#pollTemplate'+currLoc).addClass("hide");
    $('#title').data("options", newLoc);
  });


// scripts for poll.ejs
  var panelList = $('#draggablePanelList');

  panelList.sortable({
    handle: '.panel-heading',
    update: function() {
        $('.panel', panelList).each(function(index, elem) {
             var $listItem = $(elem),
                 newIndex = $listItem.index();
                var listLength = $('#draggablePanelList li').length;
                var voteCalc = listLength - newIndex;
        });
      }
  });

  $('#voteForm').on('submit', function(event){
    event.preventDefault();
    var submitArray = [];
    var listLength = $('#draggablePanelList li').length;
    $('.panel', panelList).each(function(index, elem) {
      var $listItem = $(elem), newIndex = $listItem.index();
      submitArray.push({optionID: $listItem.attr("id"), submitCount: (listLength - newIndex)});
    });
    $.ajax({
      url: '/user',
      method: 'POST',
      data: {
        submit: submitArray
      }
    });
   $('#thankyou').removeClass('hide');
  });

});
