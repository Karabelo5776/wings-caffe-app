import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import './components/Apps.css'; 
import './components/logo.jpg';

const App = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [currentUser, setCurrentUser] = useState(null);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = (username, password) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            setCurrentUser(user);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleSignup = (username, password) => {
        if (users.find(u => u.username === username)) {
            alert('Username already exists');
        } else {
            const updatedUsers = [...users, { username, password }];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };

    const handleLogout = () => {
        setCurrentUser(null); // This clears the logged-in user and redirects to login/signup
    };

    return (
<div className='containers'>
    {currentUser ? (
        <Dashboard onLogout={handleLogout} />
    ) : (
        <>
            {showSignup ? (
                <SignupForm onSignup={handleSignup} />
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
            <div className="auth-toggle">
                <button onClick={() => setShowSignup(!showSignup)} id="toggle-form">
                    {showSignup ? 'Login' : 'Sign Up'}
                </button>
            </div>
        </>
    )}
</div>

    );
};

export default App;
