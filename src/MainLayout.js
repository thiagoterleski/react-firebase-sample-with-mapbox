/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';
import { FormLabel } from 'material-ui/Form';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Sidebar from './global/components/sidebar/Sidebar'
import AppBar from './global/components/appBar/AppBar'
import HomeScreen from './screens/home/HomeScreen'

const styleSheet = createStyleSheet('MainLayout', theme => ({
  root: {
    flexGrow: 0,
    height: '100vh',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#ccc',
  },
  header: {
    flexGrow: 0,
    height: 90,
  }
}));

class MainLayout extends Component {
  state = {
    gutter: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const classes = this.props.classes;
    const { gutter } = this.state;

    return (
      <div className={classes.root}>
        <AppBar />
        <Grid gutter={0} container align="stretch" direction="row" className={classes.content}>
          <Grid item xs={9}>
            <HomeScreen />
          </Grid>
          <Grid item style={{ display: 'flex' }} xs={3}>
            <Sidebar />
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MainLayout);
