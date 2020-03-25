import React from 'react'
import PropTypes from 'prop-types';

import { Tab, Tabs, Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import PopularityIcon from '@material-ui/icons/TrendingUp';
import GradeIcon from '@material-ui/icons/Grade';
import TodayIcon from '@material-ui/icons/Today';
import TvIcon from '@material-ui/icons/Tv';

import TvList from './TvList';

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

function TvTabs(props) {
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
                <Tab icon={<PopularityIcon />} label="Popularne seriale" {...tabProps(0)} />
                <Tab icon={<GradeIcon />} label="Najwyżej oceniane" {...tabProps(1)} />
                <Tab icon={<TodayIcon />} label="Dzisiaj w TV" {...tabProps(2)} />
                <Tab icon={<TvIcon />} label="W TV" {...tabProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TvList type={"popular"} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TvList type={"top_rated"} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TvList type={"airing_today"} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TvList type={"on_the_air"} />
            </TabPanel>
        </div>
    );
}

export default TvTabs;