import './App.css';
import Nav from './Components/Nav/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
