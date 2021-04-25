import Navbar from './comp/Navbar';
import Home from './comp/Home';
import Create from './comp/Create';
import Bookings from './comp/Bookings';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path = "/"> <Home /> </Route>
            <Route path = "/create"> <Create /> </Route>
            <Route path = "/bookings"> <Bookings /> </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
