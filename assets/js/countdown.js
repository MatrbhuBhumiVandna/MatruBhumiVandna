// Countdown Timer for Janta Raja Natak 2025
function updateCountdown() {
    const eventDate = new Date('May 2, 2025 20:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
    
    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('countdown').innerHTML = "The event has started!";
    }
}

// Update the countdown every 1 second
const countdownTimer = setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();
