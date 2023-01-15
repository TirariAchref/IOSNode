module.exports = (app) => {
    const reponse = require('../controllers/reponse.controller.js');

    // Create a new Note
    app.post('/createreponse', reponse.create);

    // Retrieve all Notes
    app.get('/allreponses', reponse.findAll);

    // Retrieve a single Note with noteId
    app.get('/getreponse/:reponseId', reponse.findOne);

    // Update a Note with noteId
    app.put('/updatereponse/:reponseId', reponse.update);

    // Delete a Note with noteId
    app.delete('/deletereponse/:reponseId', reponse.delete);

    app.get('/getreponsesid/:idQuestion', reponse.findallbyid);
}