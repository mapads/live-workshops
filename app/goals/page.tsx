"use client";

import { useState, useEffect } from 'react';

interface Goal {
    _id: string;
    name: string;
    goal: string;
}

export default function Goals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [revealedGoals, setRevealedGoals] = useState<{ [key: string]: boolean }>({});
    const PORT = process.env.PORT || 5002;

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                // const response = await fetch(`http://localhost:${PORT}/api/goals`);
                const response = await fetch(`/api/goals`);
                if (!response.ok) throw new Error('Failed to fetch goals');
                const data: Goal[] = await response.json();
                setGoals(data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();

        const interval = setInterval(() => {
            if (!isPaused) {
                fetchGoals();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    const toggleReveal = (id: string) => {
        setRevealedGoals((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Function to generate avatar URL using DiceBear
    const getAvatarUrl = (id: string) => `https://api.dicebear.com/9.x/bottts/svg?seed=${id}`;

    // Count the number of revealed goals
    const revealedCount = Object.values(revealedGoals).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-base-200 flex items-start justify-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-lg">
                <div className='flex flex-row align-center justify-between'>
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">Class Goals</h1>
                {/* <div className=''></div> */}
                <h1 className='text-2xl text-gray-600 mb-4'>{revealedCount}/{goals.length} goals Revealed</h1>
                <button
                    onClick={togglePause}
                    className={`btn ${isPaused ? "btn-success" : "btn-error"} mb-4`}
                >
                    {isPaused ? "Get more goals" : "Stop"}
                </button>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {goals.map((goal) => (
                        <li key={goal._id} className="bg-secondary p-4 rounded-lg shadow h-48 flex flex-col items-start justify-start">
                            <div className={`avatar ${revealedGoals[goal._id] ? "online" : "offline"}`}>
                                <div className='ring ring-accent ring-offset-base-100 w-12 h-12 rounded-full mb-2 '>
                                    <img
                                        src={getAvatarUrl(goal._id)}
                                        alt="Avatar"
                                        className={`${revealedGoals[goal._id] ? "" : "animate-bounce"}`}
                                    />
                                </div>
                            </div>
                            <h2 className="text-lg font-semibold">{goal.name}</h2>
                            {revealedGoals[goal._id] ? (
                                <p className="text-sm text-left animate-reveal">{goal.goal}</p>
                            ) : (
                                <button
                                    onClick={() => toggleReveal(goal._id)}
                                    className="btn btn-primary btn-sm mt-2"
                                >
                                    Reveal Goal
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
