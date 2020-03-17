import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import ScrollTop from '../Nav/Sections/ScrollTop';
import TabPane from '../Home/Sections/TabPane';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '1000px',
        [theme.breakpoints.up('xl')]: {
            maxWidth: '2000px',
        },
        margin: '0 auto',
        padding: theme.spacing(1),
    },
}));

function Movies(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TabPane tab1={'seriale'} tab4={'TV'} request={'tv'} />
            <ScrollTop {...props} />
        </div>
    )
}

export default Movies