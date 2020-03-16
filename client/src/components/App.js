import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Auth from "../actions/auth";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
// import Search from "./Search/Search";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import MovieDetails from "./Details/MovieDetails";


function App() {
  let theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <Suspense>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />

        <div style={{ minHeight: 'calc(100vh)' }}>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
            <Route exact path="/movie/:movieId" component={Auth(MovieDetails, null)} />
            {/* <Route exact path="/search/:query" component={Auth(Search), null} /> */}
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
