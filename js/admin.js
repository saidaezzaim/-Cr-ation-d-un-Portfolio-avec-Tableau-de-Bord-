document.addEventListener('DOMContentLoaded', () => {
    // Vérifier l'authentification
    if (!isAuthenticated() && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }
    
    // Charger les données du tableau de bord
    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardData();
    }
    
    // Gérer l'édition de contenu
    if (window.location.pathname.includes('edit-content.html')) {
        setupEditContent();
    }
    
    // Gérer la déconnexion
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Vérifier si l'utilisateur est authentifié
function isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
}

// Charger les données du tableau de bord
function loadDashboardData() {
    // Ici, vous pourriez faire une requête à une API
    // Pour cet exemple, nous utilisons des données simulées
    
    // Nombre de projets
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    document.getElementById('projects-count').textContent = projects.length;
    
    // Messages (simulés)
    const messages = [
        { name: "Ali haddi", email: "ali@example.com", subject: "Collaboration", date: "2023-05-15" },
        { name: "Sami Lmrabt", email: "Sami@example.com", subject: "Question", date: "2023-05-10" }
    ];
    
    const messagesTable = document.getElementById('messages-table');
    messages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.subject}</td>
            <td>${message.date}</td>
        `;
        messagesTable.appendChild(row);
    });
}

// Configurer la page d'édition de contenu
function setupEditContent() {
    // Détecter la section à éditer à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section') || 'profile';
    
    // Afficher la section appropriée
    document.getElementById('profile-edit').style.display = section === 'profile' ? 'block' : 'none';
    document.getElementById('projects-edit').style.display = section === 'projects' ? 'block' : 'none';
    document.getElementById('skills-edit').style.display = section === 'skills' ? 'block' : 'none';
    
    // Mettre à jour le titre
    document.getElementById('edit-title').textContent = 
        section === 'profile' ? 'Modifier le profil' : 
        section === 'projects' ? 'Gérer les projets' : 'Gérer les compétences';
    
    // Charger les données du profil
    if (section === 'profile') {
        loadProfileData();
        setupProfileForm();
    }
    
    // Charger les projets
    if (section === 'projects') {
        loadProjectsList();
        setupProjectForm();
    }
    
    // Charger les compétences
    if (section === 'skills') {
        loadSkillsData();
        setupSkillsForm();
    }
}

// Charger les données du profil
function loadProfileData() {
    const profile = JSON.parse(localStorage.getItem('profile')) || {
        name: "Votre Nom",
        title: "Votre Titre",
        bio: "Une brève biographie...",
        email: "email@example.com",
        phone: "+123 456 7890",
        location: "Ville, Pays"
    };
    
    document.getElementById('edit-name').value = profile.name;
    document.getElementById('edit-title').value = profile.title;
    document.getElementById('edit-bio').value = profile.bio;
    document.getElementById('edit-email').value = profile.email;
    document.getElementById('edit-phone').value = profile.phone;
    document.getElementById('edit-location').value = profile.location;
}

// Configurer le formulaire du profil
function setupProfileForm() {
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const profile = {
            name: document.getElementById('edit-name').value,
            title: document.getElementById('edit-title').value,
            bio: document.getElementById('edit-bio').value,
            email: document.getElementById('edit-email').value,
            phone: document.getElementById('edit-phone').value,
            location: document.getElementById('edit-location').value
        };
        
        // Sauvegarder dans le localStorage (en pratique, vous utiliseriez une API)
        localStorage.setItem('profile', JSON.stringify(profile));
        
        alert('Profil mis à jour avec succès!');
    });
}

// Charger la liste des projets
function loadProjectsList() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsList = document.querySelector('.projects-list');
    
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div>
                <h4>${project.title}</h4>
                <small>${project.category}</small>
            </div>
            <div class="project-actions">
                <button class="btn btn-small edit-project" data-id="${project.id}">Modifier</button>
                <button class="btn btn-small btn-secondary delete-project" data-id="${project.id}">Supprimer</button>
            </div>
        `;
        
        projectsList.appendChild(projectItem);
    });
    
    // Ajouter les gestionnaires d'événements pour les boutons
    document.querySelectorAll('.edit-project').forEach(btn => {
        btn.addEventListener('click', () => editProject(btn.dataset.id));
    });
    
    document.querySelectorAll('.delete-project').forEach(btn => {
        btn.addEventListener('click', () => deleteProject(btn.dataset.id));
    });
}

// Configurer le formulaire de projet
function setupProjectForm() {
    const addBtn = document.getElementById('add-project-btn');
    const formContainer = document.getElementById('project-form-container');
    const form = document.getElementById('project-form');
    const cancelBtn = document.getElementById('cancel-project-btn');
    
    let currentProjectId = null;
    
    // Bouton "Ajouter un projet"
    addBtn.addEventListener('click', () => {
        currentProjectId = null;
        form.reset();
        document.getElementById('project-id').value = '';
        formContainer.style.display = 'block';
        window.scrollTo(0, formContainer.offsetTop);
    });
    
    // Bouton "Annuler"
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const project = {
            id: currentProjectId || Date.now(),
            title: document.getElementById('project-title').value,
            category: document.getElementById('project-category').value,
            description: document.getElementById('project-description').value,
            link: document.getElementById('project-link').value
            // Note: Pour l'image, vous auriez besoin d'un upload vers un serveur
        };
        
        // Sauvegarder le projet
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        
        if (currentProjectId) {
            // Mettre à jour un projet existant
            const index = projects.findIndex(p => p.id == currentProjectId);
            if (index !== -1) {
                projects[index] = project;
            }
        } else {
            // Ajouter un nouveau projet
            projects.push(project);
        }
        
        localStorage.setItem('projects', JSON.stringify(projects));
        
        // Recharger la liste et réinitialiser le formulaire
        loadProjectsList();
        form.reset();
        formContainer.style.display = 'none';
        
        alert('Projet enregistré avec succès!');
    });
}

// Modifier un projet existant
function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects.find(p => p.id == id);
    
    if (project) {
        document.getElementById('project-id').value = project.id;
        document.getElementById('project-title').value = project.title;
        document.getElementById('project-category').value = project.category;
        document.getElementById('project-description').value = project.description;
        document.getElementById('project-link').value = project.link || '';
        
        document.getElementById('project-form-container').style.display = 'block';
        window.scrollTo(0, document.getElementById('project-form-container').offsetTop);
    }
}

// Supprimer un projet
function deleteProject(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const filteredProjects = projects.filter(p => p.id != id);
        
        localStorage.setItem('projects', JSON.stringify(filteredProjects));
        loadProjectsList();
    }
}

// Charger les données des compétences
function loadSkillsData() {
    const skills = JSON.parse(localStorage.getItem('skills')) || {
        technical: ["HTML", "CSS", "JavaScript"],
        professional: ["Communication", "Travail d'équipe"]
    };
    
    const technicalSkillsDiv = document.getElementById('technical-skills');
    const professionalSkillsDiv = document.getElementById('professional-skills');
    
    technicalSkillsDiv.innerHTML = '';
    professionalSkillsDiv.innerHTML = '';
    
    skills.technical.forEach((skill, index) => {
        addSkillInput(technicalSkillsDiv, skill, 'technical', index);
    });
    
    skills.professional.forEach((skill, index) => {
        addSkillInput(professionalSkillsDiv, skill, 'professional', index);
    });
}

// Ajouter un champ de compétence
function addSkillInput(container, value, type, index) {
    const div = document.createElement('div');
    div.className = 'skill-input-group';
    div.innerHTML = `
        <input type="text" name="${type}[]" value="${value}" required>
        <button type="button" class="btn btn-small remove-skill" data-type="${type}" data-index="${index}">×</button>
    `;
    container.appendChild(div);
}

// Configurer le formulaire des compétences
function setupSkillsForm() {
    const technicalSkillsDiv = document.getElementById('technical-skills');
    const professionalSkillsDiv = document.getElementById('professional-skills');
    const form = document.getElementById('skills-form');
    
    // Ajouter une compétence technique
    document.getElementById('add-technical-skill').addEventListener('click', () => {
        addSkillInput(technicalSkillsDiv, '', 'technical', Date.now());
    });
    
    // Ajouter une compétence professionnelle
    document.getElementById('add-professional-skill').addEventListener('click', () => {
        addSkillInput(professionalSkillsDiv, '', 'professional', Date.now());
    });
    
    // Supprimer une compétence
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-skill')) {
            e.target.parentElement.remove();
        }
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const technical = formData.getAll('technical[]');
        const professional = formData.getAll('professional[]');
        
        const skills = {
            technical: technical.filter(skill => skill.trim() !== ''),
            professional: professional.filter(skill => skill.trim() !== '')
        };
        
        localStorage.setItem('skills', JSON.stringify(skills));
        alert('Compétences mises à jour avec succès!');
    });
}

// Gérer la déconnexion
function handleLogout() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}