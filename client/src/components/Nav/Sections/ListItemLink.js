import React from 'react';
import {
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
    const { center, icon, primary, link } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={link} ref={ref} {...itemProps} />),
        [link],
    );

    return (
        <ListItem button component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            {center ? <ListItemText inset primary={primary} /> : <ListItemText primary={primary} />}
        </ListItem>
    );
}

export default ListItemLink;