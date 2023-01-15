const User = require('../models/question.model.js');
const jwt = require("jsonwebtoken")
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        description: req.body.description,
        
        subject : req.body.subject,
   
        idClient:req.body.idClient,
        nbrrate : req.body.nbrrate,
        nbruser : req.body.nbruser
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.findById(req.params.questionId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.questionId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
   

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.questionId, {
        nbrrate : req.body.nbrrate,
        nbruser : req.body.nbruser
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.questionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.questionId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.questionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.questionId
        });
    });
};

exports.findtokenall = (req, res) => {
   
    const headers = req.headers['authorization']
    console.log(headers)
    if(headers) {
      // Bearer oabsdoabsoidabsiodabsiodbasoid
      const token = headers.split(' ')[1]
      const decoded = jwt.verify(token, 'secret')
      
      if(decoded) {
        let username = decoded.id
        console.log("////////////////////////////////////////////////////")
        console.log(username)
        User.find()
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + username
                });            
            }
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + username
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + username
            });
        });
      } else {
        res.json({message: 'Unauthorized access'})
      }
      
    } else {
      res.json({message: 'Unauthorized access'})
    }
};