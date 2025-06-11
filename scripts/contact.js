document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.querySelector('.submit-btn');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Reset status message
      if (formStatus) formStatus.innerHTML = '';
      
      // Disable submit button to prevent multiple submissions
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Collect form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim(),
        website: document.getElementById('website').value // Honeypot field
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
        
        if (result.success) {
          // Success
          if (formStatus) {
            formStatus.innerHTML = '<div class="success-message">Thank you! Your message has been sent successfully.</div>';
          }
          contactForm.reset();
        } else {
          // Error
          if (formStatus) {
            formStatus.innerHTML = `<div class="error-message">${result.error || 'Something went wrong. Please try again.'}</div>`;
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        if (formStatus) {
          formStatus.innerHTML = '<div class="error-message">Failed to send message. Please try again later.</div>';
        }
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
  }
});
