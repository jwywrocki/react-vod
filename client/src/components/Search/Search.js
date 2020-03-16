import React from 'react';

import {
    InputBase
} from '@material-ui/core';

import { makeStyles, fade } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    searchIcon: {
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
    searchIconIcon: {
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
}));

function Search(props) {
    const classes = useStyles();
    return (
        <div className={classes.searchIcon}>
            <div className={classes.searchIconIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Wyszukaj..."
                fullWidth
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputprops={'searchIcon'}
            />
        </div>
    );
}

export default Search;