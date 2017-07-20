import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import blue from 'material-ui/colors/blue'
import amber from 'material-ui/colors/amber'

export const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: {
      ...amber,
    },
  }),
  overrides: {
    MuiAppBar: {
      height: 100,
    },
  },
})
