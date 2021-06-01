import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Booking from './Booking';

function BookingList() {

    const [bookings, setBookings] = useState ([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    
    useEffect( ()=> { //callback


        const fetchData = async ()=> { //hämta data från API
            const response = await axios.get(`http://localhost:1337/bookings?user_id.id=${userId}`)
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // })
            setBookings(response.data)

            console.log(response.data);

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
                        helperId    =   { booking.id } 
                        email       =   { booking.email }  
                        firstName   =   { booking.helper_id.first_name }
                        lastName    =   { booking.helper_id.last_name }  
                        language    =   { booking.language } 
                        dateTime    =   { booking.helper_id.date_time }
                        price       =   { booking.helper_id.price }

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
            
            {/* : */}

            { bookings.map ( (booking)=> { //listar ut alla bookningar
                    
                    return ( //är det här man kopplar?
                        <Booking key  =   { booking.id } 
                        userId      =   { booking.user_id } 
                        email       =   { booking.email }  
                        firstName   =   { booking.user_id.first_name }
                        lastName    =   { booking.user_id.last_name }  
                        language    =   { booking.language } 
                        dateTime    =   { booking.date_time }
                        price    =   { booking.price }

                     />
                    )
                })
            }

            
        </div>
        </>

        
     )
}
 
export default BookingList;