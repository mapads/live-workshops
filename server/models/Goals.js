// models/Goals.js
const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
    goal: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goals', GoalsSchema);