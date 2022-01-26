// Här ska man som admin kunna se alla bokningar, vilken student som är kopplad med helper

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Booking from './Booking';
import { server } from "./config";

function AllBookings() {

    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    // const [token, setToken] = useState(localStorage.getItem("jwt")); //Ha kvar: Testa i localstorage

    useEffect(() => { //callback


        const fetchData = async () => { //hämta data från API
            const response = await axios.get(`${server}bookings?user_id.id=${userId}`)
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // })
            setBookings(response.data)

            // console.log(response.data);

        }

        fetchData(); //anropar const fetchdata

    }, [])

    return (
        <>
            <div className="bookinglist">

                <h2>My booked sessions</h2>
                <div className="list">
                    <h3>All Helpers</h3>
                    <p>Students who have been booked</p>

                    {/* Om student har bokat hjälp  */}
                    {/* hasSomeoneBooked.length == 0 ?  <div>No students booked</div> */}

                    {/* : */}
                    {bookings.map((booking) => { //listar ut alla bookningar

                        return (
                            <Booking key={booking.id}
                                helperId={booking.id}
                                email={booking.email}
                                firstName={booking.helper_id.first_name}
                                lastName={booking.helper_id.last_name}
                                language={booking.language}
                                dateTime={booking.helper_id.date_time}
                                price={booking.helper_id.price}

                            />
                        )
                    })
                    }

                </div>
                <hr />
                <div className="list">
                    <h3>All Students</h3>
                    <p>Students who have asked for help</p>
                    {/* Om student blivit bokad */}
                    {/* hasSomeoneBeenBooked.length == 0 ? <div>No students have asked for help</div>*/}

                    {/* : */}

                    {bookings.map((booking) => { //listar ut alla bokningar

                        return (
                            <Booking key={booking.id}
                                userId={booking.user_id}
                                email={booking.email}
                                firstName={booking.user_id.first_name}
                                lastName={booking.user_id.last_name}
                                language={booking.language}
                                dateTime={booking.date_time}
                                price={booking.helper_id.price}

                            />
                        )
                    })
                    }
                </div>
            </div>
        </>


    )
}

export default AllBookings;