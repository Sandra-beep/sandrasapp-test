import React from 'react';

function Booking( {helperId, firstName, lastName, description, image, language, dateTime} ) {
    return (
        <div>
            {image}
            <p>Helper: {firstName} {lastName}</p>
            <p>Time booked: {dateTime}</p>
        </div>
    );
}

export default Booking;