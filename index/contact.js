document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const responseMsg = document.getElementById('response-msg');
    const button = this.querySelector('button');

    button.innerText = "Sending...";
    button.disabled = true;

    // EmailJS দিয়ে ইমেইল পাঠানো
    emailjs.send("service_f70xmbb", "template_w5ezoml", {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    })
    .then(function() {
        responseMsg.innerHTML = "✅ Thank you, Aranna! Message sent successfully.";
        responseMsg.style.color = "#00ffcc";
        document.getElementById('contactForm').reset();
        button.innerText = "Send Message";
        button.disabled = false;
    }, function(error) {
        responseMsg.innerHTML = "❌ Failed to send message. Please try again.";
        responseMsg.style.color = "#ff4d4d";
        button.innerText = "Send Message";
        button.disabled = false;
    });
});