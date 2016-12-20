import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from 'containers/Header';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <Header />
      {React.Children.toArray(children)}
      <div className="copy-w">
        Copyright &copy; ExpensesLab
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
