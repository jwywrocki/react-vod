import React from 'react';
import {
    CardActionArea, CardMedia, Button, Typography, Grid, List, ListItem,
    Card, CardContent, Box, ListItemIcon, ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PopularityIcon from '@material-ui/icons/TrendingUp';
import VotesIcon from '@material-ui/icons/Poll';
import GradeIcon from '@material-ui/icons/Grade';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 auto',
        display: 'flex',
        width: '460px',
    },
    title: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    details_desc: {
        fontSize: '11px',
    },
    info: {
        position: 'relative',
        width: '265px',
        height: '301px'
    },
    linkDetails: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '265px',
        paddingTop: theme.spacing(2),
    }
}));

function MovieList(props) {
    const classes = useStyles();

    return (
        <Grid item sm={12} md={6} xl={3}>
            <Card className={classes.root} raised>
                <CardActionArea href={`/movie/${props.movieId}`}>
                    <CardMedia
                        component='img'
                        width='200px'
                        height='301px'
                        image={props.image}
                        title={props.movieTitle}
                    />
                </CardActionArea>
                <div className={classes.details}>
                    <CardContent className={classes.info}>
                        <Typography gutterBottom variant="subtitle1" className={classes.title}>
                            {props.movieTitle}
                        </Typography>
                        <List dense disableGlutters>
                            <ListItem>
                                <ListItemIcon>
                                    <PopularityIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Popularność: ${props.moviePop}`} disableTypography />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <VotesIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Głosów: ${props.movieVotes}`} disableTypography />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GradeIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Ocena: ${props.movieRate}`} disableTypography />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ScheduleIcon />
                                </ListItemIcon>
                                <ListItemText primary={`Publikacja: ${props.movieDate}`} disableTypography />
                            </ListItem>
                        </List>
                        <Box className={classes.linkDetails}>
                            <Button href={`/movie/${props.movieId}`} variant="contained" fullWidth color="primary" size="large" endIcon={<InfoIcon />}>
                                Więcej informacji
                        </Button>
                        </Box>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

export default MovieList;