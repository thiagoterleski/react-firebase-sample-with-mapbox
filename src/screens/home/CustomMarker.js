import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-mapbox-gl'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import IMGPin from '../../assets/images/maps-and-flags.svg'

const styleSheet = createStyleSheet('HomeScreen', (theme) => ({
  markerAvatar: {
    borderRadius: 16,
    boxShadow: theme.shadows[2],
  },
}))

const CustomMarker = (props) => {
  const { classes, item, size } = props

  if (!item) return null

  return (
    <Marker
      coordinates={item.position}
      anchor="bottom"
    >
      { (item.user.avatarUrl) ? (
        <img
          alt="marker"
          width={size}
          height={size}
          className={classes.markerAvatar}
          src={item.user.avatarUrl}
        />
      ) : (
        <img
          alt="marker"
          width={size}
          height={size}
          src={IMGPin}
        />
      ) }
    </Marker>
  )
}

CustomMarker.defaultProps = {
  size: 32,
}

CustomMarker.propTypes = {
  size: PropTypes.number,
  classes: PropTypes.object,
  item: PropTypes.object,
}

export default withStyles(styleSheet)(CustomMarker)
