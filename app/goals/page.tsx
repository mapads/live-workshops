"use client";

import { useState, useEffect } from 'react';

interface Goal {
    _id: string;
    name: string;
    goal: string;
}

export default function Goals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const PORT = process.env.PORT || 5002;

    useEffect(() => {
        // Fetch goals from the API
        const fetchGoals = async () => {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/goals`); // Local URL
                if (!response.ok) throw new Error('Failed to fetch goals');
                const data: Goal[] = await response.json();
                setGoals(data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, []);

    return (
        <div>
            <h1>Goals</h1>
            <ul>
                {goals.map((goal) => (
                    <li key={goal._id}>
                        <h2>{goal.name}</h2>
                        <p>{goal.goal}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
