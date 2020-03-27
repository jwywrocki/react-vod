import React from 'react';
import {
    IconButton, List, Divider, Box, SwipeableDrawer
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TheatersIcon from '@material-ui/icons/Theaters';
import TvIcon from '@material-ui/icons/Tv';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';

import InOut from './InOut';

import ListItemLink from './ListItemLink';

const useStyles = makeStyles(theme => ({
    list: {
        height: '100vh',
        width: '250px',
    },
    inout: {
        marginTop: 'calc(100vh - 209px)',
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
    },
}));

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
                <ListItemLink link="/movies" primary="Filmy" icon={<TheatersIcon />} />
                <ListItemLink link="/tv" primary="Seriale" icon={<TvIcon />} />
                <ListItemLink link="/persons" primary="Osoby" icon={<PeopleIcon />} />
                <Divider />
                <Box className={classes.inout}>
                    <InOut />
                </Box>
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