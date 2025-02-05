// components/Footer.js
import React from 'react';
import '../css/Footer.css'; 
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Footer = () => {
    const {t} = useTranslation();
    const direction = i18n.options.direction[i18n.language] || 'ltr';
    
    return (
        <footer className="footer" dir={direction}>
            <p>{t('footer')}</p>
        </footer>
    );
};

export default Footer;
