import connectDB from '../../../lib/models/db';
import Goal from '../../../lib/models/Goal';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                await connectDB();
                const goals = await Goal.find();
                res.status(200).json(goals);    
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch goals due to - ' + error.message });
            }
        case 'POST':
            try {
                await connectDB();
                const data = await req.json();
                const newGoal = new Goal(data);
                await newGoal.save();
                res.status(201).json({message: 'Goal created successfully', goal: newGoal});        
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch goals due to - ' + error.message });
            }    
        default:
            res.status(405).json({ error: 'Method not allowed' });    
            // return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }
}