// Load header and footer
function loadHeaderFooter() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            // Initialize mobile menu
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    hamburger.innerHTML = navMenu.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            // Set current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // Admin login link event
            const adminLoginLink = document.getElementById('adminLoginLink');
            if (adminLoginLink) {
                adminLoginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('adminModal').style.display = 'block';
                });
            }
            
            // Modal functionality
            const modal = document.getElementById('adminModal');
            const closeBtn = document.querySelector('.close');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Admin login form
            const adminLoginForm = document.getElementById('adminLoginForm');
            if (adminLoginForm) {
                adminLoginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    
                    if (username === 'admin' && password === 'admin6007') {
                        window.location.href = 'admin.html';
                        modal.style.display = 'none';
                    } else {
                        alert('Invalid credentials! Please try again.');
                    }
                });
            }
        });
}

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('May 2, 2025 20:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (document.getElementById('days')) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        if (document.getElementById('days')) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
}

// Load patriots data
function loadPatriots() {
    const patriotsGrid = document.querySelector('.patriots-grid');
    if (patriotsGrid) {
        // In a real implementation, this would fetch from an API or database
        const patriots = [
            {
                name: "Bhagat Singh",
                description: "Revolutionary who sacrificed his life for India's independence at the age of 23.",
                image: "assets/images/patriots/bhagat-singh.jpg"
            },
            {
                name: "Rani Lakshmibai",
                description: "The Queen of Jhansi who became a symbol of resistance against British rule.",
                image: "assets/images/patriots/rani-lakshmibai.jpg"
            },
            {
                name: "Subhash Chandra Bose",
                description: "Founded the Indian National Army to overthrow British rule in India.",
                image: "assets/images/patriots/subhash-bose.jpg"
            }
        ];
        
        patriotsGrid.innerHTML = patriots.map(patriot => `
            <div class="patriot-card">
                <img src="${patriot.image}" alt="${patriot.name}">
                <h3>${patriot.name}</h3>
                <p>${patriot.description}</p>
            </div>
        `).join('');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    loadPatriots();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
