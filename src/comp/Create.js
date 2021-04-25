const Create = () => {

    const handleClick = () => {
        console.log('Added!')
    }

    return ( 
        <div>
            <div className="create">
                <h2>Add a New Buddy</h2>
                <p>Want to sign up as one of Santas Little Helper?
                Write your info below!</p>
            </div>

            <input type="text" placeholder = "Your name: ex John Doe"/>
            <input type="text" placeholder = "Description: ex Effective, Calm, Fast"/>
            <input type="text" placeholder = "Languages: ex Javascript"/>
            <input type="text" placeholder = "Your email: ex buddy@gmail.com"/>
            <br />
            <button onClick = { handleClick }>Add</button>

        </div>
     );
}
 
export default Create;