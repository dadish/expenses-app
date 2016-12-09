import React, { PropTypes } from 'react';
import Icon from 'material-ui/svg-icons/action/delete-forever';
import { grey400, red700 } from 'material-ui/styles/colors';

const EditIcon = (props) => {
  const { onClick } = props;
  return (
    <Icon
      color={grey400}
      hoverColor={red700}
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    />
  );
};

EditIcon.propTypes = {
  onClick: PropTypes.func,
};

export default EditIcon;
