import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className = "navbar">
            <h1>Web Studdy Buddy</h1>
            <div className = "links">
                <Link to = "/">Home</Link>
                <Link to = "/create">Create</Link>
                <Link to = "/bookings">My Bookings</Link>
                <Link to = "/login">Login</Link>
                <Link to = "/signup">Signup</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;
