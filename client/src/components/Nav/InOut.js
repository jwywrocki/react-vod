import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import {
    Button
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    btn: {
        margin: theme.spacing(1, 1, 1, 1),
    },
    btn1: {
        margin: theme.spacing(1, 1, 1, 2),
    },
}));

function InOut(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get(`api/users/logout`).then(response => {
            if (response.status === 200) {
                props.history.push('/login');
            } else {
                alert('Wylogowanie nie powiodło się');
            };
        });
    };

    const auth = (user.userData && !user.userData.isAuth);

    if (auth) {
        return (
            <div>
                <Button href="/login" color="primary" variant="contained" className={classes.btn1}>
                    Zaloguj
                </Button>
                <Button href="/register" color="primary" variant="contained" className={classes.btn}>
                    Zarejestruj
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <Button onClick={logoutHandler} color="primary" variant="contained" className={classes.btn}>
                    Wyloguj
                </Button>
            </div>
        );
    };
};

export default withRouter(InOut);