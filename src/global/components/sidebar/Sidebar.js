import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Button from 'material-ui/Button';
import ModuleSettings from './ModuleSettings'


const styleSheet = createStyleSheet('Sidebar', theme => ({
  container: {
    flex: 1,
    display: 'flex',
    maxHeight: 'calc(100vh - 64px)'
  },
  sidebar: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 9,
    display: 'flex',
    flexDirection: 'column',
  }),
  sidebarContent: {
    flexGrow: 1,
  },
}));

class Sidebar extends Component {
  constructor(props) {
    super()
  }
  onSaveNewLocation = (event) => {
    const { firebase } = this.props
    event.preventDefault()
    firebase.push('/markers', { text: 'sample marker', done: false })
  }
  render() {
    const { firebase } = this.props
    const classes = this.props.classes;
    
    return (
      <div className={classes.container}>
        <Paper className={classes.sidebar} elevation={4}>
          <Grid container direction="column" justify="space-between" className={classes.sidebarContent}>
            <Grid item xs={12} className={classes.sidebarWidget}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography type="headline" component="h3">
                    React Mapbox
                  </Typography>
                  <Typography type="body1" component="p">
                    This application use Firebase as backend service and MabBox to render the map
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="center" align="center" direction="column">
                    <Grid item xs={12}>
                      <Typography type="caption" gutterBottom component="p">
                        You must be logged to create an marker
                      </Typography>
                      <Button disabled onClick={this.onSaveNewLocation} raised className={classes.button} color="accent">
                        Create my location
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.sidebarWidget}>
              <Typography type="body1" component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const styledSidebar = withStyles(styleSheet)(Sidebar);

const fbWrappedComponent = firebaseConnect([
  '/markers'
  // { type: 'once', path: '/markers' } // for loading once instead of binding
  // '/markers#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/markers#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'markers', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/markers#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(styledSidebar)

const mapStateToProps = ({ firebase }) => ({
    markers: dataToJS(firebase, 'markers'),
})

export default connect(mapStateToProps)(fbWrappedComponent)
