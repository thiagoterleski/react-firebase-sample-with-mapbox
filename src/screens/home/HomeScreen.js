import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  isLoaded,
  dataToJS,
  isEmpty,
  firebaseConnect,
} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import ReactMapboxGl from 'react-mapbox-gl'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import CustomMarker from './CustomMarker'
import { setCurrentMarkerPositionAction } from '../../store'
import IMGCross from '../../assets/images/cross.svg'
import { mapBox } from '../../config'

const Map = ReactMapboxGl({
  accessToken: mapBox.accessToken,
})

const styleSheet = createStyleSheet('HomeScreen', () => ({
  mapContainer: {
    flexGrow: 0,
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

class HomeScreen extends Component {

  renderMarkers = () => {
    const { markers, isCreating } = this.props

    if (markers && isLoaded(markers) && isCreating === false) {
      return Object.keys(markers)
        .map((key) => {
          const marker = { ...markers[key], key }

          return (
            <CustomMarker
              markerSize={32}
              item={marker}
              key={key}
            />
          )
        })
    }

    return null
  }

  render() {
    const { classes, markers, isCreating, center } = this.props

    console.log(isLoaded(markers), isEmpty(markers))

    return (
      <Grid item className={classes.mapContainer}>
        { (isCreating) && (
          <div className={classes.overlay}>
            <img alt="Cross" src={IMGCross} width={64} height={64} />
          </div>
        )}
        { (!isLoaded(markers) && !isCreating) && (
          <div className={classes.overlay}>
            <CircularProgress />
          </div>
        )}
        { isCreating && (
          <div className={classes.crossOverlay}>
            <img alt="Cross" src={IMGCross} width={64} height={64} />
          </div>
        )}
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v9"
          center={center}
          movingMethod={'jumpTo'}
          onDragEnd={(map) => this.props.setCurrentMarkerPositionAction(map.getCenter())}
          containerStyle={{
            height: 'calc(100vh - 64px)',
            width: '100%',
          }}
        >
          { this.renderMarkers() }
        </Map>
      </Grid>
    )
  }
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  isCreating: PropTypes.bool,
  markers: PropTypes.object,
  center: PropTypes.any,
  setCurrentMarkerPositionAction: PropTypes.func,
}

const HomeScreenWithStyles = withStyles(styleSheet)(HomeScreen)

const fbWrappedComponent = firebaseConnect([
  { path: 'markers', queryParams: ['orderByKey', 'limitToLast=100'] }, // 10 most recent
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
])(HomeScreenWithStyles)

const mapStateToProps = (state) => ({
  markers: dataToJS(state.firebase, 'markers'),
  isCreating: state.map.isCreating,
  center: state.map.center,
  selectedMarkerKey: state.map.selectedMarkerKey,
  currentMarkerPostiion: state.map.currentMarkerPostiion,
})

export default connect(mapStateToProps, { setCurrentMarkerPositionAction })(fbWrappedComponent)
