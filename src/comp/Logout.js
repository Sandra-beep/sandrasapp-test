//Här ligger logout funktioner
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logout(props) {

    const navigate = useNavigate()

    function handleLogout(e) { //Rensar ls, navigerar tillbaka till login och laddar om sidan
        localStorage.clear();
        navigate("/login");
        window.location.reload();
    }

    return ( //Om man klickar logout så frågar systemet om man vill logga ut, eller ska skicka tillbaka till hemsidan
        <>
            <div className="logout-card">
                <h2>Do you want to log out?</h2>
                <button onClick={handleLogout} >
                    Yes, log me out!
                </button>

                <button>
                    <Link to="/">No, take me back to main!</Link>
                </button>
            </div>


        </>

    )

}

export default Logout;