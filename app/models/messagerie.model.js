const mongoose = require('mongoose');

const messagerieSchema = mongoose.Schema({
    message: String,
    object: String,
   
    from: String,
    to : String
}, {
    timestamps: true
});

module.exports = mongoose.model('messagerie', messagerieSchema);