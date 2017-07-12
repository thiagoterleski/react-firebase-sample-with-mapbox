import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui-icons/Wifi';
import BluetoothIcon from 'material-ui-icons/Bluetooth';

const styleSheet = createStyleSheet('SwitchListSecondary', theme => ({
  root: {
    background: theme.palette.background.paper,
  },
}));

const ModuleSettings = ({ classes }) => (
  <List subheader={<ListSubheader>Settings</ListSubheader>}>
    <ListItem>
      <ListItemIcon>
        <WifiIcon />
      </ListItemIcon>
      <ListItemText primary="Wi-Fi" />
      <ListItemSecondaryAction>
        <Switch
          onClick={event => {}}
          checked={false}
          />
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <BluetoothIcon />
      </ListItemIcon>
      <ListItemText primary="Bluetooth" />
      <ListItemSecondaryAction>
        <Switch
          onClick={event => {}}
          checked
          />
      </ListItemSecondaryAction>
    </ListItem>
  </List>
)

ModuleSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ModuleSettings);
