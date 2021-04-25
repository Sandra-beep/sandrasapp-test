const Card = () => {

    let name = 'Pedro Rivera';
    let desc = 'A calm student that has a very effective approach to programming.';
    let languages = 'Javascript, React'
    let time10 = '10.00';

    const handleClick = () => {
        console.log('Booked!')
    }

    // const handleRemove = () => {
    //     console.log('Removed!')
    // }

    // const handleUpdate = () => {
    //     console.log('Updated!')
    // }

    return ( 
        
        <div className="card">
        {/* <figure className="image">
            <img url="https://images.pexels.com/photos/2826131/pexels-photo-2826131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="student" />
            
        </figure> */}
        
        <h3> { name } </h3>
        <p> { desc } </p>
        <p><b> Languages: </b></p>
        <p>{ languages } </p>

        <h4>Bookable: </h4>

        <button onClick = { handleClick }> @ { time10 }
        </button> 
   

        <button 
        // onClick ={()=> handleUpdate(student.id)}
        >
            Update
        </button>
        <button 
        // onClick ={()=> handleDelete(student.id)}
        >
            Remove
        </button>
    </div>
    );
}
 



export default Card;