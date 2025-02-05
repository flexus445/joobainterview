import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Login.css'
import i18n from '../i18n';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation();
    const direction = i18n.options.direction[i18n.language] || 'ltr';


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                alert(`Login failed`);
                throw new Error("Login failed");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit} dir={direction}>
            <h2>{t('login')}</h2>
            <input className="login-field" type="username" placeholder={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="login-field" type="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="login-button" type="submit">{t('login')}</button>
        </form>
    );
};

export default Login;
