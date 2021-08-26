// import { useState } from 'react';
import CardList from './CardList';
import UserGreeting from './UserGreeting';

function Home(){

    return ( 

        <div className = "main">

            <UserGreeting />
            

            <h2>All Helpers</h2>
            <hr />

            <CardList />

        </div>

    );

}

 
export default Home;