// github-api.js

// Import the dotenv package to load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Base URL for GitHub API
const BASE_URL = 'https://api.github.com';

// Function to send a request to a GitHub model
export async function sendRequestToModel(model, prompt) {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        throw new Error('API_KEY is not defined in the environment variables');
    }

    const url = `${BASE_URL}/models/${model}/generate`;

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        prompt: prompt,
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';

        // Fix syntax error in the while loop
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result += decoder.decode(value, { stream: true });
            console.log('Received chunk:', decoder.decode(value));
        }

        return result;
    } catch (error) {
        console.error('Error sending request to model:', error);
        throw error;
    }
}
