import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import ScrollTop from '../Nav/Sections/ScrollTop';
import PersonsList from './Sections/PersonsList';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '300px',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '600px',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '960px',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1280px',
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '1920px',
        },
        margin: '0 auto',
        padding: theme.spacing(2, 1),
        overflow: 'hidden',
    },
}));

function Movies(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PersonsList />
            <ScrollTop {...props} />
        </div>
    )
}

export default Movies