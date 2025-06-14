document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Clear previous status messages
      formStatus.innerHTML = '';
      formStatus.className = '';
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Collect form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        website: document.getElementById('website').value 
      };
      
      try {
        const backendUrl = 'https://main-52w5.onrender.com/api/contact';
        
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Success! Redirect to thanks page
          window.location.href = '../thanks/index.html';
        } else {
          // Server returned an error
          formStatus.textContent = result.error || 'Something went wrong. Please try again.';
          formStatus.className = 'error';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Network error. Please check your connection and try again.';
        formStatus.className = 'error';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
});