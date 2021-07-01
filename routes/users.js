const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const validator = require('validator');
var MongoClient = require('mongodb').MongoClient;
const Register = require('../models/Register')
const nodemailer = require("nodemailer");
var url = "mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/EventWebsite?retryWrites=true&w=majority";

router.get('/about', (req, res) => res.render('about'));

router.get('/gallery', (req, res) => res.render('gallery'));

router.get('/contact', (req, res) => res.render('contact'));

router.get('/registration', (req, res) => res.render('registration'));

router.get('/events', (req, res) => res.render('events'));

router.get('/team', (req, res) => res.render('team'));

router.get('/polling', (req, res) => res.render('polling'));

router.get('/stats', (req, res) => res.render('stats'));



router.post("/contact", async (req, res) => {


    console.log("inside contact backend");
    var username = req.body.name;
    var useremail = req.body.email;
    var userphone = req.body.phone;
    var usermessage = req.body.message;
    // New Code
    console.log(useremail);

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, dbData) {
        if (err) {
            console.log('something went wrong here ' + err);
        } else {
            console.log("connected successfully");
            var dbObj = dbData.db("EventWebsite"); // creating a database in mongodb

            // For insertOne
            var dataObj = {
                name: username,
                email: useremail,
                phone: userphone,
                message: usermessage
            };

            // Mail code 1

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sstechservices2311@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'sstechservices2311@gmail.com',
                to: 'sushilsshinde6@gmail.com',
                subject: 'Welcome User',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                       <h2>Customer details are as follows:</h2>
                       <table style="width: 100%;">
                           <tr>
                               <td class="bg-secondary text-dark">Name</td>
                               <td>${username}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Email Address</td>
                               <td>${useremail}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Contact Details</td>
                               <td>${userphone}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Message</td>
                               <td>${usermessage}</td>
                           </tr>
                       </table>`
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(information.reponse);
                    // console.log(information);
                    console.log("Mail Send to Sushil");
                }
            });
            // End Mail code 1

            // Mail code 2

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sstechservices2311@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'sstechservices2311@gmail.com',
                to: useremail, // testing
                subject: 'Confirmation Mail',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                       <h2>Your details received are as follows:</h2>
                       <table style="width: 100%;">
                           <tr>
                               <td class="bg-secondary text-dark">Name</td>
                               <td>${username}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Email Address</td>
                               <td>${useremail}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Contact Details</td>
                               <td>${userphone}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Message</td>
                               <td>${usermessage}</td>
                           </tr>
                       </table>
                       <br><h4>From SS Tech</h4>
                       <br>Do not reply to this mail. This is auto generated mail.`
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(information.reponse);
                    // console.log(information);
                    console.log("Mail Send to " + useremail);
                }
            });
            // End Mail code 2

            dbObj.collection("users").insertOne(dataObj, function (err, data) {

                if (err) {
                    console.log("err2 = " + err);
                } else {
                    console.log(data.insertedCount + " documents inserted");
                    dbData.close();

                    // Previous mail code

                    // res.status(201).render("index"); // wait
                    res.redirect('/users/contact'); // try
                }
            })

        }

    });

})


router.post("/registration", async (req, res) => {
    console.log("inside contact backend");
   
    var userfirstname = req.body.firstName;
    var userlastname = req.body.lastName;
    var usermail = req.body.mail;
    var userphone = req.body.phone;
    // New Code
    console.log(usermail);

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, dbData) {
        if (err) {
            console.log('something went wrong here ' + err);
        } else {
            console.log("connected successfully");
            var dbObj = dbData.db("EventWebsite"); // creating a database in mongodb

            // For insertOne
            var dataObj = {
                firstName: userfirstname,
                lastName: userlastname,
                mail: usermail,
                phone: userphone
            };

            // Mail code 1

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sstechservices2311@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'sstechservices2311@gmail.com',
                to: 'sushilsshinde6@gmail.com',
                subject: 'Welcome User',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                       <h2>Customer details are as follows:</h2>
                       <table style="width: 100%;">
                           <tr>
                               <td class="bg-secondary text-dark">First Name</td>
                               <td>${userfirstname}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Last Name</td>
                               <td>${userlastname}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">User Email ID</td>
                               <td>${usermail}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">User Phone no.</td>
                               <td>${userphone}</td>
                           </tr>
                       </table>
                       <br><h4>From Event Website Portal</h4><br>
                       <br><b>Your tickets will be confirmed once you do the payment through the payment gateway.<b> 
                       <br><b>NOTE : Enter the same email ID on Payment Gateway portal which you entered while registering here.<b>`
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(information.reponse);
                    // console.log(information);
                    console.log("Mail sent to Sushil");
                }
            });
            // End Mail code 1

            // Mail code 2

            // transporter
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sstechservices2311@gmail.com',
                    pass: 'ankit@123'
                }
            });

            // mail information
            var mailoptions = {
                from: 'sstechservices2311@gmail.com',
                to: usermail, // testing
                subject: 'Confirmation Mail',
                // text: 'Hello, testing mail ahead!!!'
                html: `
                       <h2>Your details received are as follows:</h2>
                       <table style="width: 100%;">
                           <tr>
                               <td class="bg-secondary text-dark">First Name</td>
                               <td>${userfirstname}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Last Name</td>
                               <td>${userlastname}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">E-mail ID</td>
                               <td>${usermail}</td>
                           </tr>
                           <tr>
                               <td class="bg-secondary text-light">Phone number</td>
                               <td>${userphone}</td>
                           </tr>
                       </table>
                       <br><h4>From SS Tech</h4>
                       <br>Do not reply to this mail. This is auto generated mail.`
                // Reference : https://www.w3schools.com/nodejs/nodejs_email.asp
            };

            transporter.sendMail(mailoptions, function (error, information) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(information.reponse);
                    // console.log(information);
                    console.log("Mail Send to " + useremail);
                }
            });
            // End Mail code 2

            dbObj.collection("users").insertOne(dataObj, function (err, data) {

                if (err) {
                    console.log("err2 = " + err);
                } else {
                    console.log(data.insertedCount + " documents inserted");
                    dbData.close();

                    res.redirect('/users/registration'); // try
                }
            })

        }

    });
});


module.exports = router;

