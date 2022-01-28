// Startsidan där jag har hämtat hem Usergreeting och cardlist komp
import CardList from './CardList';
import UserGreeting from './UserGreeting';
import SearchPage from './SearchPage';

function Home() {

    return (

        <div className="main">

            {/* <SearchPage /> */}
            <UserGreeting />

            <h3>All Helpers</h3>
            <hr />

            <CardList />

        </div>

    );

}


export default Home;