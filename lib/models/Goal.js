// lib/models/Goal.js
import mongoose from 'mongoose';

const GoalsSchema = new mongoose.Schema({
    goal: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Goal || mongoose.model('Goal', GoalsSchema);
