const router = require('express').Router()

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require('../controllers/user.controller.js');
module.exports = (app) => {
   
    // Create a new Note
    app.post('/createuser', user.create);


   
    // Retrieve all Notes
    app.get('/allusers', user.findAll);

    // Retrieve a single Note with noteId
    app.get('/getuser/:userId', user.findOne);

    // Update a Note with noteId
    app.put('/updateuser/:userId', user.update);
     // Update a Note with noteId
     app.put('/updateuserpass/:userId', user.updatenotpassword);
    
    // Delete a Note with noteId
    app.delete('/deleteuser/:userId', user.delete);

    //Login
    app.post('/loginClient', user.findclient)

    app.get('/tokenaccount',user.findtoken)
    app.get('/tokenaccountall',user.findtokenall)

    app.get('/getuserEmail/:Email', user.findOneEmail);

    app.post('/sendmail',user.sendmaill)


}
