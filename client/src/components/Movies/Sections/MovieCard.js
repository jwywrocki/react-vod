import React from 'react';
import {
    CardActionArea, CardMedia, Button, Typography, Divider,
    Card, CardContent, Box, Grid, Avatar, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info';

import textTurncate from '../../../actions/textTruncate';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 auto',
        display: 'flex',
        width: '460px',
    },
    avatar: {
        position: 'absolute',
        top: '5px',
        left: '5px',
        width: '40px',
        height: '40px',
        backgroundColor: theme.palette.text.primary,
    },
    value: {
        fontWeight: 'bold',
        fontSize: '14px',
    },
    divider: {
        margin: '5px 0',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    info: {
        position: 'relative',
        width: '265px',
        height: '310px'
    },
    linkDetails: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '265px',
        paddingTop: theme.spacing(2),
    },
    link_button: {
        borderRadius: '0px',
    },
}));

function MovieCard(props) {
    const classes = useStyles();
    return (
        <Grid item sm={12} md={6} xl={3}>
            <Card className={classes.root} raised>
                <CardActionArea href={`/movie/${props.id}`}>
                    <Avatar className={classes.avatar}>
                        <CircularProgress
                            style={{ position: "absolute" }}
                            variant="static"
                            value={props.rate * 10}
                            color="primary"
                            size={35}
                            thickness={6}
                        />
                        <span className={classes.value}>
                            {props.rate}
                        </span>
                    </Avatar>
                    <CardMedia
                        component='img'
                        width='195px'
                        height='310px'
                        image={props.image ? props.image : 'noPoster.png'}
                        title={props.title}
                    />
                </CardActionArea>
                <div className={classes.details}>
                    <CardContent className={classes.info}>
                        <Typography gutterBottom variant="subtitle1">
                            {props.title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" color="textSecondary">
                            Premiera: {props.premiere}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body2">
                            {props.overview
                                ? textTurncate(`${props.overview}`, 25, '...')
                                : `Przepraszamy nie posiadamy opisu do filmu: "${props.title}" w języku polskim.`}
                        </Typography>
                        <Box className={classes.linkDetails}>
                            <Button className={classes.link_button} href={`/movie/${props.id}`} variant="contained" fullWidth color="primary" size="large" endIcon={<InfoIcon />}>
                                Więcej informacji
                        </Button>
                        </Box>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

export default MovieCard;