// scripts/login.js
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === 'admin@gmail.com' && password === 'admin1234') {
        alert('Login success');
        window.location.href = 'admin.html';
    } else {
        alert('Wrong email or password');
    }
});