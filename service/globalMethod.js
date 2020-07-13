const nodemailer = require('nodemailer');
// var unirest = require("unirest");
// var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
const accountSid = 'ACa5ebf835d45460318d714486026940b1';
const authToken = 'f92852989fa9662e5f794244389d7cb0';
const client = require('twilio')(accountSid, authToken);
var TMClient = require('textmagic-rest-client');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GNAME,
      pass: process.env.GPWD
    }
});

exports.sendSMS = async function(data){ 
  return new Promise(function(resolve,reject){
    console.log(data);
    try
    {
      client.messages
      .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+15017122661',
        to: '+918582821118'
      }).then(message => {
        console.log(message.sid);
        resolve(message.sid);
      })
      console.log(sms);
      //.then(message => console.log(message.sid));
    }
    catch(e){
      reject(e);
    }
  }) 
  
}

exports.sendEmail = async function(email){  
    return new Promise(function(resolve,reject){
      console.log(email);
      try
      {
        var mailOptions = {
          from: process.env.GAC,
          to: email,
          subject: 'Sending Email using Node.js',
          text: 'This is just a testing email!'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            reject(error);
            // res.send(error);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(info.response);
            // res.send('Email sent: ' + info.response);
          }
        });
      }
      catch(e){
        reject(e);
      }
    })
}