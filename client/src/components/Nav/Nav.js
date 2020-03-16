import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  AppBar, Typography, Link,
  Toolbar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import InOut from './InOut'
import Drawer from '../Home/Drawer'
import Search from '../Search/Search'

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
  link: {
    margin: theme.spacing(1, 1),
  }
}));

function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Drawer />
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <a href="/"><img src="../pixie.png" className={classes.logo} alt=""></img></a>
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="/" className={classes.link}>
            Filmy
            </Link>
          <Link variant="button" color="textPrimary" href="/" className={classes.link}>
            Seriale
            </Link>
        </nav>
        <Search />
        <InOut />
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Nav);