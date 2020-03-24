import React from 'react';

import { Typography, CssBaseline, Grid, makeStyles, Divider, IconButton } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/StarBorder';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import PlayCircleIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
    movieInfo: {
        padding: '25px',
        [theme.breakpoints.up('md')]: {
            padding: '40px',
        },
        minHeight: 'calc(100vh - 65px)',
        background: `linear-gradient(to bottom, rgba(0,0,0,.65) 33%,
        rgba(0,0,0,.8) 66%,
        rgba(0,0,0,.9) 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
    },
    poster: {
        maxWidth: '100%',
        maxHeight: '500px',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '400px',
        },
    },
    col: {
        maxWidth: '500px',
    },
    divider: {
        margin: '15px 0',
    },
    controls: {
        fontSize: '40px',
        margin: '0',
    },
    description: {
        fontSize: '16px',
    },
}))

function BackImage(props) {
    const classes = useStyles();

    return (
        <div>
            <div style={{
                backgroundImage: `url(${props.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                minHeight: 'calc(100vh - 65px)',
                overflow: 'hidden',
            }}>
                <CssBaseline />
                <div className={classes.movieInfo}>
                    <Grid container spacing={1} justify="center">
                        <Grid item xs={12} md={6} align="center" className={classes.col}>
                            <Grid item xs={12} md={12} align="center">
                                <img src={props.poster} className={classes.poster} alt=""></img>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.col}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h4"> {props.title} </Typography>
                                <Typography color="textSecondary" variant="h5"> {props.originalTitle} </Typography>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12} md={12} align="center">
                                <IconButton>
                                    <FavoriteIcon className={classes.controls} />
                                </IconButton>
                                <IconButton>
                                    <StarIcon className={classes.controls} />
                                </IconButton>
                                <IconButton>
                                    <BookmarkIcon className={classes.controls} />
                                </IconButton>
                                <IconButton href={`http://www.youtube.com/embed/${props.video}`}>
                                    <PlayCircleIcon className={classes.controls} />
                                </IconButton>

                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12} md={12}>
                                <Typography className={classes.description}>{props.text}</Typography>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12} md={12}>
                                Gatunki
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
}

export default BackImage;