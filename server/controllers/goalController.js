import Goals, { find } from '../models/Goals';

export async function createGoal(req, res) {
    try {
        const goal = new Goals(req.body);
        await goal.save();
        res.status(201).send('Goal saved successfully');
    } catch (error) {
        res.status(400).send('Error saving goals: ' + error.message);
    }
}

export async function getGoals(req, res) {
    try {
        const goals = await find();
        console.log(`fetching goals ${goals}`);
        res.status(200).send(goals);
    } catch (error) {
        res.status(500).send('Error fetching goals: ' + error.message);
    }
}