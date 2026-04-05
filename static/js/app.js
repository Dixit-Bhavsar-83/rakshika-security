// Typing Animation for Splash
const text = "Protecting you anytime, anywhere...";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    } else {
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            checkPermissions();
        }, 1000);
    }
}
window.onload = typeWriter;

function checkPermissions() {
    if (!localStorage.getItem('rakshika_perms')) {
        document.getElementById('permission-modal').classList.remove('hidden');
    }
}

function requestPermissions() {
    Promise.all([
        navigator.mediaDevices.getUserMedia({ audio: true }),
        navigator.geolocation.getCurrentPosition(() => {})
    ]).then(() => {
        localStorage.setItem('rakshika_perms', 'true');
        document.getElementById('permission-modal').classList.add('hidden');
    }).catch(err => alert("Permissions are required for safety features."));
}