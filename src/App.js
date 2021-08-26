import Navbar from './comp/Navbar';
import Home from './comp/Home';
import Create from './comp/Create';
import Bookings from './comp/BookingList';
import MyInfo from './comp/Myinfo';
import Login from './comp/Login';
import Signup from './comp/Signup';
import Logout from './comp/Logout';
import Footer from './comp/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path = "/">    <Login />      </Route>
            <Route exact path = "/home">    <Home />      </Route>
            <Route path = "/create">    <Create />    </Route>
            <Route path = "/bookings">  <Bookings />  </Route>
            <Route path = "/myinfo">    <MyInfo />    </Route>
            <Route path = "/login">     <Login />     </Route>
            <Route path = "/logout">    <Logout />    </Route>
            <Route path = "/signup">    <Signup />    </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
