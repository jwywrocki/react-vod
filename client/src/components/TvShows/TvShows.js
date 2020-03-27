import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import ScrollTop from '../Nav/Sections/ScrollTop';
import TvTabs from './Sections/TvTabs';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '350px',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '600px',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '960px',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '1920px',
        },
        margin: '0 auto',
        overflow: 'hidden',
    },
}));

function Movies(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TvTabs />
            <ScrollTop {...props} />
        </div>
    )
}

export default Movies