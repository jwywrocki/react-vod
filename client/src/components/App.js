import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from "../actions/auth";

import Home from "./Home/Home.js";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Nav />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
