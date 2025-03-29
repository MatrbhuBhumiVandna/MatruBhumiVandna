document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for admin
    const menuToggle = document.querySelector('.menu-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    
    if (menuToggle && adminSidebar) {
        menuToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('active');
        });
    }
    
    // Form submission handling for admin login
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically validate and send login data to server
            window.location.href = 'dashboard.html';
        });
    }
    
    // Simulate loading data for dashboard
    if (document.querySelector('.admin-dashboard')) {
        // You would typically fetch real data from an API here
        console.log('Loading dashboard data...');
    }
});
