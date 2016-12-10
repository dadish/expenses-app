import React from 'react';
import Paper from 'material-ui/Paper';
import List from './List';
import Header from './Header';
import Controls from './Controls';

const style = {
  width: '90%',
  maxWidth: '800px',
  margin: '32px auto',
  padding: '16px',
};

const Expenses = () => (
  <Paper style={style} >
    <Header />
    <List />
    <Controls />
  </Paper>
);

export default Expenses;
