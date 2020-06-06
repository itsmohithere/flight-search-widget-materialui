import React from 'react';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import Box from '@material-ui/core/Box';

function Field({topText, bottomText, children, required}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" m={1} >
      <Button ref={anchorRef} onClick={handleClickOpen} variant="outlined" color="primary" >
        <p>{topText}</p> &nbsp;
        <span>{bottomText}</span>
        {
          required && <ErrorIcon />
        }
      </Button>
      {children(open, handleClose, anchorRef)}
    </Box>
  );
}

export default Field;
