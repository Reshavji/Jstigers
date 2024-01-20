import React from 'react';
import Login from './Components/Login';
import Home from './Components/Home'
import { Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
      <div>
        <div className="app">
      <div className="app__top"></div>
      <div className="app__container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
      </div>
  );
};

export default App;
