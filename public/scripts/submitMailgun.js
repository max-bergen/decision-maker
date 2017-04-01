var api_key = 'key-d2c16dbc8e0a63b2df2dca2f79e5b10f';
var domain = 'sandbox2a9b32fa5d5340d196ac1b14ec5933ef.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


module.exports = (recipient, url) => {

  var data = {
    from: 'Pole-Vote@Decision-maker.com',
    to: recipient,
    subject: `Vote on Pole`,
    text: `Someone has voted on a pole. View here: http://localhost:8080/admin/${url}`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

