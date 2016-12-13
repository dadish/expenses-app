import React, { PropTypes } from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import { createStructuredSelector } from 'reselect';
import { formValueSelector, change } from 'redux-form/immutable';
import { updateMatches } from './actions';

export const InputUserAutoComplete = (props) => {
  const {
    name,
    style,
    handleUpdateInput,
    handleChange,
    dataSource,
    userEmail,
  } = props;
  return (
    <AutoComplete
      name={name}
      dataSource={dataSource || []}
      dataSourceConfig={{
        text: 'email',
        value: 'id',
      }}
      searchText={userEmail}
      onUpdateInput={handleUpdateInput}
      style={style}
      onNewRequest={handleChange}
    />
  );
};

InputUserAutoComplete.propTypes = {
  formId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  dataSource: PropTypes.array,
  userEmail: PropTypes.string.isRequired,
  handleUpdateInput: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  dataSource: (state, { formId }) => formValueSelector(formId)(state, 'userDataSource'),
  userEmail: (state, { formId }) => formValueSelector(formId)(state, 'userEmail'),
});

export const mapDispatchToProps = (dispatch, { formId, input }) => ({
  handleUpdateInput: debounce(matchStr => dispatch(updateMatches({
    formId,
    matchStr,
  })), 500),
  handleChange: (value) => {
    input.onChange(value.id);
    dispatch(change(formId, 'userEmail', value.email));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InputUserAutoComplete);
