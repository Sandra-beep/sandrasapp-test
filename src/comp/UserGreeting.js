import React, {useState, useEffect}from 'react';




function UserGreeting() {

    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(  ()=> {
    setUserId(userId);
    }, [])

    return (

        <>

        {userId ? 
        
        (
        <div className="intro-title">
                <h2>Welcome back -firstName- to Web Study Buddy!</h2>
                <p className="intro">
                Pick a helper and let's get started! </p>
                <p>Happy studying!</p>
        </div>

        ) : (
        
        <div>
                <h2>Welcome to Web Study Buddy!</h2>
                <p className="intro">
                Here you can book a student to help you out or be a helper. All students studies web development in Medieinstitutet, so just choose a nice student that is available, submit your email and await your booked time! </p>
                <p>Happy studying!</p>
        </div>
        
        )
        
        }

        </>

    )
}

export default UserGreeting;