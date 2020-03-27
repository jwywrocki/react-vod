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
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(0),
        },
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

function MovieTabs() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div id="back-to-top-anchor"></div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                variant="fullWidth"
                centered
            >
                <Tab icon={<PopularityIcon />} label="Popularne filmy" {...tabProps(0)} />
                <Tab icon={<GradeIcon />} label="Najwyżej oceniane" {...tabProps(1)} />
                <Tab icon={<ScheduleIcon />} label="Nadchodzące" {...tabProps(2)} />
                <Tab icon={<TheatersIcon />} label="Obecnie w kinach" {...tabProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MovieList type={"popular"} region={""} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MovieList type={"top_rated"} region={""} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MovieList type={"upcoming"} region={"&region=US"} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MovieList type={"now_playing"} region={"&region=PL"} />
            </TabPanel>
        </div>
    );
}

export default MovieTabs;