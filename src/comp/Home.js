import { useState } from 'react';
import CardList from './CardList';

function Home(){

    return ( 

        
        <div className = "main">

            <div className="intro-title">
                <h2>Welcome to Web Study Buddy!</h2>
                <p className="intro">
                Here you can book a student to help you out or be a helper. All students studies web development in Medieinstitutet, so just choose a nice student that is available, submit your email and await your booked time! </p>
                <p>Happy studying!</p>
            </div>

            <h2>All Helpers</h2>
            <hr />

            <CardList />

        </div>

    );

}

 
export default Home;