// DOM Elements
const header = document.querySelector("header");
const menu = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const darkmode = document.querySelector("#darkmode");
const loader = document.querySelector("#loader");
const navLinks = document.querySelectorAll(".navbar a");
const certificateImages = document.querySelectorAll('.certificate-image');
const certificatePopup = document.querySelector('#certificate-popup');
const popupImage = document.querySelector('#popup-image');
const closePopup = document.querySelector('.close-popup');

// Project Data
const projects = [
    {
        id: 1,
        title: "DocZap",
        description: "Patient portal with separate login for booking appointments, managing profiles, and accessing medical records, integrated with Razorpay for secure payments.",
        category: "web",
        tags: ["React", "Node.js", "MongoDB", "Express", "Cloudinary", "JWT", "Razorpay"],
        icon: "bx-clinic",
        github: "https://github.com/PETCHIVARADHAN2005/DocZap.git",
        demo: "#"
    },
    {
        id: 2,
        title: "Doctor Centric Portal",
        description: "A comprehensive hospital management system enabling doctors to manage profiles, appointments, digital prescriptions, and more. Built with the MERN stack and SQL integration.",
        category: "web",
        tags: ["React", "Node.js", "MySQL", "Express", "Cloudinary", "JWT"],
        icon: "bx-plus-medical",
        github: "https://github.com/PETCHIVARADHAN2005/ACC.git",
        demo: "#"
    },
    {
        id: 3,
        title: "Grocery Store Management System",
        description: "A Java Swing-based desktop application for grocery store operations, featuring CRUD functionality for products, sales tracking, billing, and PostgreSQL integration for persistent data storage.",
        category: "desktop",
        tags: ["Java", "Swing", "PostgreSQL"],
        icon: "bx-store",
        github: "https://github.com/PETCHIVARADHAN2005/grocery-java.git",
        demo: "#"
    },
    {
        id: 4,
        title: "Sololearn Replica",
        description: "A web-based learning platform inspired by Sololearn, featuring user authentication, interactive courses, quizzes, and progress tracking. Built using modern web technologies for an engaging learning experience.",
        category: "web",
        tags: ["HTML", "CSS", "JavaScript"],
        icon: "bx-book-open",
        github: "https://github.com/PETCHIVARADHAN2005/Sololearn.git",
        demo: "#"
    }
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeNavigation();
    initializeDarkMode();
    initializeScrollAnimations();
    initializeProjects();
    initializeTypingEffect();
    initializeContactForm();
    initializeCertificatePopup();
});

// Loader
function initializeLoader() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initializeNavigation() {
    // Header shadow on scroll
    window.addEventListener("scroll", () => {
        header.classList.toggle("shadow", window.scrollY > 0);
        updateActiveNavLink();
    });

    // Mobile menu toggle
    menu.addEventListener('click', () => {
        navbar.classList.toggle("active");
        menu.classList.toggle("bx-x");
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove("active");
            menu.classList.remove("bx-x");
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menu.contains(e.target)) {
            navbar.classList.remove("active");
            menu.classList.remove("bx-x");
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Dark Mode
function initializeDarkMode() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('active');
        darkmode.classList.replace('bx-moon', 'bx-sun');
    }

    darkmode.addEventListener('click', () => {
        if (darkmode.classList.contains("bx-moon")) {
            darkmode.classList.replace("bx-moon", "bx-sun");
            document.body.classList.add("active");
            localStorage.setItem('theme', 'dark');
        } else {
            darkmode.classList.replace("bx-sun", "bx-moon");
            document.body.classList.remove("active");
            localStorage.setItem('theme', 'light');
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
}

// Projects
function initializeProjects() {
    renderProjects(projects);
    initializeProjectFilters();
}

function renderProjects(projectList) {
    const projectsContainer = document.querySelector('.projects-container');
    projectsContainer.innerHTML = '';

    projectList.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.category}`;
    card.innerHTML = `
        <div class="project-img">
            <i class="bx ${project.icon}"></i>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" class="project-link" target="_blank">
                    <i class="bx bxl-github"></i>
                </a>
                <a href="${project.demo}" class="project-link" target="_blank">
                    <i class="bx bx-link-external"></i>
                </a>
            </div>
        </div>
    `;
    return card;
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Certificate Popup
function initializeCertificatePopup() {
    certificateImages.forEach(image => {
        image.addEventListener('click', () => {
            const largeImageSrc = image.getAttribute('data-large-image');
            popupImage.src = largeImageSrc;
            certificatePopup.classList.add('active');
        });
    });

    closePopup.addEventListener('click', () => {
        certificatePopup.classList.remove('active');
        popupImage.src = '';
    });

    // Close popup when clicking outside the image
    certificatePopup.addEventListener('click', (e) => {
        if (e.target === certificatePopup) {
            certificatePopup.classList.remove('active');
            popupImage.src = '';
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certificatePopup.classList.contains('active')) {
            certificatePopup.classList.remove('active');
            popupImage.src = '';
        }
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const text = 'Petchivaradhan';
    let index = 0;
    let isDeleting = false;

    function type() {
        if (isDeleting) {
            typingText.textContent = text.substring(0, index - 1);
            index--;
        } else {
            typingText.textContent = text.substring(0, index + 1);
            index++;
        }

        if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
        }

        setTimeout(type, isDeleting ? 100 : 150);
    }

    type();
}

// Contact Form
function initializeContactForm() {
    const form = document.querySelector('.contact-form form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Update button state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22cf91' : '#ff6b6b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home-img');
    if (homeImg) {
        homeImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add interactive hover effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .certificate-card, .contact-item');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }
    });
});

// Reset card transforms when mouse leaves
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.project-card, .certificate-card, .contact-item');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// Initialize everything
console.log('Portfolio loaded successfully! 🚀');