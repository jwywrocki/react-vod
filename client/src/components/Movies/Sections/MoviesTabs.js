import React from 'react'
import PropTypes from 'prop-types';

import { Tab, Tabs, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import PopularityIcon from '@material-ui/icons/TrendingUp';
import GradeIcon from '@material-ui/icons/Grade';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TheatersIcon from '@material-ui/icons/Theaters';

import MovieList from './MovieList';

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

function MovieTabs(props) {
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
                <Tab icon={<PopularityIcon />} label="Popularne filmy" {...tabProps(0)} />
                <Tab icon={<GradeIcon />} label="Najwyżej oceniane" {...tabProps(1)} />
                <Tab icon={<ScheduleIcon />} label="Nadchodzące" {...tabProps(2)} />
                <Tab icon={<TheatersIcon />} label="Obecnie w kinach" {...tabProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MovieList type={"popular"} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MovieList type={"top_rated"} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MovieList type={"upcoming"} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MovieList type={"now_playing"} />
            </TabPanel>
        </div>
    );
}

export default MovieTabs;