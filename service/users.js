const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const { Op } = require("sequelize");
var nodemailer = require('nodemailer');
const models = require('../models/index.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const async = require('async')
const express=require("express");
const crypto = require('crypto')
const router=express.Router();
const config = require('../config/config')
//const config1=require("../../config/config1")
//const logger = require('../../config/logger.config');
var d = new Date();
console.log("sir you port is")
/*
exports.allUsers=async(req,res,next)=>{
  models.auth_user.findAll({
      attributes:['id','username','email','first_name','last_name']
}).then(function(resolved){
  logger.info(`Get all users ${resolved} on ${d}`);
  res.status(httpStatus.OK)
            .json({ error: false, type : 'success', result :resolved}).end();

}).catch(function(rejected){
  logger.error(`Get all users ${rejected} on ${d}`);
  res.status(httpStatus.NO_CONTENT).send("peasase register first")


})}*/

exports.registeruser=async(req,res,next)=>{
    const newUser = req.body;
        bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser.password = hash;
        console.log(newUser)
        models.user.create({
            password: newUser.password,
        
            username:newUser.username,
      
            email:newUser.email
    
            }).then(function(resolved){
        
            console.log("New user Created in the Database");
            res.status(httpStatus.CREATED)
            .json({ error: false, type : 'success', result :resolved}).end();
           
            //why is this not working?
        }).catch(function(err) {
     
          res.status(httpStatus.NOT_ACCEPTABLE)
          .json({ error: true, type : 'failed', result :err}).end();
         
    
        });                
  });}
/*  
exports.loginuser=function(req,res,next){
    finduser=function(){
        return new Promise(function(resolve,reject){
        models.auth_user.findOne(
        {where:
              {[Op.or]: [
                  { username:req.body.username },
                  { email: req.body.email }
                ]
              }})
              .then(function(dbUser) {
                resolve({
                  "userdata":dbUser,
                  "password":req.body.password
                        })  
              }).catch(function(rejected){
                    reject({"login":"failed","user":"notfound"})
              })
            })
          }
    comparepassword=function(userdata){
    return new Promise(function(resolve,reject){
    bcrypt.compare(req.body.password,userdata.userdata.password, function(err, result) {
        if(err)
        {
          reject("password not matches");
        }
       console.log("bcrypt response", result);
           if(result) {
             console.log(result);
               console.log("passwords match");
               const playload=({"id":userdata.userdata.id
               ,"name":userdata.userdata.name,
               "password":userdata.userdata.password})
               const token = jwt.sign(playload,config1.secret)
                resolve({"token":token,"login":"success"})
               } else {
                reject({"login":"failed","password":"notmatches"})}});})}
    finduser().then(function(resolved){
      if(resolved.userdata==null)
      {
      res.status(httpStatus.NOT_FOUND).send("Invalid username or email")
      console.log(resolved);
      logger.info(`user found ${resolved} on ${d}`)}
      return comparepassword(resolved)
    }).catch(function(rejected){
      res.status(httpStatus.NOT_FOUND).send(rejected)
      logger.error(`user not found ${rejected} on ${d}`)
    }).then(function(resolved){
    res.status(httpStatus.OK).json({ error: false, type : 'success', result:resolved}).end();
    }).catch(function(rejected){
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error:true, type :'faied', result:rejected}).end();
    })
    }*/