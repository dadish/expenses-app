import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from 'containers/Header';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = ({ children, location }) => (
  <MuiThemeProvider>
    <div>
      <Header location={location} />
      {React.Children.toArray(children)}
      <div className="copy-w">
        Copyright &copy; ExpensesLab
      </div>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
