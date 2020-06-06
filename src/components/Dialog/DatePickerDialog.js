import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SingleDatePicker } from 'react-dates';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DatePickerDialog({ open, handleClose, locationHandler, type, date, onChange }) {

  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    }
  },[])

  const dateChangeHandler = (date) => {
    onChange({ target: { value: date } }, type);
    handleClose();
  }

  return (
    <Box component="div">
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {
                type === 'departure' ?
                  'Pick Departure Date'
                  : 
                  'Pick Return Date'
              }
            </Typography>
          </Toolbar>
        </AppBar>
        <SingleDatePicker 
          numberOfMonths={width < 600 ? 1 : 2}
          onDateChange={date => dateChangeHandler(date)}
          onFocusChange={({ focused }) => setFocused(focused)}
          focused={true}
          date={date}
          displayFormat="MMM DD YYYY"
          isDayBlocked={m => m.day() === 6 || m.day() === 0}
          hideKeyboardShortcutsPanel
          // withPortal
          withFullScreenPortal={window.innerWidth < 100}
          verticalHeight={568}
          verticalSpacing={undefined}
          horizontalMargin={0}
        />
      </Dialog>
    </Box>
  );
}

export default DatePickerDialog;
