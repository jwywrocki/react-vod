import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Button
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { logoutUser } from "../../../actions/user_actions";

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
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        dispatch(logoutUser()).then(response => {
            if (response.payload.success) {
                props.history.push("/login");
            } else {
                alert('Wylogowanie nie powiodło się');
            }
        })
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