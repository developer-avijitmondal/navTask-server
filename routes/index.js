var express = require('express');
var router = express.Router();
require('dotenv').config();
const mysql = require('mysql2');  
const db = require("../models");
const Admin = db.Admin;
const global = require('./globalMethod');
const accountSid = 'ACd976523f209d91c9a198873f8d737f3c';
const authToken = '1d891327fe9f2f1b43b5b5c70cb3721e';
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status')
const saltRounds = 10;


const con = mysql.createConnection({  
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PASS,  
  database: process.env.DB_NAME  
});  

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({result:'index working'});
});

router.post('/create-admin',async function(req, res) {  console.log(req.body);
  const newUser = req.body;
  bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
    newUser.password = hash;
    Admin.create({
      name:newUser.name,
      password: newUser.password,
      email:newUser.email
    }).then(function(resolved){
      res.status(httpStatus.CREATED).json({ error: false, type : 'success', result :resolved}).end();
    }).catch(function(err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({ error: true, type : 'failed', result :err}).end();
    });    
  })
});

router.post('/create-employees',async function(req, res) {  console.log(req.body);
  db.Employee.create({ //create user
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
  }).then( (result) => {
    // global.sendEmail(req.body.email);   
    global.sendSMS(req.body.email);   
    res.status(200).json({ error: false, type : 'success', result : 'Successfully saved' });
  }).catch(err => {
    console.log(err);
    res.status(422).json({ error: true, type: 'danger', result : err })
  });
});

router.post('/delete-employees',(req, res) => {  console.log(req.body);
  db.Employee.destroy({ //create user
    where: {
      id: req.body.id,
    }
  }).then( (result) => {
      res.status(200).json({ error: false, type : 'success', result : 'Successfully saved' });
  }).catch(err => {
      res.status(422).json({ error: true, type: 'danger', result : err })
  });
});

router.post('/update-employees',(req, res) => {  console.log(req.body);
  db.Employee.update(
    { 
      email: req.body.email,
      name:req.body.name,
      phone: req.body.phone
    },
    { where:{ 
      id: req.body.id,
    } 
  }).then( (result) => {
    res.status(200).json({ error: false, type : 'success', result : 'Successfully saved' });
  }).catch(err => {
      res.status(422).json({ error: true, type: 'danger', result : err })
  });
});

router.get('/employees',(req, res) => {  //console.log(req.body);
  db.Employee.findAll({order: [
    ['id', 'DESC'],
  ]}).then( (result) => {
      res.status(200).json({ error: false, type : 'success', result : result });
      //res.status(200).json({ error: false, type : 'success', result : result });
      //res.json({ error: false, type : 'success', result : 'email verified successfully' });
  }).catch(err => {
      //console.log(err);
      res.status(422).json({ error: true, type: 'danger', result : err })
  });
});

router.get('/employees/:_id',async function (req, res) {  //console.log(req.body);
  const _id = req.params._id;
  getOne = await db.Employee.findOne({
    where: {
        id: _id
    },
  }).then( (result) => {
      res.status(200).json({ error: false, type : 'success', result : result });
      //res.status(200).json({ error: false, type : 'success', result : result });
      //res.json({ error: false, type : 'success', result : 'email verified successfully' });
  }).catch(err => {
      //console.log(err);
      res.status(422).json({ error: true, type: 'danger', result : err })
  });
});

router.get('/sms',(req, res) => {  //console.log(req.body);
  const sms = global.sendEmail(req.body);   
  res.status(200).json({ error: false, type : 'success', result : sms });
});

module.exports = router;
