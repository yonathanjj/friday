async function sendMessageToAI(message) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) {
            // If the server response is not 2xx, throw an error
            const errorData = await response.json();
            throw new Error(errorData.error || `Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        return data.reply; // Return the AI's reply text

    } catch (error) {
        console.error("Error communicating with the backend:", error);
        // Return a user-friendly error message to be spoken
        return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}