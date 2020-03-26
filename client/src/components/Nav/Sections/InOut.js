import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
    ListItem, ListItemText, Button
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { logoutUser } from "../../../actions/user_actions";

function ListItemLink(props) {
    const { center, icon, primary, link } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={link} ref={ref} {...itemProps} />),
        [link],
    );

    return (
        <ListItem button component={renderLink}>
            {center ? <ListItemText inset primary={primary} /> : <ListItemText primary={primary} />}
        </ListItem>
    );
}

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
    const auth = (user.userData && !user.userData.isAuth);

    console.log('isAuth: ', (user.userData && !user.userData.isAuth));
    console.log('auth: ', auth);
    console.log('user: ', user);

    const logoutHandler = () => {
        dispatch(logoutUser()).then(response => {
            if (response.payload.success) {
                props.history.push("/login");
            } else {
                alert('Wylogowanie nie powiodło się');
            }
        })
    };


    if (auth) {
        return (
            <div>
                {props.from === "Nav"
                    ?
                    <div>
                        <Button href="/login" color="primary" variant="contained" className={classes.btn1}>
                            Zaloguj
                        </Button>
                    </div>
                    : <ListItemLink center link="/login" primary="Zaloguj" />}
            </div>
        );
    } else {
        return (
            <div>
                {props.from === "Nav"
                    ?
                    <div>
                        <Button onClick={logoutHandler}
                            color="primary"
                            variant="contained"
                            className={classes.btn}>
                            Wyloguj
                        </Button>
                    </div>
                    :
                    <div>
                        <ListItem button onClick={logoutHandler} >
                            <ListItemText primary="Wyloguj" />
                        </ListItem>
                    </div>
                }
            </div>
        );
    };
};

export default withRouter(InOut);