import Navbar from './comp/Navbar';
import Home from './comp/Home';
import Create from './comp/Create';
import Update from './comp/Update';
import Bookings from './comp/BookingList';
import Login from './comp/Login';
import Signup from './comp/Signup';
import Footer from './comp/Footer';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path = "/">    <Home />      </Route>
            <Route path = "/create">    <Create />    </Route>
            <Route path = "/update">    <Update />    </Route>
            <Route path = "/bookings">  <Bookings />  </Route>
            <Route path = "/login">     <Login />     </Route>
            <Route path = "/signup">    <Signup />    </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
