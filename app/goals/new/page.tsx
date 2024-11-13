"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    goal: string;
}

export default function NewGoal() {
    const [formData, setFormData] = useState<FormData>({ name: '', goal: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [successfullySubmitted, setSuccessfullySubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setSuccessfullySubmitted(false); // Reset upon change
        setErrorMessage(''); // Clear error on new input
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (successfullySubmitted || loading) return; // Prevent multiple submissions
        setLoading(true);
        try {
            const response = await fetch(`/api/goals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccessfullySubmitted(true);
                setErrorMessage('');
            } else {
                const result = await response.text();
                setErrorMessage(result || 'Submission failed');
            }
        } catch (error) {
            console.error('Error submitting goal:', error);
            setErrorMessage('Failed to submit goal: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-gray-600 mb-4">What is your goal from learning in this class?</h2>

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

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                {successfullySubmitted && <div className="text-green-500 mb-4">Goal submitted successfully!</div>}

                {!successfullySubmitted &&
                    (
                        <button
                            type="submit"
                            className={`btn ${loading ? "btn-neutral" : "btn-primary"} ${successfullySubmitted && "text-gray-600 btn-ghost"} w-full flex items-center justify-center`}
                        >
                            {loading && <span className="loading loading-spinner mr-2"></span>}
                            {loading && "Loading"}
                            {!loading && !successfullySubmitted && "Submit"}
                        </button>
                    )}
            </form>
        </div>
    );
}