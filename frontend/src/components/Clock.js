// components/Clock.js
import React, { useState } from 'react';
import '../css/Clock.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const countries = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Brazil',
    'Israel'
    // could be in a database
];

const Clock = ({ fetchHits }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const {t} = useTranslation();
    const direction = i18n.options.direction[i18n.language] || 'ltr';


    const handleCountryChange = (event) => {
        const value = event.target.value;
        setSelectedCountry(value);
    
        if (value.trim() === "") {
            setFilteredCountries([]);
        } else {
            setFilteredCountries(
                countries.filter(country => 
                    country.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };
    

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setFilteredCountries([]);
    };

    const handleOk = async () => {
        if (!countries.includes(selectedCountry)) {
            alert("Please select a valid country from the list.");
            return;
        }
    
        const formattedHour = hour.trim() === "" ? "00" : hour.padStart(2, "0");
        const formattedMinute = minute.trim() === "" ? "00" : minute.padStart(2, "0");
    
        const newGuess = {
            place: selectedCountry,
            time: `${formattedHour}:${formattedMinute}`
        };

        try {
            const response = await fetch("http://localhost:8000/guesstries/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newGuess),
            });
    
            if (!response.ok) {
                throw new Error("Failed to submit guess");
            }
    
            const result = await response.json();
            console.log("Guess submitted:", result);
    
            if (result.isHit) {
                fetchHits();
            }
    
            setSelectedCountry('');
            setHour('');
            setMinute('');
    
        } catch (error) {
            console.error("Error submitting guess:", error);
        }
    };

    const handleCancel = () => {
        setSelectedCountry('');
        setHour('');
        setMinute('');
        setFilteredCountries([]);
    };

    return (
        <div className="leftside" dir={direction}>
            <div className="country">
                <input
                    type="text"
                    className="clock-input"
                    placeholder={t('searchCountry')}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                />
                {filteredCountries.length > 0 && (
                    <div className="country-dropdown">
                        {filteredCountries.map((country, index) => (
                            <div
                                key={index}
                                className="country-option"
                                onClick={() => handleCountrySelect(country)}
                            >
                                {country}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="clock-box">
                <div className="clock-title">{t('enterTime')}</div>
                <div className="clock-inputs" dir="ltr">
                    <div className="input-group">
                        <input
                            type="text"
                            className="time-input"
                            value={hour}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // numbers only
                                if (value.length > 2) value = value.slice(0, 2);
                                setHour(value);
                            }}
                            onBlur={() => {
                                if (hour.trim() === "") setHour("00");
                            }}
                            placeholder="HH"
                            maxLength="2"
                        />
                        <div className="input-label">{t('hour')}</div>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="input-group">
                        <input
                            type="text"
                            className="time-input"
                            value={minute}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, ""); // numbers only
                                if (value.length > 2) value = value.slice(0, 2);
                                setMinute(value);
                            }}
                            onBlur={() => {
                                if (minute.trim() === "") setMinute("00");
                            }}
                            placeholder="MM"
                            maxLength="2"
                        />
                        <div className="input-label">{t('minute')}</div>
                    </div>
                </div>
                <div className="clock-footer">
                    <button className="clock-button cancel-button" onClick={handleCancel}>
                        {t('cancel')}
                    </button>
                    <button className="clock-button ok-button" onClick={handleOk}>
                        {t('ok')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clock;
