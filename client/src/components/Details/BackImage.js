import React from 'react';

import {
    Typography, CssBaseline, Grid, makeStyles, Modal,
    Divider, IconButton, Avatar, CircularProgress, Card, Button
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/StarBorder';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import PlayCircleIcon from '@material-ui/icons/PlayCircleOutline';

import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: '60px',
        height: '60px',
        backgroundColor: theme.palette.text.primary,
    },
    value: {
        fontWeight: 'bold',
        fontSize: '21px',
    },
    movieInfo: {
        padding: '25px',
        [theme.breakpoints.up('md')]: {
            padding: '40px',
        },
        minHeight: 'calc(100vh - 65px)',
        background: `linear-gradient(to bottom, ${fade(theme.palette.background.default, 0)} 25%,
        ${fade(theme.palette.background.default, 0.05)} 50%,
        ${fade(theme.palette.background.default, 0.1)} 75%,
        ${fade(theme.palette.background.default, 0.15)} 100%)`,
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
    card: {
        padding: '25px',
        background: fade(theme.palette.background.default, 0.85),
    },
    col: {
        maxWidth: '500px',
    },
    divider: {
        margin: '15px 0',
    },
    control_buttons: {
        margin: '0 5px',
    },
    control_icons: {
        fontSize: '40px',
    },
    description: {
        fontSize: '16px',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '75vw',
        height: '75vh',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    genres: {
        margin: '0px 10px 5px 0px',
    },
}))


function BackImage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        <Card className={classes.card} raised>
                            <Grid container className={classes.col}>
                                <Grid item xs={3} sm={2} md={2}>
                                    <Avatar className={classes.avatar}>
                                        <CircularProgress
                                            style={{ position: "absolute" }}
                                            variant="static"
                                            value={props.grade * 10}
                                            color="primary"
                                            size={54}
                                            thickness={6}
                                        />
                                        <span className={classes.value}>
                                            {props.grade}
                                        </span>
                                    </Avatar>
                                </Grid>
                                <Grid item xs={9} sm={10} md={10}>
                                    <Typography variant="h4"> {props.title} </Typography>
                                    <Typography color="textSecondary" variant="h5"> {props.originalTitle} </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Divider className={classes.divider} />
                                    <Grid item xs={12} md={12} align="center">
                                        <IconButton className={classes.control_buttons}>
                                            <FavoriteIcon className={classes.control_icons} />
                                        </IconButton>
                                        <IconButton className={classes.control_buttons}>
                                            <StarIcon className={classes.control_icons} />
                                        </IconButton>
                                        <IconButton className={classes.control_buttons}>
                                            <BookmarkIcon className={classes.control_icons} />
                                        </IconButton>
                                        <IconButton className={classes.control_buttons} onClick={handleOpen} >
                                            <PlayCircleIcon className={classes.control_icons} />
                                        </IconButton>
                                        <Modal
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <div className={classes.modal}>
                                                {props.video === null
                                                    ? <div>Przepraszamy, nie znaleźliśmy video dla {props.title} w dostępnej bazie.</div>
                                                    :
                                                    <iframe
                                                        src={`http://www.youtube.com/embed/${props.video}`}
                                                        title={`${props.title} Trailer`}
                                                        frameBorder="0"
                                                        allowFullScreen
                                                        style={{
                                                            position: `absolute`,
                                                            top: 0,
                                                            left: 0,
                                                            width: `100%`,
                                                            height: `100%`,
                                                        }}
                                                    >
                                                    </iframe>
                                                }
                                            </div>
                                        </Modal>
                                    </Grid>
                                    <Divider className={classes.divider} />
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="h6"> Opis </Typography>
                                        <Typography className={classes.description}>{props.text}</Typography>
                                    </Grid>
                                    <Divider className={classes.divider} />
                                    <Grid item xs={12} md={12}>
                                        {props.genres.map((genres, index) => (
                                            <Button
                                                className={classes.genres}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                key={index}
                                            >{genres.name}
                                            </Button>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default BackImage;