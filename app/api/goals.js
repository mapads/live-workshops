import connectDB from '../../lib/models/db';
import Goal from '../../lib/models/Goal';

export default async function handler(req, res) {
    console.log("Incoming request with method:", req.method);

    switch (req.method) {
        case 'GET':
            console.log("Handling GET request...");
            try {
                await connectDB();
                const goals = await Goal.find();
                console.log("Successfully fetched goals:", goals);
                res.status(200).json(goals);
            } catch (error) {
                console.error("Error fetching goals:", error.message);
                res.status(500).json({ error: 'Failed to fetch goals due to - ' + error.message });
            }
            break; // Added break here

        case 'POST':
            console.log("Handling POST request...");
            try {
                await connectDB();
                const data = await req.json();
                const newGoal = new Goal(data);
                await newGoal.save();
                console.log("Successfully created goal:", newGoal);
                res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
            } catch (error) {
                console.error("Error creating goal:", error.message);
                res.status(500).json({ error: 'Failed to create goal due to - ' + error.message });
            }
            break; // Added break here

        default:
            console.log("Request method not allowed:", req.method);
            res.status(405).json({ error: 'Method not allowed' });
    }
}
