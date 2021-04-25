import { useState } from 'react';



const Update = () => {
    const [name, setName] = useState('mario');


    const handleClick = () => {
        setName ('luigi');
    }

    return ( 
        <div className = "home">
            
            <div className="intro-title">
                <h2>Update info!</h2>
            </div>

            <div className="card">
                <input type="text" placeholder = "Add a picture"/>
                <input type="text" placeholder = "Write your name"/>
                <input type="text" placeholder = "Write a description"/>
                <input type="text" placeholder = "Write your languages"/>
                <input type="checkbox">10.00</input>

                <button onClick = { handleClick }>Add</button>

            </div>

            
        </div>

        
     );
}
 
export default Update;