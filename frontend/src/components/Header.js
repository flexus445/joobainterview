// components/Header.js
import React from 'react';
import '../css/Header.css'; 
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Header = ({user, setUser}) => {
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    const handleLogout = () => {
        localStorage.removeItem('user');        
        setUser(null);
    };

    return (
        <header className="header" dir={direction}>
            <div className="logo">
                <img src="/logo_jooba.png" alt="Logo" />
            </div>
            <div className="header-buttons">
                {user ? (
                    <>
                        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
                        <button onClick={() => changeLanguage('he')}>{t('hebrew')}</button>
                        <button onClick={handleLogout}>{t('logout')}</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
                        <button onClick={() => changeLanguage('he')}>{t('hebrew')}</button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
