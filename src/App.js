import Navbar from './comp/Navbar';
import Home from './comp/Home';
import Create from './comp/Create';
import Bookings from './comp/BookingList';
import MyInfo from './comp/Myinfo';
import Login from './comp/Login';
import Signup from './comp/Signup';
import Logout from './comp/Logout';
import Footer from './comp/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes> {/* istället för <Switch> */}
            <Route path="/login"      element={<Login />}     />
            <Route path="/home"       element={<Home />}      />
            <Route path="/create"     element={<Create />}    />
            <Route path="/bookings"   element={<Bookings />}  />
            <Route path="/myinfo"     element={<MyInfo />}    />
            <Route path="/login"      element={<Login />}     />
            <Route path="/logout"     element={<Logout />}    />
            <Route path="/signup"     element={<Signup />}    />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
