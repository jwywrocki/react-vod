import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  AppBar, IconButton,
  Toolbar, Box
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import InOut from './Sections/InOut'
import Drawer from './Sections/Drawer'
import SearchBar from './Sections/SearchBar'
import ListItemLink from './Sections/ListItemLink';

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
    display: 'flex',
    flexDirection: 'row',
  },
  [theme.breakpoints.down('sm')]: {
    links: {
      display: 'none',
    },
    inOut: {
      display: 'none',
    },
  },
  [theme.breakpoints.up('md')]: {
    drawer: {
      display: 'none',
    },
  },
  darkLight: {
  },
}));

function Nav(props) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default" elevation={1} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.drawer}>
          <Drawer />
        </Box>
        <a href="/"><img src="../pixie.png" className={classes.logo} alt=""></img></a>
        <Box className={classes.links}>
          <ListItemLink link="/movies" primary="Filmy" />
          <ListItemLink link="/tv" primary="Seriale" />
          <ListItemLink link="/" primary="Osoby" />
        </Box>
        <SearchBar />
        <Box className={classes.inOut}>
          <InOut from="Nav" />
        </Box>
        <IconButton className={classes.darkLight} onClick={props.themeToggle}>
          {props.themeType === "light"
            ? <Brightness4Icon size="medium" />
            : <Brightness7Icon size="medium" />
          }
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Nav);