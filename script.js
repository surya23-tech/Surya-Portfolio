/* ===========================
   AOS Animation
=========================== */

AOS.init({
    duration:1000,
    once:true
});

/* ===========================
   Typing Animation
=========================== */

const badgeText = document.getElementById("hero-badge-text");
const badgePhrase = "ASPIRING CLOUD ENGINEER";
let badgeIndex = 0;
let badgeDeleting = false;

function badgeTypeEffect(){
    if(!badgeText) return;
    if(!badgeDeleting){
        badgeText.textContent = badgePhrase.substring(0, badgeIndex + 1);
        badgeIndex += 1;
        if(badgeIndex === badgePhrase.length){
            badgeDeleting = true;
            setTimeout(badgeTypeEffect, 1200);
            return;
        }
    } else {
        badgeIndex -= 1;
        if(badgeIndex < 0) badgeIndex = 0;
        badgeText.textContent = badgePhrase.substring(0, badgeIndex);
        if(badgeIndex === 0){
            badgeDeleting = false;
        }
    }
    setTimeout(badgeTypeEffect, badgeDeleting ? 80 : 120);
}

badgeTypeEffect();

/* ===========================
   Dark Mode
=========================== */

const themeBtn =
document.getElementById("theme-toggle");

// Restore theme preference
(function(){
    const stored = localStorage.getItem('theme');
    if(stored === 'dark'){
        document.body.classList.add('dark');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeBtn.setAttribute('aria-pressed','true');
    }else{
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeBtn.setAttribute('aria-pressed','false');
    }
})();

themeBtn.onclick = () => {

const pressed = themeBtn.getAttribute('aria-pressed') === 'true';
const willDark = !pressed;

themeBtn.setAttribute('aria-pressed', willDark.toString());

if(willDark){
    document.body.classList.add('dark');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('theme','dark');
}else{
    document.body.classList.remove('dark');
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme','light');
}

};

/* ===========================
   Scroll To Top
=========================== */

const scrollBtn =
document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

scrollBtn.classList.add("active");

}else{

scrollBtn.classList.remove("active");

}

});

scrollBtn.onclick = ()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ===========================
   Mobile Menu
   - Premium slide-in drawer for mobile
   - Uses .active class for visibility
=========================== */

const menu = document.getElementById('menu-btn');
const drawer = document.getElementById('mobile-drawer');
const drawerClose = document.querySelector('.drawer-close');

function openDrawer(){
    if(!drawer) return;
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
}

function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(menu) menu.setAttribute('aria-expanded','false');
}

if(menu){
    menu.addEventListener('click', (e)=>{
        e.stopPropagation();
        const isActive = drawer && drawer.classList.contains('active');
        if(isActive){
            closeDrawer();
        } else {
            openDrawer();
            menu.setAttribute('aria-expanded','true');
        }
    });
}

if(drawerClose){
    drawerClose.addEventListener('click', (e)=>{
        e.stopPropagation();
        closeDrawer();
    });
}

if(drawer){
    drawer.addEventListener('click', (event)=>{
        if(event.target === drawer){
            closeDrawer();
        }
    });
}

if(drawer){
    const drawerLinks = drawer.querySelectorAll('.drawer-nav a');
    drawerLinks.forEach(link=>{
        link.addEventListener('click', (e)=>{
            e.stopPropagation();
            closeDrawer();
        });
    });
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && drawer && drawer.classList.contains('active')){
        closeDrawer();
    }
});

/* ===========================
   Subtitle Pills
=========================== */
(function setupPills(){
    const pillsContainer = document.getElementById('subtitle-pills');
    if(!pillsContainer) return;
    const items = ['Cloud Engineer', 'Java Developer', 'AI Enthusiast'];
    items.forEach((text, index)=>{
        const pill = document.createElement('div');
        pill.className = 'pill' + (index === 0 ? ' active' : '');
        pill.textContent = text;
        pillsContainer.appendChild(pill);
    });
    let current = 0;
    setInterval(()=>{
        const pills = pillsContainer.querySelectorAll('.pill');
        pills.forEach((pill, index)=>pill.classList.toggle('active', index === current));
        current = (current + 1) % pills.length;
    }, 2400);
})();

/* ===========================
   Active Navigation
=========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top =
section.offsetTop-150;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ===========================
   Smooth Fade for Cards
=========================== */

const cards =
document.querySelectorAll(
".project-card,.skill-card,.achievement-card,.info-box"
);

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

observer.observe(card);

});

const EMAILJS_PUBLIC_KEY = 'o-oWn7Y3utbPRMf9T';
const EMAILJS_SERVICE_ID = 'service_0522jzm';
const EMAILJS_TEMPLATE_ID = 'template_cwdpn57';

// Initialize EmailJS with v4 API format
function initializeEmailJS(){
    if(typeof emailjs !== 'undefined'){
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
        console.log('✓ EmailJS v4 initialized successfully with public key:', EMAILJS_PUBLIC_KEY);
    } else {
        console.error('✗ EmailJS library not available. CDN may not have loaded.');
    }
}

// Initialize when page loads to ensure CDN is ready
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
    initializeEmailJS();
}

function updateFormStatus(message, type = 'info'){
    const status = document.getElementById('form-status');
    if(!status) return;
    status.style.display = 'block';
    status.textContent = message;
    status.className = 'form-status ' + type;
}

function setupContactForm(){
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('contact-submit');

    if(!contactForm){
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if(submitButton) submitButton.disabled = true;
        updateFormStatus('Sending message...', 'pending');

        try {
            // Map form fields to EmailJS template variables
            const templateParams = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                message: document.getElementById('contact-message').value
            };

            console.log('Sending with params:', templateParams);

            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('Email sent successfully:', response);
            updateFormStatus('✓ Message sent successfully. Thank you!', 'success');
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                const status = document.getElementById('form-status');
                if(status) status.style.display = 'none';
            }, 5000);
        } catch(error) {
            console.error('EmailJS error object:', error);
            
            // Extract detailed error message
            let errorMessage = 'Failed to send message. ';
            if(error.text) {
                errorMessage += error.text;
            } else if(error.message) {
                errorMessage += error.message;
            } else if(error.status) {
                errorMessage += `Error status: ${error.status}`;
            } else {
                errorMessage += 'Please check your connection and try again.';
            }
            
            console.error('Formatted error:', errorMessage);
            updateFormStatus('✗ ' + errorMessage, 'error');
        } finally {
            if(submitButton) submitButton.disabled = false;
        }
    });
}

// Initialize when page is ready
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
    setupContactForm();
}

/* ===========================
   Centralized GitHub Button Configuration
   - Change repository URLs below in one place to enable buttons.
   - If a value is empty or omitted, the button will be disabled and show "Coming Soon".
*/

const PROJECT_REPOS = {
    // Paste your repository URLs here. Example:
    // smartcart: 'https://github.com/youruser/smartcart',
    smartcart: '',
    restaurant: '',
    moviefinder: '',
    farmer: ''
};

function configureGitHubButtons(){
    const buttons = document.querySelectorAll('.github-btn');
    buttons.forEach(btn=>{
        const key = btn.dataset.project;
        const url = (PROJECT_REPOS[key] || '').trim();
        const icon = '<i class="fab fa-github" aria-hidden="true"></i>';

        if(url){
            btn.setAttribute('href', url);
            btn.setAttribute('target', '_blank');
            btn.setAttribute('rel', 'noopener');
            btn.setAttribute('title', 'View Repository');
            btn.classList.remove('disabled');
            btn.removeAttribute('aria-disabled');
            btn.innerHTML = icon + ' GitHub';
        }else{
            // Disable the button and show Coming Soon
            btn.setAttribute('href', '#');
            btn.setAttribute('title', 'Repository will be uploaded soon.');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.add('disabled');
            btn.innerHTML = icon + ' Coming Soon';
        }
    });
}

// Run immediately (script is loaded at end of body so DOM is ready)
configureGitHubButtons();
