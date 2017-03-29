$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});


// runs imported mailgun. Recipient needs to be manually added to mailgun site
// const email = require('./mailgun');
// email('couragyn@gmail.com');
