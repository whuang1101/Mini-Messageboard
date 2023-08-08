var express = require('express');
var router = express.Router();
require('dotenv').config()

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.SECRET_KEY;
const messageSchema = require("../model/userMessages");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },   
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


async function createMessage(textAdded, userAdded, dateAdded){
  const doc = await messageSchema.create({text: textAdded,
  user: userAdded,
  added:dateAdded})
}
async function retrieveMessages(){
  try{
    const messages = await messageSchema.find();
    return messages
  }
  catch(error){
    console.error("Error retrieving messages")
  }
}

retrieveMessages();
router.get('/', async function(req, res, next) {
  const messages = await retrieveMessages();
  res.render('index', { title: 'Mini Messageboard', messages:messages });
});

router.get('/new', function(req,res,next){
  res.render('form', { title: 'New Message'});
})

router.post('/new', function(req,res,next){
  const messageUser = req.body.author;
  const messageText = req.body.text;
  messages.push({text:messageText,user:messageUser,added:new Date()})
  createMessage(messageText,messageUser,new Date())
  res.redirect('/')
})
module.exports = router;
