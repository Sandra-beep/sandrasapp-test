// Komponent för välkomst-texten
import React from 'react';

function UserGreeting() {

    const userId = localStorage.getItem("userId");
    const firstname = localStorage.getItem("firstname");

    // useEffect(() => {
    //     setUserId(userId);
    // }, [])

    return (

        <>

            {userId ?

                (
                    <div className="intro-title">
                        <h2>Welcome back {firstname} to Web Study Buddy!</h2>
                        <p className="intro">
                            Pick a helper and let's get started!
                            <p>Happy studying!</p>
                        </p>
                    </div>

                ) : (

                    <div>
                        <h2>Welcome to Web Study Buddy!</h2>
                        <p className="intro">
                            Here you can book a student to help you out or be a helper. All students studies web development in Medieinstitutet, so just choose a nice student that is available, submit your email and await your booked time!
                            <p>Happy studying!</p>
                        </p>
                    </div>

                )

            }

        </>

    )
}

export default UserGreeting;