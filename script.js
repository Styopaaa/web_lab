// 1. Store and display browser info in a user-friendly way
const browserInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    cookiesEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine ? 'Online' : 'Offline'
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

const browserInfoElement = document.getElementById('browser-info');
if (browserInfoElement) {
    let browserName = 'Unknown Browser';
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome')) browserName = 'Google Chrome';
    else if (userAgent.includes('firefox')) browserName = 'Mozilla Firefox';
    else if (userAgent.includes('safari')) browserName = 'Apple Safari';
    else if (userAgent.includes('edge')) browserName = 'Microsoft Edge';
    else if (userAgent.includes('opera')) browserName = 'Opera';

    let osName = 'Unknown OS';
    if (navigator.platform.includes('Win')) osName = 'Windows';
    else if (navigator.platform.includes('Mac')) osName = 'MacOS';
    else if (navigator.platform.includes('Linux')) osName = 'Linux';

    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
    const displayLanguage = languageNames.of(navigator.language) || navigator.language;

    browserInfoElement.innerHTML = `
    <div class="browser-info-container">
        <h4>Your Browser Information</h4>
        <ul>
            <li><strong>Browser:</strong> ${browserName}</li>
            <li><strong>Operating System:</strong> ${osName}</li>
            <li><strong>Language:</strong> ${displayLanguage}</li>
            <li><strong>Screen Resolution:</strong> ${window.screen.width} × ${window.screen.height}</li>
            <li><strong>Cookies:</strong> ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}</li>
            <li><strong>Status:</strong> ${navigator.onLine ? 'Online' : 'Offline'}</li>
        </ul>
    </div>
    `;
}

// 2. JSONPlaceholder коментарі (номер варіанту 1)
fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('commentsContainer');
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
            container.appendChild(div);
        });
    });

// 3. Модальне вікно через 60 сек
setTimeout(() => {
    document.getElementById('feedbackModal').classList.add('show');
}, 60000);

document.getElementById('closeModal').onclick = () => {
    document.getElementById('feedbackModal').classList.remove('show');
};

// 4. Apply theme based on time of day
function setThemeBasedOnTime() {
    const hour = new Date().getHours();
    const autoTheme = hour >= 7 && hour < 21 ? 'light' : 'dark';
    applyTheme(autoTheme);
}

// 5. Apply the selected theme
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
}

// 6. Update the theme toggle button label
function updateToggleButton() {
    const button = document.getElementById('themeToggle');
    const current = localStorage.getItem('theme');
    let label = '';

    if (!current || current === 'auto') {
        label = 'Тема: Авто';
    } else if (current === 'dark') {
        label = 'Тема: Темна';
    } else if (current === 'light') {
        label = 'Тема: Світла';
    }

    if (button) {
        button.textContent = label;
    }
}

// 7. Initialize theme on load and check every minute
window.addEventListener('load', () => {
    setThemeBasedOnTime();
    updateToggleButton();
    setInterval(setThemeBasedOnTime, 60000); // Check every minute
});

// 8. Theme toggle button
document.getElementById('themeToggle')?.addEventListener('click', () => {
    const hasDarkClass = document.body.classList.contains('dark-theme');
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'dark');
        applyTheme('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        applyTheme('light');
    } else {
        localStorage.removeItem('theme');
        setThemeBasedOnTime();
    }
    updateToggleButton();
});
