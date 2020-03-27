import React from 'react';
import {
    CardActionArea, CardMedia, Button, Typography, Grid,
    Card, CardContent, Box, Divider, Avatar, CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InfoIcon from '@material-ui/icons/Info';

import textTurncate from '../../../actions/textTruncate';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 auto',
        width: '350px',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            width: '460px',
        },
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
    poster: {
        width: '350px',
        height: '525px',
        [theme.breakpoints.up('sm')]: {
            width: '195px',
            height: '292px',
        },
    },
    info: {
        position: 'relative',
        width: '350px',
        height: '230px',
        [theme.breakpoints.up('sm')]: {
            width: '265px',
            height: '292px',
        },
    },
    linkDetails: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '350px',
        [theme.breakpoints.up('sm')]: {
            width: '265px',
        },
        paddingTop: theme.spacing(2),
    },
    link_button: {
        height: '40px',
        borderRadius: '0px',
    },
}));

function TvCard(props) {
    const classes = useStyles();

    return (
        <Grid item sm={12} md={6} xl={3}>
            <Card className={classes.root} raised>
                <CardActionArea href={`/tv/${props.id}`}>
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
                        className={classes.poster}
                        image={props.image ? props.image : 'noPoster.png'}
                        title={props.title}
                    />
                </CardActionArea>
                <div className={classes.details}>
                    <CardContent className={classes.info}>
                        <Typography variant="subtitle1" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body2">
                            {props.overview
                                ? textTurncate(`${props.overview}`, 25, '...')
                                : `Przepraszamy nie posiadamy opisu do serialu: "${props.title}" w języku polskim.`}
                        </Typography>
                        <Box className={classes.linkDetails}>
                            <Button className={classes.link_button} href={`/tv/${props.id}`} variant="contained" fullWidth color="primary" size="large" endIcon={<InfoIcon />}>
                                Więcej informacji
                        </Button>
                        </Box>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
}

export default TvCard;