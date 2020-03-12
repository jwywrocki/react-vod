import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from "../actions/auth";

import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import MovieDetails from "./Details/MovieDetails";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Nav />
      <div style={{ minHeight: 'calc(100vh)' }}>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetails, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
