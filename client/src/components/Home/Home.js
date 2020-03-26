import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import ScrollTop from '../Nav/Sections/ScrollTop';

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

function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ScrollTop {...props} />
        </div>
    )
}

export default Home