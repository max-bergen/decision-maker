var api_key = 'key-d2c16dbc8e0a63b2df2dca2f79e5b10f';
var domain = 'sandbox2a9b32fa5d5340d196ac1b14ec5933ef.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


module.exports = (recipient, title, admin, user) => {

  var data = {
    from: 'Link-Generator@Decision-maker.com',
    to: recipient,
    subject: `${title} Poll Created`,
    text: `Administrative Link: http://localhost:8080/${admin}\nVoter Link: http://localhost:8080/${user}`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

