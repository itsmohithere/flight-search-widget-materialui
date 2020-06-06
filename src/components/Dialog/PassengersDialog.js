import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
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



const reducer = (state, action) => {
  const { adult, child,infants } = state;
  const { payLoad } = action;

  switch (action.type) {
    case 'addPassengers':
      return  {
        ...state,
        [payLoad]: state[payLoad] + 1
      }

    case 'removePassengers':
      if (payLoad === 'adult') {
        const updatedState = state[payLoad] > 1 ? state[payLoad] - 1 : state[payLoad];

        return {
          ...state,
          [payLoad]: updatedState,
          infants: infants > updatedState ? updatedState : infants 
        }
      }
      return  {
        ...state,
        [payLoad]: state[payLoad] > 0 ? state[payLoad] - 1 : state[payLoad]
      }

    case 'totalPassengers':
      return  {
        ...state,
        total: adult + child
      }
      
    default:
      return {...state};
  }
}

function PassengersDialog({ open, handleClose, passengerHandler, passengersLimit }) {
  const initialState = {
    adult: 1,
    child: 0,
    infants: 0,
    limit: passengersLimit,
    total: 1,
  }
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { adult, child, infants, total, limit } = state;

  const stateManageHandler = (passengerType, actionType) => {
    if (actionType === 'addPassengers') {
      dispatch({ type: 'addPassengers', payLoad: passengerType});
      dispatch({ type: 'totalPassengers'});
    } else {
      dispatch({ type: 'removePassengers', payLoad: passengerType});
      dispatch({ type: 'totalPassengers'})
    }
  }

  const onCloseHandler = () => {
    passengerHandler({adult, child, infants});
    handleClose();
  }

  return (
    <div>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Passengers
            </Typography>
            <CheckOutlinedIcon onClick={() => onCloseHandler()} />
          </Toolbar>
        </AppBar>
        <List>
          <ListItem  button  >
            <ListItemText primary='Adults' secondary='(12+ years)' />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => stateManageHandler('adult')}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              &nbsp;
              <span> { adult } </span>
              <IconButton
                disabled={ total === limit }
                onClick={() => stateManageHandler('adult', 'addPassengers')}
              >
                <AddBoxOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem  button >
            <ListItemText primary='Children' secondary='(2-11 years)' />
            <ListItemSecondaryAction>
              <IconButton 
                onClick={() => stateManageHandler('child')}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              &nbsp;
              <span> { child } </span>
              <IconButton
                disabled={ total === limit }
                onClick={() => stateManageHandler('child', 'addPassengers')}
              >
                <AddBoxOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem  button >
            <ListItemText primary='Infants' secondary='(Under 2 years)' />
            <ListItemSecondaryAction>
              <IconButton 
                onClick={() => stateManageHandler('infants')}
              >
                <RemoveOutlinedIcon />
              </IconButton>
              &nbsp;
              <span> { infants } </span>
              <IconButton
                disabled={infants === adult}
                onClick={() => stateManageHandler('infants', 'addPassengers')}
              >
                <AddBoxOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}

export default PassengersDialog;
