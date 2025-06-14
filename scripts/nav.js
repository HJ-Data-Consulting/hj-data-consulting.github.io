document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    
    toggleButton.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.classList.remove('active');
        });
    });
});

