import React from 'react';

import {
    IconButton, List, ListItem,
    ListItemIcon, ListItemText, SwipeableDrawer
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TheatersIcon from '@material-ui/icons/Theaters';
import TvIcon from '@material-ui/icons/Tv';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles({
    list: {
        width: '250px',
    },
});

function Drawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        };

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <TheatersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Filmy" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TvIcon />
                    </ListItemIcon>
                    <ListItemText primary="Seriale" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Osoby" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)}>
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
};

export default Drawer;