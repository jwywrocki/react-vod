import React, { useEffect, useState } from 'react';

import {
    Typography, CssBaseline, Grid, makeStyles, Divider,
    Card, CardMedia, CardContent, Tooltip, IconButton,
    GridList, GridListTile, GridListTileBar
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import InfoIcon from '@material-ui/icons/Info';

import { API_KEY, API_URL, IMAGE_URL, FB_URL, TWITTER_URL, INSTAGRAM_URL } from '../Config';

import ScrollTop from '../Nav/Sections/ScrollTop';

const useStyles = makeStyles(theme => ({
    root: {
        width: 'calc(100% - 30px)',
        padding: theme.spacing(1),
    },
    grid: {
        margin: '0 auto',
        maxWidth: '1300px',
    },
    col1: {
        maxWidth: '200px',
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto',
            maxWidth: '366px',
        },
    },
    card: {
        [theme.breakpoints.up('sm')]: {
            position: 'sticky',
            top: '85px',
        }
    },
    poster: {
        width: '342px',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
    cardIcons: {
        padding: '5px',
    },
    cardInfo: {
        fontSize: '12px',
        padding: '0 15px 15px 15px',
    },
    moviePoster: {
        width: '185px',
        height: '278px',
    },
}));

function PersonDetails(props) {
    const classes = useStyles();
    const [Person, setPerson] = useState([]);
    const [ExternalId, setExternalId] = useState([]);
    const [Cast, setCast] = useState([]);
    useEffect(() => {
        const personId = props.match.params.personId

        fetch(`${API_URL}person/${personId}?api_key=${API_KEY}&language=en&append_to_response=external_ids,combined_credits,images`)
            .then(response => response.json())
            .then(response => {
                console.log('Person info:', response);
                setPerson(response);
                setExternalId(response.external_ids);
                setCast([...Cast, ...response.combined_credits.cast]);
            })
    }, [props.match.params.personId])

    return (
        <div className={classes.root}>
            <div id='back-to-top-anchor'></div>
            <ScrollTop />
            <CssBaseline />
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={3} className={classes.col1}>
                    <Card className={classes.card} raised>
                        <CardMedia className={classes.cardImg}>
                            <img
                                src={`${IMAGE_URL}w342${Person.profile_path && Person.profile_path}`}
                                className={classes.poster}
                                alt=""
                            />
                        </CardMedia>
                        <CardContent className={classes.cardIcons}>
                            {ExternalId.facebook_id &&
                                <Tooltip title={`${ExternalId.facebook_id}`} arrow>
                                    <IconButton href={`${FB_URL}${ExternalId.facebook_id}`}>
                                        <FacebookIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            {ExternalId.twitter_id &&
                                <Tooltip title={`${ExternalId.twitter_id}`} arrow>
                                    <IconButton href={`${TWITTER_URL}${ExternalId.twitter_id}`}>
                                        <TwitterIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            {ExternalId.instagram_id &&
                                <Tooltip title={`${ExternalId.instagram_id}`} arrow>
                                    <IconButton href={`${INSTAGRAM_URL}${ExternalId.instagram_id}`}>
                                        <InstagramIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </CardContent>
                        <CardContent className={classes.cardInfo}>
                            <Typography variant="subtitle1">Zawód</Typography>
                            {Person.known_for_department === 'Acting'
                                ? <Typography variant="subtitle2" color="textSecondary">
                                    {Person.gender === 1
                                        ? 'Aktorka'
                                        : 'Aktor'
                                    }
                                </Typography>
                                : <Typography variant="subtitle2" color="textSecondary">
                                    {Person.known_for_department}</Typography>
                            }
                            <Typography variant="subtitle1">Data urodzenia</Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {Person.birthday
                                    ? Person.birthday
                                    : 'Brak danych'
                                }
                            </Typography>
                            <Typography variant="subtitle1">Miejsce urodzenia</Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {Person.place_of_birth
                                    ? Person.place_of_birth
                                    : 'Brak danych'
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Typography variant="h4"> {Person.name} </Typography>
                    <Typography color="textSecondary" variant="h5">
                        {Person.birthday}
                    </Typography>
                    <Divider />
                    <Typography variant="h6"> Biografia </Typography>
                    <Typography>
                        {Person.biography
                            ? Person.biography
                            : `Nie posiadamy biografii ${Person.name} w naszej bazie`
                        }
                    </Typography>
                    <Divider />
                    {Person.gender === 1
                        ? <Typography variant="h6"> Znana z</Typography>
                        : <Typography variant="h6"> Znany z</Typography>
                    }
                    <GridList component="div" spacing={15} cols={0} cellHeight={278}>
                        {Cast && Cast.map((data, index) => (

                            <GridListTile key={index} className={classes.moviePoster}>
                                {data.poster_path !== null
                                    ? <img src={`${IMAGE_URL}w185${data.poster_path}`} alt='poster' />
                                    : <img src="../noPoster.png" alt='poster' />
                                }
                                <GridListTileBar
                                    title={data.title ? data.title : data.original_name}
                                    actionIcon={
                                        <IconButton href={`/movie/${data.id}`}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </div>
    );
}

export default PersonDetails;