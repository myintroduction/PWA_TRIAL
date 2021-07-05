const express = require('express');// common
const router = express.Router(); //common
const request = require('request');

//welcome page -> for rendering main.ejs file
router.get('/', (req, res) => res.render('main'));

//////MAILCHIMP CONNECTING//////////////
router.post('/signup', (req, res) => {
    const { firstName, lastName, email, dob} = req.body;

    // VALIDATING THE FORM THAT IS CHECKIN EVERY ENRTY IS FILLED 
    if(!firstName|| !lastName|| !email){
        res.redirect('/users/fail');          //REDIRECTING TO THE FAIL PAGE
        return;
    }

    //CONSTRUCTING THE REQUIRED DATA THAT IS FOR POSTDATA
    const data = {
        members:[
            {
                email_address: email,     //IT WILL PULL THE EMAIL FROM THE BODY
                status: 'subscribed',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                    BIRTHDAY:dob
                }
            }
        ]
    }

    //CONVERTING THE ABOVE DATA OBJECT INTO A STRING
    postData = JSON.stringify(data);

    // CONNECTING TO MAILCHIMP
    const option={
        url:'https://us6.api.mailchimp.com/3.0/lists/0abd47d710',       //LIST ID IS GIVEN HERE
        method:'POST',
        headers:{
            Authorization:'auth 67237e5964221333eb1bba707f06c4a3-us6'   //API KEY IS GIVEN HERE
        },
        body: postData
    };
    request(option, (err, response, body) =>{
        //CHECKING FOR AN ERROR & IF ERROR OCCURED THE REDIRECTING IT TO FAIL PAGE
        if(err){
            res.redirect('/users/fail');
        }
        //IF ERROR IS NOT FOUND
        else{
            //AGAIN WE WILL CONFIRM FOR THE STATUS CODE THAT IS IF STATUS CODE IS 200 THEN EVERYTHING IS OK
            if(response.statusCode===200){
                res.redirect('/users/success');
            }
            else{
                res.redirect('/users/fail');
            }
        }
    });
});

//////////////////////////MAILCHIMP ENDS/////////////////////////////////////



//for connecting with app.js
module.exports = router; //common
