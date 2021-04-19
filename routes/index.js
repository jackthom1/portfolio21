var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();
const SMTPConnection = require('nodemailer/lib/smtp-connection');


/* GET home page. */
router.route('/')
  .get((req, res)=>{
    res.render('index')
  })
  .post([check('message').escape()],(req, res, next)=>{
    let message = req.body.message
    let email = req.body.email

    if (!message || !email){
      res.status(500)
      res.render('error')
    } else {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      })
      let info = {
          from: `Website Enquiry`,
          to: "jothom111@gmail.com",
          subject: "Website Message",
          html: `<p>${message}</p><p>From: ${email}</p>`
      };
      transporter.sendMail(info, (err, data) =>{
        if (err){
          res.status(500)
          res.render('error', {error: err})
        } else{
          res.render('index', {message: "Thanks for your message :)"})
        }
      });
    }
    })


router.get('/artist-detox', (req, res)=>{
  res.render('artist-detox')
})
router.get('/1-zero-1', (req, res)=>{
  res.render('1-zero-1')
})
router.get('/ocean-youth', (req, res)=>{
  res.render('ocean-youth')
})
router.get('/sound-communities', (req, res)=>{
  res.render('sound-communities')
})

module.exports = router;
