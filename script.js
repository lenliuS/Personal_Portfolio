// ===== TYPING EFFECT =====
const words = ["Creatively", "Accessibly", "Thoughtfully", "With Passion"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300; // Pause before typing next
    }

    setTimeout(typeEffect, speed);
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", typeEffect);

// ===== MOBILE NAVIGATION TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle?.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navLinks.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle?.setAttribute("aria-expanded", "false");
        navLinks?.classList.remove("active");
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const successMsg = document.getElementById("form-success");

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMsg.hidden = true;

    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = "Please enter your name";
        isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
        emailError.textContent = "Please enter your email";
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
        messageError.textContent = "Please write your message";
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Message should be at least 10 characters";
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        successMsg.hidden = false;
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMsg.hidden = true;
        }, 5000);
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("back-to-top");

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== SKILL BARS ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll(".skill-level");
const skillsSection = document.getElementById("skills");

const animateSkillBars = () => {
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
        skillBars.forEach(bar => {
            // Trigger the transition by ensuring width is set
            bar.style.width = getComputedStyle(bar).getPropertyValue("--level");
        });
        window.removeEventListener("scroll", animateSkillBars);
    }
};

window.addEventListener("scroll", animateSkillBars);
// Check once in case already in view
document.addEventListener("DOMContentLoaded", animateSkillBars);

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

