const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const router = require('express').Router();
const clientPassport = require("passport")
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// Consts to save the image
const multer = require('multer');
const Client = require('./app/models/user.model.js');
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, './uploads/');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
   }
});
var upload = multer({ storage: storage });
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
app.use(clientPassport.initialize());

require('./app/routes/user.routes.js')(app);

require('./app/routes/reponse.routes.js')(app);
require('./app/routes/question.routes.js')(app);
require('./app/routes/messagerie.routes.js')(app);


//---------------update image----------------
router.route('/updateImageClient/:id').post( upload.single('Image'), (req, res) => {
    Client.findById(req.params.id)
    .then(client => {        
       
      client.imageUrl = req.file.path
  
      client.save()
        .then(() => res.send(client))
        .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
  });
  app.use('/uploads', express.static('uploads'));

app.use('', router);
