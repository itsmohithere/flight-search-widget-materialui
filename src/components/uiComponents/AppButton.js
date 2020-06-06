import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

export default function AppButton({ text, onClickHandler, color }) {
  return(
    <Box component="span" m={1}>
      <Button variant="contained" color={color} onClick={onClickHandler} >
        { text }
      </Button>
    </Box>
  );
}

AppButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func,
  color: PropTypes.string.isRequired
};
