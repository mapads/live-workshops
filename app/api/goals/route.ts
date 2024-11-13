import connectDB from '../../../lib/models/db';
import Goal from '../../../lib/models/Goal';

export async function GET(res: any) {
    console.log("Handling GET request...");
    try {
        await connectDB();
        const goals = await Goal.find();
        console.log("Successfully fetched goals:", goals);
        return new Response(JSON.stringify(goals), { status: 200 });
    } catch (error: any) {
        console.error("Error fetching goals:", error.message);
        return new Response(JSON.stringify({ error: 'Failed to fetch goals due to - ' + error.message }), { status: 500 });   
    }
}

export async function POST(req:Request, res:any) {
    console.log("Handling POST request...");
    try {
        await connectDB();
        const data = await req.json();
        const newGoal = new Goal(data);
        await newGoal.save();
        console.log("Successfully created goal:", newGoal);
        return new Response(JSON.stringify({ message: 'Goal created successfully', goal: newGoal }), { status: 201 });
    } catch (error: any) {
        console.error("Error creating goal:", error.message);
        return new Response(JSON.stringify({ error: 'Failed to create goal due to - ' + error.message }), { status: 500 });
    }
}