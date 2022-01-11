import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logout(props) {

    // const history = useHistory();
    const navigate = useNavigate()

    function handleLogout(e) {
        localStorage.clear();
        // history.push("/");
        navigate("/login");

        window.location.reload();
    }

    return (
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