/**
 * Source: "John Bentley's \OneDrive - DPIE\Documents\Sda\Code\Typescript\BfsLibrary\"
 * Warning: Don't edit outside of that location.
 * Author: John Bentley
 */

import fetch, { Response } from 'node-fetch';

export async function sendPostRequest(data: any, url: string) {

    try {
        const response: Response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}; statusMessage: ${response.statusText};`
            errorMessage += ` json: ${JSON.stringify(json)}`
            throw new Error(errorMessage);
        }
        
        console.log('Success:', json);
    } catch (error) {
        console.error('Error:', error);
    }
}

