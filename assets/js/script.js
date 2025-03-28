// assets/js/script.js

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
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown-container').innerHTML = '<div class="event-ended">The event has started!</div>';
        }
    }, 1000);
    
    // Patriots data (in a real app, this would come from an API)
    const patriots = [
        {
            name: "Bhagat Singh",
            image: "assets/images/patriots/bhagat-singh.jpg",
            info: "Revolutionary who fought against British rule and sacrificed his life for India's independence at the age of 23."
        },
        {
            name: "Rani Lakshmibai",
            image: "assets/images/patriots/rani-lakshmibai.jpg",
            info: "The Queen of Jhansi who became a symbol of resistance to British rule during the Indian Rebellion of 1857."
        },
        {
            name: "Subhash Chandra Bose",
            image: "assets/images/patriots/netaji.jpg",
            info: "Founder of the Indian National Army who fought for India's independence with the slogan 'Give me blood and I will give you freedom'."
        },
        {
            name: "Sardar Patel",
            image: "assets/images/patriots/sardar-patel.jpg",
            info: "India's first Deputy Prime Minister who played a key role in the country's struggle for independence and political integration."
        },
        {
            name: "Chandrashekhar Azad",
            image: "assets/images/patriots/chandrashekhar-azad.jpg",
            info: "Revolutionary who reorganised the Hindustan Republican Association and fought against British rule."
        },
        {
            name: "Mahatma Gandhi",
            image: "assets/images/patriots/mahatma-gandhi.jpg",
            info: "Leader of the Indian independence movement who employed nonviolent resistance to lead India to independence."
        }
    ];
    
    // Load patriots into the grid
    const patriotsGrid = document.querySelector('.patriots-grid');
    if (patriotsGrid) {
        patriots.forEach(patriot => {
            const patriotCard = document.createElement('div');
            patriotCard.className = 'patriot-card';
            patriotCard.innerHTML = `
                <div class="patriot-image">
                    <img src="${patriot.image}" alt="${patriot.name}">
                </div>
                <div class="patriot-info">
                    <h3>${patriot.name}</h3>
                    <p>${patriot.info}</p>
                </div>
            `;
            patriotsGrid.appendChild(patriotCard);
        });
    }
    
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
});
