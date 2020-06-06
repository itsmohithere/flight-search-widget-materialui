import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

function DropDown({ open, handleClose, setTripClass, anchorRef }) {

  const handleChange = (event, value) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setTripClass(value);
    handleClose();
  };
  
  const prevOpen = React.useRef(open);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleClose(false);
    }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open, anchorRef]);

  return (
    <React.Fragment>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(event) => handleChange(event,'Economy')} >Economy</MenuItem>
                    <MenuItem onClick={(event) => handleChange(event,'Premium Economy')} >Premium Economy</MenuItem>
                    <MenuItem onClick={(event) => handleChange(event,'Business')} >Business</MenuItem>
                    <MenuItem onClick={(event) => handleChange(event,'First')} >First</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </React.Fragment>
  );
}

export default DropDown;
