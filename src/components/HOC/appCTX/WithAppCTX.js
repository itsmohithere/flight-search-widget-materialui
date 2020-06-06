import React, { useReducer, createContext } from 'react';
import reducer from './WithAppCTX.Config';

export const AppCTX = createContext({});

function WithAppCTX({ children, initials, handleSearchValue, handleSelectedCity, handleSubmit }) {
  const { tripLocationsInitials, tripDatesInitials, tripPassengersInitials } = initials;

  const initialState = {
    isReturnTrip: false,
    tripLocations: tripLocationsInitials,
    tripDates: tripDatesInitials,
    tripPassengers: tripPassengersInitials,
    tripClass: 'Economy',
    isValid: false,
    handleSearchValue,
    handleSelectedCity,
    handleSubmit
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AppCTX.Provider value={{ state, dispatch }}>
      { children }
    </AppCTX.Provider>
  )
}

export default WithAppCTX;
