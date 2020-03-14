import React from 'react';
import {
    CardActionArea, CardMedia, Button, Typography, Grid,
    Card, CardActions, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 auto',
        display: 'flex',
        maxWidth: '450px',
        flexGrow: 1,
    },
    details: {
        display: 'flex',
        padding: theme.spacing(1),
        maxWidth: '483px',
        flexDirection: 'column',
    },
    media: {
        width: '185px',
        height: '278px',
    },
}));

function MovieList(props) {
    const classes = useStyles();

    return (
        <Grid item sm={12} md={6} xl={3}>
            <Card className={classes.root} raised>
                <CardActionArea className={classes.media}>
                    <CardMedia
                        component='img'
                        width='185px'
                        height='278px'
                        image={props.image}
                        title={props.movieTitle}
                    />
                </CardActionArea>
                <div className={classes.details}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {props.movieTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Popularność: {props.moviePop}<br />
                        Głosów: {props.movieRateC}<br />
                        Ocena: {props.movieRate}<br />
                        Publikacja: {props.movieDate}
                        </Typography>
                        <CardActions className={classes.content}>
                            <Button href={`/movie/${props.movieId}`} size="small" color="primary">
                                Więcej...
                        </Button>
                        </CardActions>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

export default MovieList;