import React, { useEffect, useState } from 'react';

import {
    Typography, CssBaseline, Grid, makeStyles, Card
} from '@material-ui/core';

import { API_KEY, API_URL, IMAGE_URL } from '../Config';

import ScrollTop from '../Nav/Sections/ScrollTop';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 auto',
        padding: theme.spacing(3),
    },
    col1: {
        width: '340px'
    },
    col2: {
        minWidth: '340px'
    },
    poster: {
        maxHeight: '500px',
    },
    hello: {
        height: '100vh',
        padding: '25px',
        fontSize: '22px'
    },
}));

function PersonDetails(props) {
    const classes = useStyles();
    const [Person, setPerson] = useState([]);
    useEffect(() => {
        const personId = props.match.params.personId

        fetch(`${API_URL}person/${personId}?api_key=${API_KEY}&language=en`)
            .then(response => response.json())
            .then(response => {
                console.log('Person info:', response);
                setPerson(response);
            })
    }, [props.match.params.personId])

    return (
        <div className={classes.root}>
            <div id='back-to-top-anchor'></div>
            <ScrollTop />
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={classes.col1}>
                    <img
                        src={`${IMAGE_URL}w342${Person.profile_path && Person.profile_path}`}
                        className={classes.poster}
                        alt=""
                    />
                    <Typography variant="h5">Zawód</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{Person.known_for_department}</Typography>
                    <Typography variant="h5">Data urodzenia</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{Person.birthday}</Typography>
                    <Typography variant="h5">Miejsce urodzenia</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{Person.place_of_birth}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.col2}>
                    <Typography variant="h4"> {Person.name} </Typography>
                    <Typography color="textSecondary" variant="h5"> {Person.birthday} </Typography>

                    <Typography variant="h6"> Biografia </Typography>
                    <Typography>{Person.biography}</Typography>

                </Grid>
            </Grid>
            <div className={classes.hello}>
                Znany
            </div>
        </div>
    );
}

export default PersonDetails;