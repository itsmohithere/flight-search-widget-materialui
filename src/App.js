import React from 'react';
import axios  from 'axios';
import FlightWidget from './components/MainApp';
import moment from "moment";

function App() {
  const config = {
    passengersLimit: 12,
    primaryColor: "primary",
    secondaryColor:  "secondary",
    defaultColor: "default",
    dispSwap: true,
  }

  const buttonLabels = {
    fromText: "From: ",
    toText: "To: ",
    depDateText: "Departure date: ",
    retDateText: "Return date: ",
    PassengersText: "Passengers: ",
    cabinClassText: "Cabin class: ",
  }

  const initialStates = {
    tripLocationsInitials: {
      departure: {
        cityName: 'Choose departure',
        cityCode: ''
      },
      arrival: {
        cityName: 'Choose arrival',
        cityCode: ''
      }
    },
    tripDatesInitials: {
      departureDate: moment(),
      returnDate: moment().add(1, 'days')
    },
    tripPassengersInitials: {
      adult: 1,
      child: 0,
      infants: 0
    }
  }

  const handleSearchValue = (fn, value)  =>  {

    const obj = {
      method:'get',
      headers:{
        "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
        "x-rapidapi-key": "xxx",
      },
      url: "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text",
      params: {
        text: value
      }
    }
    
    axios(obj)
      .then((res) => {
        // fn to display data on search location.
        // "country_name" and "name" are the param to display country name and city name.
        // Modify array here if needed.
        fn(res.data); 
      })
      .catch((err) => {
        console.log(err)
      })
    
  }

  const handleSelectedCity = (fn, info) =>  {
    console.log({info}) // info will return you the list of cities fetched from api. You can modify code and name here. 
    fn(info.code, info.name);
  }

  const handleSubmit = (notValid, isReturnTrip, tripLocations, tripDates, tripClass, tripPassengers) => {
    console.log({notValid, isReturnTrip, tripLocations, tripDates, tripClass, tripPassengers})
    // Format results here
    const location = `${tripLocations.departure.cityCode}-${tripLocations.arrival.cityCode}/`;
    const tripDate = `${tripDates.departureDate.format('YYYY-MM-DD')}${isReturnTrip ? `/${tripDates.returnDate.format('YYYY-MM-DD')}` : ''}`;
    const finalPassenger = `${tripPassengers.adult}Adult${tripPassengers.child ? `/${tripPassengers.child}Child` : ''}${tripPassengers.infants ? `/${tripPassengers.infants}Infant` : ''}`;

    if (!tripLocations.departure.cityCode || !tripLocations.arrival.cityCode) {
      notValid() // validation for arrival and departure cities
      return;
    }
    // Perform flight search api here or redirect to particular flight search API.
  }

  return (
    <FlightWidget 
      configuration={config}
      initials={initialStates}
      buttonLabels={buttonLabels}
      handleSearchValue={handleSearchValue}
      handleSelectedCity={handleSelectedCity}
      handleSubmit={handleSubmit}
    />
  );
}

export default App;
