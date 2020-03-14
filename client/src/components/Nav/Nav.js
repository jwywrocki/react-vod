import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppBar, Button, Typography, Link, Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core/styles';

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
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    height: '50px',
    justifyContent: "center",
  },
  toolbarTitle: {
    flexGrow: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.text.disabled, .05),
    '&:hover': {
      backgroundColor: fade(theme.palette.text.disabled, .07),
    },
    margin: theme.spacing(0, 2, 0, 2),
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 7),
  },
  link: {
    margin: theme.spacing(1, 1),
  },
  btn: {
    margin: theme.spacing(1, 1, 1, 1),
  },
  btn1: {
    margin: theme.spacing(1, 1, 1, 2),
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
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Filmy
            </Link>
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Seriale
            </Link>
          </nav>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Wyszukaj..."
              fullWidth
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputprops={'search'}
            />
          </div>
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
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Filmy
            </Link>
            <Link variant="button" color="textPrimary" href="/" className={classes.link}>
              Seriale
            </Link>
          </nav>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Wyszukaj..."
              fullWidth
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputprops={'search'}
            />
          </div>
          <Button onClick={logoutHandler} color="primary" variant="outlined" className={classes.btn}>
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
};

export default withRouter(Nav);