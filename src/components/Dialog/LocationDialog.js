import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { debounce } from '../configuration/debounce';
import { AppCTX } from '../HOC/appCTX/WithAppCTX';
import { appCTXActions } from '../configuration/constants';

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

function LocationDialog({open, handleClose, type, selectCityHandler}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppCTX);
  const [searchResult, setSeachedResult] = useState([]);
  const debounceOnChange = React.useCallback(debounce(getData, 500), []);
  
  function getData(value) {
    state.handleSearchValue(setSeachedResult, value);
  }

  const onClickHandler = (type, item) => {
    state.handleSelectedCity((cityCode, cityName) => {
      dispatch({ type: appCTXActions.validateLocation, payLoad: false });
      dispatch({ type: appCTXActions.setTripLocations, payLoad: { cityCode, cityName, type } });
    }, item); 
    handleClose();
  }

  return(
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Search Origin
            </Typography>
            <SearchIcon />
            <InputBase
              placeholder="Where are you flying from?"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => debounceOnChange(e.target.value)}
            />
          </Toolbar>
        </AppBar>
        <List>
          {
            searchResult.map((item) => {
              return(
                <React.Fragment key={item.id_airport}>
                  <ListItem  button onClick={() => onClickHandler(type, item)}>
                    <ListItemText primary={`${item.name},${item.country_name}`} secondary={item.name} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })
          }
        </List>
      </Dialog>
    </div>
  );
}

export default LocationDialog;
