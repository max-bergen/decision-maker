var api_key = 'key-d2c16dbc8e0a63b2df2dca2f79e5b10f';
var domain = 'sandbox2a9b32fa5d5340d196ac1b14ec5933ef.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


module.exports = (recipient) => {

  var data = {
    from: 'decision-maker@gmail.com',
    to: recipient,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

