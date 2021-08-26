import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Booking from './Booking';
import {server} from "./config";


function BookingList() {

    const [bookings, setBookings] = useState ([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [students, setStudents] = useState([])
    const loggedInHelper = localStorage.getItem('helperId')
    // const [token, setToken] = useState(localStorage.getItem("jwt"));
    
    useEffect( ()=> { //callback

        const fetchData = async ()=> { //hämta data från API
            const response = await axios.get(`${server}bookings?user_id.id=${userId}`)
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // })
            setBookings(response.data);
            setUserId(userId);
            
            // console.log(response.data);

        }
    
        fetchData();
    
    }, [] )

    useEffect(() => {
        if(!loggedInHelper)return

        const getStudents = async () => {
            const response = await axios.get(`${server}bookings?helper_id=${loggedInHelper}`)
            setStudents(...students, response.data)
        }

        getStudents()
        
    }, [])

    // console.log("students", students)
    
    return ( 

        <>
        <div className="bookinglist">
        <h2>My booked sessions</h2>
        <div className="list">
            <h3>My Helpers</h3>

                { bookings.map ( (booking)=> { //listar ut alla bookningar
                    
                    return (
                    <>
                    { bookings ? (
                        <Booking key    =   { booking.id } 
                        helperId        =   { booking.id } 
                        email           =   { booking.email }  
                        firstName       =   { booking.helper_id.first_name }
                        lastName        =   { booking.helper_id.last_name }  
                        language        =   { booking.language } 
                        dateTime        =   { booking.helper_id.date_time }
                        price           =   { booking.helper_id.price }

                     />
                     ) : (<div></div>)
                    }
                    </>
                    )
                })
            }

            { bookings.length>0 ? 
            (<div></div>) : (<p>You haven't asked for help (yet!)</p>)
            }

        </div>


        <hr />


        <div className="list">
            <h3>My Students</h3>            

            { students.map ( (booking)=> { //listar ut alla bookningar
                    
                    return (
                    <>
                    { students && (
                        <Booking key    =   { booking.id } 
                        userId          =   { booking.user_id } 
                        email           =   { booking.email }  
                        firstName       =   { booking.user_id.first_name }
                        lastName        =   { booking.user_id.last_name }  
                        language        =   { booking.language } 
                        dateTime        =   { booking.date_time }
                        price           =   { booking.helper_id.price }

                     />
                    ) 
                }
                </>
                )
            })
            }

                { students.length === 0    &&
                
                (<p>No one have asked for your help (yet!)</p>)
                
            }

            </div>
        </div>
        </>

        
     )
}
 
export default BookingList;