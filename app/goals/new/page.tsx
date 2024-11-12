"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    goal: string;
}

export default function NewGoal() {
    const [formData, setFormData] = useState<FormData>({ name: '', goal: '' });
    const PORT = process.env.PORT || 5002;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:${PORT}/api/goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.text();
        alert(result);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Add goal</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-4"
                    required
                />

                <textarea
                    name="goal"
                    placeholder="Your Goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full mb-4"
                    required
                />
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
        </div>
    )
}