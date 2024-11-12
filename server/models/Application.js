const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);