// einiges ist aus dem Internet

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Überprüfe, ob der Benutzer bereits existiert
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Benutzername bereits vergeben' });
    }

    // Verschlüssele das Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // Speichere den Benutzer in der Datenbank
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    // Speichere die Anmeldedaten im Local Storage nach erfolgreicher Registrierung
    res.json({ success: true, message: 'Registrierung erfolgreich' });
    
    localStorage.setItem('loggedInUser', JSON.stringify({ username }));

    
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Überprüfe, ob der Benutzer authentifiziert wurde
const isAuthenticated = checkAuthentication(); 

if (isAuthenticated) {
    loadPage('todos');
} else {
    loadPage('login');
}

function loadPage(page) {
    switch (page) {
        case 'login':
            showLoginPage();
            break;
        case 'todos':
            showToDoPage();
            break;
        default:
            showLoginPage();
    }
}

function showLoginPage() {
    app.innerHTML = '<h2>Login Page</h2><form id="loginForm"><input type="text" id="username" placeholder="Username"><input type="password" id="password" placeholder="Password"><button type="button" onclick="login()">Login</button></form>';
}

function showToDoPage() {
    app.innerHTML = '';
    const mainContent = document.createElement('main');
    mainContent.innerHTML = '<h2>Welcome to ToDo App</h2><p>Example ToDo List:</p><ul><li>Task 1</li><li>Task 2</li><li>Task 3</li></ul>';
    app.appendChild(mainContent);
    
}


function login() {
   
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === 'example' && password === 'password') {
        // Successful login
        showToDoPage();
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function checkAuthentication() {
    
    return false;
}
});