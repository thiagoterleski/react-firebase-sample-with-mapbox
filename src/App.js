import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';
import MainLayout from './MainLayout'
import { theme } from './global/Theme'
import configureStore from './store/createStore'


const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <MainLayout />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
