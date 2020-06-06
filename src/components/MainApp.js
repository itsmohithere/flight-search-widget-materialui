import React, { useContext } from 'react';
import { LocationDialog, DatePickerDialog, PassengersDialog } from './Dialog';
import { tripRound, appCTXActions } from './configuration/constants';
import AppButton from './uiComponents/AppButton';
import Field from './HOC/Fields/Fields';
import DropDown from './dropDown/DropDown';
import Box from '@material-ui/core/Box';
import SwapLocation from './SwapLocation/SwapLocation';
import WithAppCTX, { AppCTX } from './HOC/appCTX/WithAppCTX';

function AppLayOut({ configuration, buttonLabels }) {
  const {
    dispSwap,
    passengersLimit,
    primaryColor, defaultColor
  } = configuration;

  const {
    fromText,
    toText,
    depDateText,
    retDateText,
    PassengersText,
    cabinClassText,
  } = buttonLabels;

  const { state, dispatch } = useContext(AppCTX);

  const { isReturnTrip, isValid, tripLocations, tripDates, tripClass, tripPassengers } = state;
  const { adult, child, infants } = tripPassengers;

  const isActive = (value) => value ? primaryColor : defaultColor;

  return (
    <Box className="App">
      {
        tripRound.map((text) => {
          return (
            <AppButton
              key={text}
              text={text}
              onClickHandler={() => text === tripRound[0] ? dispatch({ type: appCTXActions.dispReturn, payLoad: false }) : dispatch({ type: appCTXActions.dispReturn, payLoad: true })}
              color={text === tripRound[0] ? isActive(!isReturnTrip) : isActive(isReturnTrip)}
            />
          );
        })
      }

      <Field topText={fromText} required={isValid} bottomText={tripLocations.departure.cityName} >
        {(open, handleClose) => {
          return  <LocationDialog
                    type='departure'
                    open={open}
                    handleClose={handleClose}
                  />
        }}
      </Field>
      {
        (dispSwap || dispSwap === undefined) && <SwapLocation onClickHandler={() => dispatch({ type: appCTXActions.swapLocation })} />
      }
      <Field topText={toText} required={isValid} bottomText={tripLocations.arrival.cityName} >
        {(open, handleClose) => {
          return  <LocationDialog
                    open={open}
                    handleClose={handleClose}
                  />
        }}
      </Field>

      <Field topText={depDateText} bottomText={`${tripDates.departureDate}`} >
        {(open, handleClose) => {
          return <DatePickerDialog
            type='departure'
            open={open}
            handleClose={handleClose}
            date={tripDates.departureDate}
            onChange={(e, type) => dispatch({ type: appCTXActions.setTripDates, payLoad: { value: e.target.value, dateType: type } })}
          />
        }}
      </Field>

      {
        isReturnTrip &&
        <Field topText={retDateText} bottomText={`${tripDates.returnDate}`} >
          {(open, handleClose) => {
            return <DatePickerDialog
              open={open}
              handleClose={handleClose}
              date={tripDates.returnDate}
              onChange={(e, type) => dispatch({ type: appCTXActions.setTripDates, payLoad: { value: e.target.value, dateType: type } })}
            />
          }}
        </Field>
      }

      <Field topText={PassengersText} bottomText={`${adult} Adult${child === 0 ? '' : ', ' + child + ' Child'}${infants === 0 ? '' : ', ' + infants + ' Infants'}`} >
        {(open, handleClose) => {
          return <PassengersDialog
            passengersLimit={passengersLimit}
            open={open}
            handleClose={handleClose}
          />
        }}
      </Field>

      <Field topText={cabinClassText} bottomText={tripClass} >
        {(open, handleClose, anchorRef) => {
          return <DropDown
            open={open}
            handleClose={handleClose}
            setTripClass={(value) => dispatch({ type: appCTXActions.setTripClass, payLoad: value })}
            anchorRef={anchorRef}
          />;
        }}
      </Field>

      <AppButton
        text="SEARCH FLIGHT"
        color="primary"
        onClickHandler={() => state.handleSubmit(() => {
          dispatch({ type: appCTXActions.validateLocation, payLoad: true });
        }, isReturnTrip, tripLocations, tripDates, tripClass, tripPassengers)}
      />

    </Box>
  );
}

function FlightWidget({ configuration, initials, buttonLabels, handleSearchValue, handleSelectedCity, handleSubmit }) {
  return (
    <WithAppCTX
      initials={initials}
      configuration={configuration}
      handleSearchValue={handleSearchValue}
      handleSelectedCity={handleSelectedCity}
      handleSubmit={handleSubmit}
    >
      <AppLayOut
        configuration={configuration}
        initials={initials}
        buttonLabels={buttonLabels}
      />
    </WithAppCTX>
  );
}

export default FlightWidget;
