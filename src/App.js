import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles'
import MainLayout from './MainLayout'
import { theme } from './global/Theme'
import configureStore from './store/createStore'

// eslint-disable-next-line
const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MainLayout />
    </MuiThemeProvider>
  </Provider>
)

export default App
