import React from 'react'
import PropTypes from 'prop-types';

import { Tab, Tabs, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import PopularityIcon from '@material-ui/icons/TrendingUp';
import GradeIcon from '@material-ui/icons/Grade';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TheatersIcon from '@material-ui/icons/Theaters';

import CardList from '../CardList';


const useStyles = makeStyles(theme => ({
    tab_panel: {
        padding: theme.spacing(2),
    },
}));

function TabPanel(props) {
    const { children, value, index } = props;
    const classes = useStyles();

    return (
        <div>
            {value === index && <Box className={classes.tab_panel} p={0}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function tabProps(index) {
    return {
        id: 'index',
    };
}

function TabPane(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                centered
                id="back-to-top-anchor"
            >
                <Tab icon={<PopularityIcon />} label={`Popularne ${props.tab1}`} {...tabProps(0)} />
                <Tab icon={<GradeIcon />} label="Najwyżej oceniane" {...tabProps(1)} />
                <Tab icon={<ScheduleIcon />} label="Nadchodzące" {...tabProps(2)} />
                <Tab icon={<TheatersIcon />} label={`Obecnie w ${props.tab4}`} {...tabProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CardList type={"popular"} request={`${props.request}`} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CardList type={"top_rated"} request={`${props.request}`} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {`${props.request}` === 'movie'
                    ? <CardList type={"upcoming"} request={`${props.request}`} />
                    : <CardList type={"airing_today"} request={`${props.request}`} />
                }
            </TabPanel>
            <TabPanel value={value} index={3}>
                {`${props.request}` === 'movie'
                    ? <CardList type={"now_playing"} request={`${props.request}`} />
                    : <CardList type={"on_the_air"} request={`${props.request}`} />
                }
            </TabPanel>
        </div>
    );
}

export default TabPane;