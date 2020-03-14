import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppBar, Button, Typography, Link, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "center",
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    height: '50px',
  },
  toolbarTitle: {
    flexGrow: 0,
  },
  link: {
    margin: theme.spacing(1, 1),
  },
  btn: {
    position: 'absolute',
    top: '5px',
    right: '10px',
    margin: theme.spacing(1, 1),
  },
  btn1: {
    position: 'absolute',
    top: '5px',
    right: '150px',
    margin: theme.spacing(1, 1),
  }
}));

function Nav(props) {
  const user = useSelector(state => state.user);
  const classes = useStyles();

  const logoutHandler = () => {
    axios.get(`api/users/logout`).then(response => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Wylogowanie nie powiodło się');
      };
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <a href="/"><img src='../pixie1.png' className={classes.logo} alt="Logo"></img></a>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Filmy
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Seriale
            </Link>
          </nav>
          <Button href="/login" color="primary" variant="outlined" className={classes.btn1}>
            Zaloguj
          </Button>
          <Button href="/register" color="primary" variant="outlined" className={classes.btn}>
            Zarejestruj
          </Button>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <a href="/"><img src='../pixie1.png' className={classes.logo} alt="Logo"></img></a>
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Filmy
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Seriale
            </Link>
          </nav>
          <Button onClick={logoutHandler} color="primary" variant="outlined" className={classes.btn}>
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
};

export default withRouter(Nav);