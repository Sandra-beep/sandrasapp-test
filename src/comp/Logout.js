import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";

function Logout(props) {
    
    const history = useHistory();

    function handleLogout (e) {
        localStorage.clear();
        history.push("/");
        window.location.reload();
    }

    return (
    <>        
        <div className = "logout-question">
            <h2>Do you want to log out?</h2>
            <button onClick = { handleLogout } >
            <Link to = "">Yes, log me out!</Link>
            </button>

            <button>
            <Link to = "/">No, take me back to main!</Link>
            </button>
        </div>
            
    
    </>

    )

}

export default Logout;