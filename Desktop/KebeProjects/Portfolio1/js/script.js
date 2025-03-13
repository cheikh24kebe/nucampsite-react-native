// Custom Cursor
const cursor = document.querySelector('.mouse-follower');
let cursorVisible = false;

const moveCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.transform = `translate(${x - 16}px, ${y - 16}px)`;

    if (!cursorVisible) {
        cursorVisible = true;
        cursor.style.opacity = 1;
    }
};

document.addEventListener('mousemove', moveCursor);
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
    cursorVisible = false;
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    setTheme(isDark);
});

// Initial theme
setTheme(prefersDark.matches);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Function to scroll to a section and switch the active tab
function scrollToCertificatesTab() {
    // Scroll to the tabbed section
    document.getElementById("tabbed-section").scrollIntoView({
        behavior: "smooth"
    });

    // Switch to the Certificates tab
    setTimeout(() => {
        const tabButtons = document.querySelectorAll(".tab-button");
        const tabPanes = document.querySelectorAll(".tab-pane");

        // Remove active class from all tabs and panes
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanes.forEach(pane => pane.classList.remove("active"));

        // Activate the Certificates tab
        const certificatesButton = document.querySelector('.tab-button[data-tab="certificates"]');
        const certificatesPane = document.getElementById("certificates");

        if (certificatesButton && certificatesPane) {
            certificatesButton.classList.add("active");
            certificatesPane.classList.add("active");
        }
    }, 300); // Delay to allow smooth scrolling
}

function scrollToProjectsTab() {
    // Scroll to the tabbed section
    document.getElementById("tabbed-section").scrollIntoView({
        behavior: "smooth"
    });

    // Switch to the Projects tab
    setTimeout(() => {
        const tabButtons = document.querySelectorAll(".tab-button");
        const tabPanes = document.querySelectorAll(".tab-pane");

        // Remove active class from all tabs and panes
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanes.forEach(pane => pane.classList.remove("active"));

        // Activate the Projects tab
        const projectsButton = document.querySelector('.tab-button[data-tab="projects"]');
        const projectsPane = document.getElementById("projects");

        if (projectsButton && projectsPane) {
            projectsButton.classList.add("active");
            projectsPane.classList.add("active");
        }
    }, 300); // Delay to allow smooth scrolling
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skills Animation
function animateSkills() {
    const skills = document.querySelectorAll('.progress');
    skills.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = width;
        }, 100);
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to the clicked button and corresponding pane
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("projects-card").addEventListener("click", function () {
        document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    });
});
