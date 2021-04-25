import Card from './Card';

const Home = () => {

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
        <div className = "home">
            
            <div className="intro-title">
                <h2>Welcome to Web Studdy Buddy</h2>
                <p className="intro">
                Here you can book a student that also studies web development in Medieinstitutet. Choose a student that is available, choose a time and await your booked time! Remeber, one booked time is ~60 min! </p>
                <p>Happy studying!</p>
            </div>
            
            <Card />

        </div>

        
     );
}
 
export default Home;
