// Navigation mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Chargement des compétences
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });
});

// Charger les compétences depuis le localStorage ou une API
function loadSkills() {
    const skillCategories = document.querySelector('.skill-categories');
    if (!skillCategories) return;
    
    // Exemple de données - en pratique, vous pourriez les charger depuis une API
    const skills = {
        "Technique": [
            { name: "HTML", level: 90 },
            { name: "CSS", level: 85 },
            { name: "JavaScript", level: 80 },
            { name: "React", level: 75 }
        ],
        "Professionnelle": [
            { name: "Communication", level: 85 },
            { name: "Travail d'équipe", level: 90 },
            { name: "Gestion de projet", level: 75 }
        ]
    };
    
    // Créer les catégories de compétences
    for (const [category, skillsList] of Object.entries(skills)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        skillsList.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            
            const skillName = document.createElement('div');
            skillName.className = 'skill-name';
            skillName.innerHTML = `<span>${skill.name}</span><span>${skill.level}%</span>`;
            
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            
            const skillProgress = document.createElement('div');
            skillProgress.className = 'skill-progress';
            skillProgress.style.width = `${skill.level}%`;
            
            skillBar.appendChild(skillProgress);
            skillItem.appendChild(skillName);
            skillItem.appendChild(skillBar);
            categoryDiv.appendChild(skillItem);
        });
        
        skillCategories.appendChild(categoryDiv);
    }
}

// Charger les projets
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Exemple de données 
    const projects = [
        {
            id: 1,
            title: "Site Web  Guide Régional Interactif avec les villes ",
            category: "web",
            description: `un site web dynamique permettant de découvrir les richesses 
culturelles et touristiques des Villes proposées : Essaouira ou Tinghir`,
            image: "assets/project1.jpg",
            link: "#"
        },
       
    ];
    
    // Afficher les projets
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = project.category;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <span class="project-category">${project.category}</span>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.link}" target="_blank">Voir le projet</a>
                    <a href="#" class="details-link">Détails</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Filtrer les projets
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Gérer l'envoi du formulaire de contact
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Ici, vous enverriez normalement les données à un serveur
    console.log('Données du formulaire:', data);
    
    // Afficher un message de succès
    alert('Merci pour votre message! Je vous répondrai dès que possible.');
    
    // Réinitialiser le formulaire
    form.reset();
}