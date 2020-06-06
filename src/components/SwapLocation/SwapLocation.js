import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import Box from '@material-ui/core/Box';

const SwapLocation = ({ onClickHandler }) =>  {
  return(
    <Box component="button" m={1} onClick={onClickHandler} >
      <Tooltip title="swap">
        <CompareArrowsIcon />
      </Tooltip>
    </Box>
  );
}

export default SwapLocation;
