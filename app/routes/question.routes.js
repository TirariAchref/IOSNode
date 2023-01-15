module.exports = (app) => {
    const question = require('../controllers/question.controller.js');

    // Create a new Note
    app.post('/createquestion', question.create);

    // Retrieve all Notes
    app.get('/allquestions', question.findAll);

    // Retrieve a single Note with noteId
    app.get('/getquestion/:questionId', question.findOne);

    // Update a Note with noteId
    app.put('/updatequestion/:questionId', question.update);

    // Delete a Note with noteId
    app.delete('/deletequestion/:questionId', question.delete);
    app.get('/tokenaccountallquestion',question.findtokenall)
}