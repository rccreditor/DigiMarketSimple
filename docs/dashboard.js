const user = JSON.parse(localStorage.getItem('nexus-user'));

if (!user) {
  alert("You're not logged in!");
  window.location.href = 'login.html';
}

document.getElementById('user-name').textContent = user.name;
document.getElementById('profile-name').textContent = user.name;
document.getElementById('profile-email').textContent = user.email;
document.getElementById('sidebar-name').textContent = user.name;
document.getElementById('sidebar-email').textContent = user.email;

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('nexus-user');
  window.location.href = 'login.html';
});

document.getElementById('home-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});
