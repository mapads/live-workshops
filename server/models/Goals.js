const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
    goal: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model('Goals', GoalsSchema);