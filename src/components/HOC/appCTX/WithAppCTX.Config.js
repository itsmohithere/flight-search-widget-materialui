import { appCTXActions } from "../../configuration/constants";

const reducer = (state, action) => {
  const { payLoad } = action;
  switch (action.type) {
    case appCTXActions.dispReturn:
      return {
        ...state,
        isReturnTrip: payLoad
      };
    case appCTXActions.validateLocation:
      return {
        ...state,
        isValid: payLoad
      };
    case appCTXActions.setTripLocations:
      const { cityName, cityCode, type } = payLoad;
      if (type === 'departure') {
        return {
          ...state,
          tripLocations: {
            ...state.tripLocations,
            departure: {
              cityName,
              cityCode
            }
          }
        }
      } else {
        return {
          ...state,
          tripLocations: {
            ...state.tripLocations,
            arrival: {
              cityName,
              cityCode
            }
          }
        }
      }
    case appCTXActions.setTripDates:
      const { value, dateType } = payLoad;
      if (dateType === 'departure') {
        return {
          ...state,
          tripDates: {
            ...state.tripDates,
            departureDate: value
          }
        }
      } else {
        return {
          ...state,
          tripDates: {
            ...state.tripDates,
            returnDate: value
          }
        }
      }
    case appCTXActions.swapLocation:
      return {
        ...state,
        tripLocations: {
          departure: state.tripLocations.arrival,
          arrival: state.tripLocations.departure
        }
      }
    case appCTXActions.setTripClass:
      return {
        ...state,
        tripClass: payLoad
      }
    case appCTXActions.setTripPassenger:
      return {
        ...state,
        tripPassengers: payLoad
      }
    default:
      return { ...state }
  }
}

export default reducer;
