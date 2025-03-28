// Function to load JSON data
async function loadData(file) {
    const response = await fetch(`assets/data/${file}`);
    return await response.json();
}

// Function to save JSON data
async function saveData(file, data) {
    await fetch(`assets/data/${file}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

// Function to update page content
async function updatePageContent() {
    // Load data from JSON files
    const aboutData = await loadData('about.json');
    const eventsData = await loadData('events.json');
    const patriotsData = await loadData('patriots.json');
    
    // Update about page
    if (document.querySelector('.about-section')) {
        document.getElementById('about-vision').textContent = aboutData.vision;
        document.getElementById('about-mission').textContent = aboutData.mission;
        document.getElementById('about-values').textContent = aboutData.values;
    }
    
    // Update events page
    if (document.querySelector('.event-details')) {
        document.querySelector('.event-details h2').textContent = eventsData.title;
        document.querySelector('.event-date').textContent = eventsData.dates;
        document.querySelector('.event-details p').textContent = eventsData.description;
        
        // Update tickets table
        const ticketsTable = document.querySelector('.tickets-table table tbody');
        ticketsTable.innerHTML = '';
        eventsData.tickets.forEach(ticket => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${ticket.category}</td><td>${ticket.price}</td>`;
            ticketsTable.appendChild(row);
        });
    }
    
    // Update patriots gallery
    if (document.querySelector('.patriots-grid')) {
        const patriotsGrid = document.querySelector('.patriots-grid');
        patriotsGrid.innerHTML = '';
        patriotsData.forEach(patriot => {
            const card = document.createElement('div');
            card.className = 'patriot-card';
            card.innerHTML = `
                <div class="patriot-image">
                    <img src="${patriot.image}" alt="${patriot.name}">
                </div>
                <div class="patriot-info">
                    <h3>${patriot.name}</h3>
                    <p>${patriot.info}</p>
                </div>
            `;
            patriotsGrid.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add shadow to header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Countdown timer
    const countdownDate = new Date('May 2, 2025 20:00:00').getTime();
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
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
            clearInterval(countdown);
            if (document.querySelector('.countdown-container')) {
                document.querySelector('.countdown-container').innerHTML = '<div class="event-ended">The event has started!</div>';
            }
        }
    }, 1000);
    
    // Admin login modal
    const adminLoginLink = document.getElementById('admin-login-link');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (adminLoginLink && adminLoginModal) {
        adminLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            adminLoginModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', function() {
            adminLoginModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === adminLoginModal) {
                adminLoginModal.style.display = 'none';
            }
        });
        
        // Admin login form
        const adminLoginForm = document.getElementById('admin-login-form');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                if (username === 'admin' && password === 'admin') {
                    window.location.href = 'site-admin.html';
                } else {
                    alert('Invalid username or password');
                }
            });
        }
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Initialize page content
    updatePageContent();
});
