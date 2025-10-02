// frontend/speech.js (With Female Voice Selection)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    console.error("Sorry, your browser does not support speech recognition.");
} else {
    // --- SPEECH RECOGNITION (STT) SETUP ---
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isListening = false;
    const wakeWord = "hey friday";
    const sleepWord = "thank you friday";

    console.log("Friday AI is standing by. Say 'Hey Friday' to activate.");

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Heard:', transcript);

        if (!isListening) {
            if (transcript.includes(wakeWord)) {
                console.log("Wake word detected! Listening for command...");
                isListening = true;
                startListening();
            }
        } else {
            if (transcript.includes(sleepWord)) {
                console.log("Sleep word detected. Going back to standby.");
                isListening = false;
                stopListening();
                return;
            }
            processCommand(transcript);
            isListening = false;
            stopListening();
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service ended. Restarting...');
        recognition.start();
    };

    // --- TEXT TO SPEECH (TTS) SETUP ---
    let femaleVoice = null;

    // Load voices and find a female one
    function loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        femaleVoice = voices.find(voice => voice.name.includes('Female') && voice.lang.startsWith('en'));
        if (!femaleVoice) {
             // Fallback to the first available US English voice if no "Female" voice is found
            femaleVoice = voices.find(voice => voice.lang === 'en-US');
        }
        console.log("Selected voice:", femaleVoice ? femaleVoice.name : "Default");
    }

    // Voices are loaded asynchronously, so we need to wait for them.
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Call it once to try immediately

    // Function to speak the AI's response
    function speak(text) {
        if (!femaleVoice) {
            console.warn("Female voice not ready yet. Using default.");
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = femaleVoice; // Assign the selected female voice
        utterance.pitch = 1;
        utterance.rate = 1;

        utterance.onstart = () => {
            console.log("Started speaking.");
            startTalking(); // Start animation when speech begins
        };

        utterance.onend = () => {
            console.log("Finished speaking.");
            stopTalking(); // Stop animation when speech is done
        };
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            stopTalking(); // Also stop animation on error
        };
        window.speechSynthesis.speak(utterance);
    }

    // --- MAIN LOGIC ---
    async function processCommand(command) {
        console.log(`Sending command: "${command}"`);
        const aiResponse = await sendMessageToAI(command); // from api.js
        speak(aiResponse);
    }

    // Start listening for the first time
    recognition.start();
}