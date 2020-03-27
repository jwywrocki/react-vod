import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import { useDarkMode } from '../actions/useDarkMode';

import Auth from "../actions/auth";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
// import Search from "./Search/Search";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import Movies from "./Movies/Movies";
import MovieDetails from "./Details/MovieDetails";
import TvShows from "./TvShows/TvShows";
import TvDetails from "./Details/TvDetails";
import Persons from "./Persons/Persons";
import PersonDetails from "./Details/PersonDetails";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light'
    ? createMuiTheme({
      palette: {
        type: 'light',
      },
    })
    : createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

  if (!componentMounted) {
    return <div />
  };

  return (

    <ThemeProvider theme={themeMode}>
      <Nav themeType={theme} themeToggle={toggleTheme} />
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route exact path="/movies" component={Auth(Movies, null)} />
        <Route exact path="/tv" component={Auth(TvShows, null)} />
        <Route exact path="/persons" component={Auth(Persons, null)} />
        <Route exact path="/movie/:movieId" component={Auth(MovieDetails, null)} />
        <Route exact path="/tv/:tvId" component={Auth(TvDetails, null)} />
        <Route exact path="/person/:personId" component={Auth(PersonDetails, null)} />
        {/* <Route exact path="/search/:query" component={Auth(Search), null} /> */}
      </Switch>

      <Footer />
    </ThemeProvider>
  );
};

export default App;
