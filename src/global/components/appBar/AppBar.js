import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { AppBar as UIAppBar } from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IMGFirebase from '../../../assets/images/google-firebase.png'
import IMGGoogle from '../../../assets/images/google-logo.svg'

import {
  LIST_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from '../../../config/constants'

const styleSheet = createStyleSheet('AppBar', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    color: 'white',
  },
  progressText: {
    color: 'white'
  },
  progressLoaderContainer: {
    display: 'flex',
  },
  userProfileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userProfileAvatar: {
    height: 24,
    width: 24,
    marginRight: theme.spacing.unit,
  }
}));

class AppBar extends Component {

  constructor(props) {
    super()
    this.state = {
      isLoading: false,
    }
  }

  googleLogin = loginData => {
    this.setState({ isLoading: true })
    return this.props.firebase
      .login({ provider: 'google' })
      .then(() => {
        this.setState({ isLoading: false })
        // this is where you can redirect to another route
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  handleLogout = () => this.props.firebase.logout()

  render() {

    const { account, auth, isLoadingAuth } = this.props
    const accountExists = isLoaded(account) && !isEmpty(account)
    const classes = this.props.classes;

    return (
      <UIAppBar position="static" elevation={1}>
        <Grid container justify="space-between">
          <Grid item xs>
            <Toolbar>
              <img src={IMGFirebase} width={32} height={32} />
              <Typography type="title" color="inherit" className={classes.flex}>
                React Firebase Application
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs>
            <Toolbar style={{ justifyContent: 'flex-end' }}>
              { !isLoaded(account) && (
                <div className={classes.progressLoaderContainer}>
                  <CircularProgress size={24} className={classes.progress} />
                  <Typography className={classes.progressText} type="body1" component="p">
                    Checking..
                  </Typography>
                </div>
              ) }

              { isLoaded(account) && isEmpty(account) && !isLoadingAuth && (
                <Button onClick={this.googleLogin} dense color="contrast" className={classes.button}>
                  <AccountCircle />
                  Login
                </Button>
              )}

              { !isEmpty(account) && !isLoadingAuth && (
                <div className={classes.userProfileContainer}>
                  <Avatar alt={ account.displayName } src={account.avatarUrl} className={classes.userProfileAvatar} />
                  <Typography className={classes.progressText} type="body1" component="p">
                    { account.displayName }
                  </Typography>
                  <Button onClick={this.handleLogout} dense color="contrast" className={classes.button}>
                    <AccountCircle />
                    Logout
                  </Button>
                </div>
              )}
            </Toolbar>
          </Grid>
        </Grid>
      </UIAppBar>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object,
  firebase: PropTypes.object.isRequired
};

const styledAppBar = withStyles(styleSheet)(AppBar);

const fbWrappedComponent = firebaseConnect([
  '/markers'
])(styledAppBar)

const mapStateToProps = ({ firebase }) => {
  const auth = pathToJS(firebase, 'auth')
  const isAuthLoaded = isLoaded(auth)
  return {
    authError: pathToJS(firebase, 'authError'),
    auth: auth,
    isLoadingAuth: !isAuthLoaded,
    account: pathToJS(firebase, 'profile')
  }
}

export default connect(mapStateToProps)(fbWrappedComponent)
