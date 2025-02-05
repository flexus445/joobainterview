// App.js
import React, {useState, useEffect} from 'react';
import Clock from './components/Clock';
import StaticRightSide from './components/StaticRightSide';
import Header from './components/Header';
import Footer from './components/Footer';
import WinsBar from './components/WinsBar';
import Login from './components/Login';
import Register from './components/Register';
import './css/App.css';

const App = () => {
    const [guessTries, setGuessTries] = useState([]);
    const [user, setUser] = useState(null);

    const fetchHits = () => {
        console.log("got here")
        fetch("http://localhost:8000/guesstries/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setGuessTries(data);
            })
            .catch((error) =>
                console.error("Error fetching guess tries:", error)
            );
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="app">
            <Header user={user} setUser={setUser} />
            {!user ? (
                <div className="landingPage">
                    <Login setUser={setUser} />
                    <Register setUser={setUser} />
                </div>
            ) : (
                <>
                    <div className="main-content">
                        <Clock fetchHits={fetchHits} />
                        <StaticRightSide />
                    </div>
                    <WinsBar guessTries={guessTries} fetchHits={fetchHits} />
                </>
            )}
            <Footer />
        </div>
    );
};

export default App;
