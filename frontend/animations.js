// frontend/animations.js (New SVG Version)

const wave = document.querySelector("#waveform path");

// Define the different shapes for our wave as SVG path data
const idlePath = "M 0 50 Q 75 50 150 50 T 300 50"; // A flat line
const listeningPath = "M 0 50 Q 75 20 150 50 T 300 50"; // A single gentle bump
const talkingPath1 = "M 0 50 Q 75 10 150 50 T 300 50"; // Higher bump
const talkingPath2 = "M 0 50 Q 75 90 150 50 T 300 50"; // Lower dip

let talkingAnimation = null; // To store the GSAP timeline

// IDLE ANIMATION
const idleAnimation = () => {
    gsap.to(wave, {
        duration: 2,
        attr: { d: listeningPath }, // Morph to the listening path
        ease: "power1.inOut",
        yoyo: true, // Animate back and forth
        repeat: -1, // Repeat forever
    });
};

// LISTENING ANIMATION
const startListening = () => {
    // Kill any ongoing animation
    if (talkingAnimation) talkingAnimation.kill();
    gsap.killTweensOf(wave);

    gsap.to(wave, {
        duration: 0.5,
        attr: { d: "M 0 50 Q 75 0 150 50 T 300 50" }, // Taller, more attentive bump
        ease: "elastic.out(1, 0.3)",
    });
};

const stopListening = () => {
    gsap.killTweensOf(wave);
    gsap.to(wave, {
        duration: 0.5,
        attr: { d: idlePath },
        ease: "power1.inOut",
        onComplete: idleAnimation // Return to idle state
    });
};

// TALKING ANIMATION
const startTalking = () => {
    if (talkingAnimation) talkingAnimation.kill();
    gsap.killTweensOf(wave);

    // Create a timeline for a more complex talking animation
    talkingAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    talkingAnimation
        .to(wave, { duration: 0.2, attr: { d: talkingPath1 }, ease: "power2.inOut" })
        .to(wave, { duration: 0.3, attr: { d: talkingPath2 }, ease: "power2.inOut" })
        .to(wave, { duration: 0.2, attr: { d: listeningPath }, ease: "power2.inOut" });
};

const stopTalking = () => {
    if (talkingAnimation) talkingAnimation.kill();
    gsap.killTweensOf(wave);
    gsap.to(wave, {
        duration: 1,
        attr: { d: idlePath },
        ease: "elastic.out(1, 0.3)",
        onComplete: idleAnimation // Go back to idle when done
    });
};

// Start the initial idle animation
idleAnimation();