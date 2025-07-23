document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Gérer la connexion
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // En pratique, vous feriez une requête à un serveur pour vérifier les identifiants
    // Pour cet exemple, nous utilisons des identifiants codés en dur
    if (username === 'admin' && password === 'password') {
        // Simuler un token d'authentification
        localStorage.setItem('authToken', 'simulated-token-12345');
        window.location.href = 'dashboard.html';
    } else {
        alert('Identifiants incorrects. Essayez admin/password pour la démo.');
    }
}