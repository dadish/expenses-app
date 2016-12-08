import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      {React.Children.toArray(children)}
    </div>
  </MuiThemeProvider>
);

export default App;
