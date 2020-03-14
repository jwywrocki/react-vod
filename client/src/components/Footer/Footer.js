import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'© '}{new Date().getFullYear()}{' '}Jakub Wywrocki{'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(4),
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Footer