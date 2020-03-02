import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Register, Login } from './components/auth';
import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar';
import AccountSettings from './components/personalSettings/personalSettings.jsx';
import FormBuilder from './components/formBuilder/formBuilder';
import Forms from './components/forms/forms';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/forms' component={Forms} />
        <Route exact path='/form-builder' component={FormBuilder} />
        <Route
          exact
          path='/settings/:subsettings'
          component={AccountSettings}
        />
        <Route exact path='/login' component={Login} />
        <Route component={Home} />
      </Switch>
    </>
  );
}

export default App;
