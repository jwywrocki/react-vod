import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { useDarkMode } from '../actions/useDarkMode';

import Auth from "../actions/auth";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
// import Search from "./Search/Search";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import MovieDetails from "./Details/MovieDetails";
import TvDetails from "./Details/TvDetails";
import Movies from "./Movies/Movies";
import TvShows from "./TvShows/TvShows";

const useStyles = makeStyles(theme => ({
  darkLight: {
    position: 'sticky',
    top: '65px',
    zIndex: '1',
  },
}));

function App(props) {
  const classes = useStyles();
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  console.log(theme);
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
        <Route exact path="/movie/:movieId" component={Auth(MovieDetails, null)} />
        <Route exact path="/tv/:tvId" component={Auth(TvDetails, null)} />
        {/* <Route exact path="/search/:query" component={Auth(Search), null} /> */}
      </Switch>

      <Footer />
    </ThemeProvider>
  );
};

export default App;
