module.exports = (app) => {
    const messagerie = require('../controllers/messagerie.controller.js');

    // Create a new Note
    app.post('/createmessagerie', messagerie.create);

    // Retrieve all Notes
    app.get('/allmessagerie', messagerie.findAll);

    // Retrieve a single Note with noteId
    app.get('/getmessagerie/:messagerieId', messagerie.findOne);

    // Update a Note with noteId
    app.put('/updatemessagerie/:messagerieId', messagerie.update);

    // Delete a Note with noteId
    app.delete('/deletemessagerie/:messagerieId', messagerie.delete);
}