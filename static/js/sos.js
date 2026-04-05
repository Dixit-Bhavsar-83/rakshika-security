const sosBtn = document.getElementById('sos-btn');
const alarm = document.getElementById('sos-alarm');

if(sosBtn) {
    sosBtn.addEventListener('click', () => {
        triggerSOS();
    });
}

function triggerSOS() {
    const alarm = document.getElementById('sos-alarm'); // Make sure ID matches your HTML
    if(alarm) alarm.play();
    
    document.body.style.backgroundColor = "#220000";
    alert("SOS ACTIVATED!");
    
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            // SAHI TARIKA:
            const transcript = event.results.transcript; 
            console.log("Recorded: ", transcript);
        };
    }
}

function triggerFakeCall() {
    alert("Incoming Call: Papa. Playing audio...");
    const audio = new Audio('/static/audio/papa.mp3');
    audio.play();
}