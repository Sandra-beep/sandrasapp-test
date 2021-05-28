import React from 'react';

function Booking( {helperId, firstName, lastName, dateTime} ) {
    return (
        <div className = "card" key = { helperId } >
            <p>Helper: {firstName} {lastName}</p>
            <p>Time booked: {dateTime}</p>
        </div>
    );
}

export default Booking;