import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Register, Login } from './components/auth';
import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar';
import accountSettings from './components/personalSettings/personalSettings.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route
          exact
          path='/settings/:subsettings'
          component={accountSettings}
        />
        <Route exact path='/login' component={Login} />
        <Route component={Home} />
      </Switch>
    </>
  );
}

export default App;
