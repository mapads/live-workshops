import connectDB from '../../../lib/models/db';
import Goal from '../../../lib/models/Goal';

// Error type for catch blocks
type ErrorWithMessage = {
    message: string;
};

export async function GET() {
    console.log("Handling GET request...");
    try {
        await connectDB();
        // Get the start of today's date in UTC
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch goals created from the start of today
        const goals = await Goal.find({ createdAt: { $gte: today } });
        console.log("Successfully fetched goals from today:", goals);
        
        return new Response(JSON.stringify(goals), { status: 200 });
    } catch (error) {
        const typedError = error as ErrorWithMessage;
        console.error("Error fetching goals:", typedError.message);
        return new Response(JSON.stringify({ error: 'Failed to fetch goals due to - ' + typedError.message }), { status: 500 });
    }
}

export async function POST(req: Request) {
    console.log("Handling POST request...");
    try {
        await connectDB();
        const data = await req.json();
        const newGoal = new Goal(data);
        await newGoal.save();
        console.log("Successfully created goal:", newGoal);
        return new Response(JSON.stringify({ message: 'Goal created successfully', goal: newGoal }), { status: 201 });
    } catch (error) {
        const typedError = error as ErrorWithMessage;
        console.error("Error creating goal:", typedError.message);
        return new Response(JSON.stringify({ error: 'Failed to create goal due to - ' + typedError.message }), { status: 500 });
    }
}
