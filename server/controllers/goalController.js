// server/controllers/goalController.js

const Goals = require('../models/Goals');

async function createGoal(req, res) {
    try {
        const goal = new Goals(req.body);
        await goal.save();
        res.status(201).send('Goal saved successfully');
    } catch (error) {
        res.status(400).send('Error saving goals: ' + error.message);
    }
}

async function getGoals(req, res) {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const goals = await Goals.find({
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        res.status(200).send(goals);
    } catch (error) {
        res.status(500).send('Error fetching goals: ' + error.message);
    }
}

module.exports = {
    createGoal,
    getGoals,
};
