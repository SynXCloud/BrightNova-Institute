import os

css_content = """
/* Resources Section */
.resources-section {
    background: var(--surface);
    padding: 100px 0;
}

.resources-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.resource-card {
    background: var(--card);
    padding: 40px 30px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s, box-shadow 0.3s;
}

.resource-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    border-color: var(--secondary);
}

.resource-card.locked {
    opacity: 0.6;
}

.resource-card.locked:hover {
    transform: none;
    box-shadow: none;
    border-color: rgba(255,255,255,0.05);
}

.res-icon {
    font-size: 3rem;
    color: var(--secondary);
    margin-bottom: 20px;
}

.resource-card h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--text-primary);
}

.resource-card p {
    color: var(--text-muted);
    margin-bottom: 25px;
    font-size: 0.95rem;
}

/* Contact Section */
.contact-section {
    background: var(--bg-dark);
    padding: 100px 0;
}

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 50px;
    background: var(--card);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
}

.contact-info-panel {
    background: linear-gradient(135deg, rgba(245, 166, 35, 0.1), transparent);
    padding: 50px;
    border-right: 1px solid rgba(255,255,255,0.05);
}

.contact-info-panel h3 {
    font-size: 1.8rem;
    color: var(--primary);
    margin-bottom: 20px;
}

.contact-info-panel p {
    color: var(--text-muted);
    margin-bottom: 40px;
    line-height: 1.6;
}

.contact-list {
    list-style: none;
}

.contact-list li {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    color: var(--text-primary);
}

.contact-list i {
    color: var(--secondary);
    font-size: 1.2rem;
    width: 25px;
    text-align: center;
}

.contact-form-container {
    padding: 50px;
}

@media (max-width: 992px) {
    .resources-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-wrapper { grid-template-columns: 1fr; }
    .contact-info-panel { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
}

@media (max-width: 768px) {
    .resources-grid { grid-template-columns: 1fr; }
    .contact-info-panel, .contact-form-container { padding: 30px; }
}
"""

js_content = """
// Contact Form Logic
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            document.getElementById('contactSuccess').style.display = 'block';
            btn.innerHTML = originalText;
            btn.disabled = false;
            contactForm.reset();
            
            // Gamification
            addXP(20, "Contacted Support");
            
            setTimeout(() => {
                document.getElementById('contactSuccess').style.display = 'none';
            }, 5000);
        }, 1500);
    });
}
"""

with open('assets/css/style.css', 'a') as f:
    f.write(css_content)

with open('assets/js/main.js', 'a') as f:
    f.write(js_content)

print("Appended CSS and JS successfully.")
