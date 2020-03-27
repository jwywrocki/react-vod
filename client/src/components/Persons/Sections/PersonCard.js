import React from 'react';
import {
    CardActionArea, CardMedia, Typography,
    Card, CardContent, Box, Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '280px',
    },
    info: {
        height: '70px',
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

function PersonCard(props) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className={classes.root} raised>
                <CardActionArea href={`/person/${props.id}`}>
                    <CardMedia
                        component='img'
                        width='280px'
                        height='350px'
                        image={props.image ? props.image : 'noPoster.png'}
                        title={props.name}
                    />
                    <CardContent>
                        <Typography variant="subtitle1">
                            {props.name}
                        </Typography>
                        <Box className={classes.info}>
                            {props.knownFor && props.knownFor.map((known, id) => (
                                <React.Fragment key={id}>
                                    {known.name
                                        ? <Typography gutterBottom variant="subtitle2" color="textSecondary">{known.name}</Typography>
                                        : <Typography gutterBottom variant="subtitle2" color="textSecondary" noWrap>{known.title}</Typography>
                                    }
                                </React.Fragment>
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default PersonCard;