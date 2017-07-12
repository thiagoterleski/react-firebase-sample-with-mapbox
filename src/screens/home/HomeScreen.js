import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidGhpYWdvdGVybGVza2kiLCJhIjoiY2o1MDhpOG83MDJ1ZjMycG10anR2dngwcSJ9.8UyCkc54z6ez3QWFFQ-Lkw"
});

const styleSheet = createStyleSheet('HomeScreen', theme => ({
  mapContainer: {
    flexGrow: 0,
    height: '100%',
  },
}));

class HomeScreen extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid item className={classes.mapContainer}>
        <Map
          style="mapbox://styles/mapbox/light-v9"
          onDblClick={(evt) => console.log(evt)}
          containerStyle={{
            height: "calc(100vh - 64px)",
            width: "100%"
          }}>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            </Layer>
        </Map>
      </Grid>
    )
  }
}

HomeScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(HomeScreen);
