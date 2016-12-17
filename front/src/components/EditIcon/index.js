import React, { PropTypes } from 'react';
import Icon from 'material-ui/svg-icons/editor/mode-edit';
import { blue300, blue700 } from 'material-ui/styles/colors';

const EditIcon = (props) => {
  const { onClick } = props;
  return (
    <Icon
      color={blue300}
      hoverColor={blue700}
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
