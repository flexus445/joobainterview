import React, { useEffect, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "../css/WinsBar.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const WinsBar = ({ guessTries, fetchHits }) => {
    useEffect(() => {
        fetchHits()
    }, [])

    const {t} = useTranslation()
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    return (
        <div className="wins-bar-container" dir={direction}>
            <h1 className="h1">{t('Wins')}</h1>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {guessTries && guessTries.map((guessTry) => (
                    <WinCard
                        key={guessTry.id}
                        itemId={guessTry.id.toString()}
                        time={guessTry.time}
                        place={guessTry.place}
                    />
                ))}
            </ScrollMenu>
        </div>
    );
};

const WinCard = ({ time, place }) => {
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    const {t} = useTranslation()
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    return (
        <div className="win-card" tabIndex={0} dir={direction}>
            <div className="win-info">
                <div className="win-time">{t('Time')}: {formatTime(time)}</div>
                <div className="win-place">{t('Timezone')}: {place}</div>
            </div>
        </div>
    );
};


const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    return (
        <button className="arrow left" onClick={() => scrollPrev()} disabled={isFirstItemVisible} dir={direction}>
            {direction === 'rtl' ? '➡' : '⬅'}
        </button>
    );
};

const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
    const direction = i18n.options.direction[i18n.language] || 'ltr';

    return (
        <button className="arrow right" onClick={() => scrollNext()} disabled={isLastItemVisible} dir={direction}>
            {direction === 'rtl' ? '⬅' : '➡'}
        </button>
    );
};

export default WinsBar;
