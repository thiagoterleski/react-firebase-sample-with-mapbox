import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import rootReducer from './reducers'
import { firebase as fbConfig } from '../config/config'

export default function configureStore() {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(fbConfig,
      {
        userProfile: 'users',
        enableLogging: false,
      },
    ),
    // eslint-disable-next-line
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
