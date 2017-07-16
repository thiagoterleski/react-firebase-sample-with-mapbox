import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS,
  dataToJS
} from 'react-redux-firebase'
import { setCurrentMarkerPositionAction } from '../../store'
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import CustomMarker from './CustomMarker'
import IMGPin from '../../assets/images/maps-and-flags.svg'
import IMGCross from '../../assets/images/cross.svg'

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidGhpYWdvdGVybGVza2kiLCJhIjoiY2o1MDhpOG83MDJ1ZjMycG10anR2dngwcSJ9.8UyCkc54z6ez3QWFFQ-Lkw"
});

const styleSheet = createStyleSheet('HomeScreen', theme => ({
  mapContainer: {
    flexGrow: 0,
    height: '100%',
    position: 'relative',
  },
  crossOverlay: {
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
}));

class HomeScreen extends Component {

  renderMarkers = () => {
    const { markers, isCreating, selectedMarkerKey } = this.props

    if (markers && isLoaded(markers) && isCreating === false) {
      return Object.keys(markers)
        .map((key) => {
          const marker = { ...markers[key], key }
          return(
            <CustomMarker
              markerSize={32}
              item={marker}
              key={key}
              onClick={(event, pos) => console.log(markers[selectedMarkerKey].position) }
              size={selectedMarkerKey === key ? 64 : 32}
            />
          )
        })
    }
  }

  render() {
    const { currentMarkerPostiion, classes, isCreating, markers, center } = this.props

    return (
      <Grid item className={classes.mapContainer}>
        { isCreating && (
          <div className={classes.crossOverlay}>
            <img src={IMGCross} width={64} height={64} />
          </div>
        )}
        <Map
          style="mapbox://styles/mapbox/light-v9"
          center={center}
          onDragEnd={(map, event) => this.props.setCurrentMarkerPositionAction(map.getCenter()) }
          containerStyle={{
            height: "calc(100vh - 64px)",
            width: "100%"
          }}>
          { this.renderMarkers() }
        </Map>
      </Grid>
    )
  }
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  isCreating: PropTypes.bool,
};

const HomeScreenWithStyles = withStyles(styleSheet)(HomeScreen);
const mapStateToProps = (state) => ({
  markers: dataToJS(state.firebase, 'markers'),
  isCreating: state.map.isCreating,
  center: state.map.center,
  selectedMarkerKey: state.map.selectedMarkerKey,
  currentMarkerPostiion: state.map.currentMarkerPostiion,
})
export default connect(mapStateToProps, { setCurrentMarkerPositionAction })(HomeScreenWithStyles)
