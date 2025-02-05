import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/Register.css'
import i18n from '../i18n';

const Register = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation()
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                alert(`Registration failed`);
                throw new Error("Registration failed");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <form className="register" onSubmit={handleSubmit} dir={direction}>
            <h2>{t('register')}</h2>
            <input className="register-field" type="username" placeholder={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input className="register-field" type="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="register-button" type="submit">{t('register')}</button>
        </form>
    );
};

export default Register;
