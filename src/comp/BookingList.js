import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Booking from './Booking';

function BookingList() {

    const [bookings, setBookings] = useState ([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    
    useEffect( ()=> { //callback

        console.log(userId);

        const fetchData = async ()=> { //hämta data från API
            const response = await axios.get(`http://localhost:1337/bookings?users_permissions_user.id=${userId}`)
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // })
            setBookings(response.data)
        }
    
        fetchData();
    
    }, [] )
    
    return ( 
        <>
        <h2>My booked sessions</h2>
        <div className="list">
            <h3>My Helpers</h3>
            {/* Har man bokat hjälp?  */}
            {/* haveiBooked ?  */}
            <p>You haven't asked for help (yet!)</p>

            {/* : */}
                { bookings.map ( (booking)=> { //listar ut alla bookningar
                    
                    return (
                        <Booking key  =   { booking.id } 
                        helperId   =   { booking.id } 
                        email      =   { booking.email }  
                        firstName  =   { booking.first_name }
                        lastName   =   { booking.last_name }  
                        language   =   { booking.language } 
                        dateTime   =   { booking.date_time }
                     />
                    )
                })
            }

        </div>
        <hr />
        <div className="list">
            <h3>My Students</h3>
            {/* Har man blivit bokad?  */}
            {/* amiBooked ?  */}
            <p>No one have asked for your help (yet!)</p>

            { bookings.map ( (booking)=> { //listar ut alla bookningar
                    
                    return (
                        <Booking key  =   { booking.id } 
                        userId      =   { booking.user_id } 
                        email       =   { booking.email }  
                        firstName   =   { booking.first_name }
                        lastName    =   { booking.last_name }  
                        language    =   { booking.language } 
                        dateTime    =   { booking.date_time }
                     />
                    )
                })
            }

            
        </div>
        </>

        
     )
}
 
export default BookingList;