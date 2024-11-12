import connectDB from '../../../lib/models/db';
import Goal from '../../../lib/models/Goal';

export async function GET() {
    await connectDB();

    try {
        const goals = await Goal.find();
        return new Response(JSON.stringify(goals), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch goals due to - ' + error }), { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    const data = await req.json();

    try {
        const newGoal = new Goal(data);
        await newGoal.save();
        return new Response(JSON.stringify(newGoal), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to save goal due to - ' + error}), { status: 400 });
    }
}