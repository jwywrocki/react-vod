import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  AppBar, Link,
  Toolbar, Box
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import InOut from './Sections/InOut'
import Drawer from './Sections/Drawer'
import SearchBar from './Sections/SearchBar'

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
  link: {
    margin: theme.spacing(1, 1),
  },
  links: {
    display: 'block',
  },
  [theme.breakpoints.down('sm')]: {
    links: {
      diplay: 'none',
    },
  },
}));

function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Drawer />
        <a href="/"><img src="../pixie.png" className={classes.logo} alt=""></img></a>
        <Box variant="div" className={classes.links}>
          <Link variant="button" color="textPrimary" href="/movies" className={classes.link}>
            Filmy
          </Link>
          <Link variant="button" color="textPrimary" href="/tv" className={classes.link}>
            Seriale
          </Link>
        </Box>
        <SearchBar />
        <InOut />
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Nav);