import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS,
} from 'react-redux-firebase'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import moment from 'moment'
import { toggleCreationModeAction, selectedMarkerAction } from '../../../store'


const styleSheet = createStyleSheet('Sidebar', (theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    maxHeight: 'calc(100vh - 64px)',
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
  sidebar: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 9,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarWidget: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }),
  sidebarFooter: theme.mixins.gutters({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }),
  head: theme.mixins.gutters({

  }),
}))

class Sidebar extends Component {

  onSaveMarker = (event) => {
    const { firebase } = this.props

    event.preventDefault()

    const marker = {
      user: this.props.account,
      position: this.props.currentMarkerPostiion,
      createdAt: new Date().getTime(),
    }

    firebase.push('/markers', marker)
  }

  render() {
    const {
      markers,
      account,
      currentMarkerPostiion,
      isCreating,
      toggleCreationModeAction,
      selectedMarkerAction,
    } = this.props
    const classes = this.props.classes

    return (
      <div className={classes.container}>
        <Paper className={classes.sidebar} elevation={4}>
          <div className={classes.sidebarWidget}>
            <Typography type="headline" component="h3" className={classes.title}>
              React Mapbox
            </Typography>
            <Typography type="body1">
              This is a sample react application using Redux,
              Mapbox and Firebase to handle markers in Realtime
            </Typography>
          </div>
          <div className={classes.sidebarWidget} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography type="title" className={classes.head} component="h3">
              Last five insertions
            </Typography>
            <List dense>
              { markers
                && isLoaded(markers)
                && Object.keys(markers).map((key, i) => (markers[key].user) && (i < 5) ? ( // eslint-disable-line
                  <ListItem
                    button
                    key={key}
                    onClick={() => selectedMarkerAction(markers[key])}
                  >
                    <Avatar alt={markers[key].user.displayName} src={markers[key].user.avatarUrl} />
                    <ListItemText
                      primary={markers[key].user.displayName}
                      secondary={moment(markers[key].createdAt).fromNow()}
                    />
                  </ListItem>
                ) : null)}
            </List>
          </div>

          { isCreating && (
            <div className={classes.sidebarWidget}>
              <Typography type="body1" component="p">
                Click on map to select the local that you want put yout mark
              </Typography>
            </div>
          ) }
          <div className={classes.sidebarFooter}>
            { isLoaded(account) && isEmpty(account) && (
              <Typography type="caption" gutterBottom component="p">
                You must be logged to create
              </Typography>
            ) }
            { isCreating && currentMarkerPostiion ? (
              <Button onClick={this.onSaveMarker} raised className={classes.button} color="accent">
                Save my marker!
              </Button>
            ) : (
              <Button
                disabled={isEmpty(account)}
                onClick={() => toggleCreationModeAction(true)}
                raised
                className={classes.button}
                color="accent"
              >
                Create my location
              </Button>
            ) }


          </div>
        </Paper>
      </div>
    )
  }
}

Sidebar.propTypes = {
  isCreating: PropTypes.bool,
  toggleCreationModeAction: PropTypes.func,
  selectedMarkerAction: PropTypes.func,
  markers: PropTypes.object,
  classes: PropTypes.object.isRequired,
  account: PropTypes.object,
  currentMarkerPostiion: PropTypes.object,
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

const styledSidebar = withStyles(styleSheet)(Sidebar)

const fbWrappedComponent = firebaseConnect([
  { path: 'markers', queryParams: ['orderByChild=createdAt', 'limitToLast=100'] }, // 10 most recent
  // { type: 'once', path: '/markers' } // for loading once instead of binding
  // '/markers#populate=owner:displayNames'
  // for populating owner parameter from id into string loaded from /displayNames root
  // '/markers#populate=collaborators:users'
  // for populating owner parameter from id to user object loaded from /users root
  // { path: 'markers', populates: [{ child: 'collaborators', root: 'users' }] }
  // object notation of population
  // '/markers#populate=owner:users:displayName'
  // for populating owner parameter from id within
  // to displayName string from user object within users root
])(styledSidebar)

const mapStateToProps = ({ firebase, map }) => ({
  auth: pathToJS(firebase, 'auth'),
  account: pathToJS(firebase, 'profile'),
  markers: dataToJS(firebase, 'markers'),
  currentMarkerPostiion: map.currentMarkerPostiion,
  isCreating: map.isCreating,
})

export default connect(
  mapStateToProps,
  { toggleCreationModeAction, selectedMarkerAction },
)(fbWrappedComponent)
