// components/StaticRightSide.js
import React from 'react';
import '../css/StaticRightSide.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const StaticContent = () => {
    const {t} = useTranslation()
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    return (
        <div className="static-content">
            <p dir={direction}>{t('theClockIsTicking')}</p>
            <p dir={direction}>{t('areYouReadyToGuess')}</p>
            <div className="image-container">
                <img src="/1.png" alt="Static" className="small-image" />
                <img src="/2.png" alt="Static" className="small-image" />
            </div>
        </div>
    );
};

export default StaticContent;
