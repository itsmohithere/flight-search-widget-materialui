[npm-badge]: https://img.shields.io/npm/v/react-media.svg?style=flat-square
[npm]: https://www.npmjs.com/package/flight-search-widget-materialui

# FLIGHT-SEARCH-WIDGET-MATERIALUI

[`flight-search-widget-materialui`](https://www.npmjs.com/package/flight-search-widget-materialui) is component for React to search flights for travel applications.

*
## Installation

Using npm:

    $ npm install --save flight-search-widget-materialui

Then, use as you would anything else:

## Screen shot
![picture](public/screenshot.png?raw=true "Title")

## Import 

```jsx
// using ES modules
import FlightWidget from 'flight-search-widget-materialui/core';
```

## Basic usage

Render a `<FlightWidget>` component with defined props.

```jsx
import React from 'react';
import axios  from 'axios';
import moment from "moment";
import FlightWidget from 'flight-search-widget-materialui/core';

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
    // info will return you the list of cities fetched from api. You can modify code and name here. 
    fn(info.code, info.name);
  }

  const handleSubmit = (notValid, isReturnTrip, tripLocations, tripDates, tripClass, tripPassengers) => {

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

```

## props

|prop|description|type|
|---|---|---|
|configuration|app configuraion|object|
|initials|Add initial states of the app|object|
|buttonLabels|change label text display on fields|object|
|handleSearchValue|function to handle the onchange value of search city|function|
|handleSelectedCity| function to handle city code and city name you can modify both|function|
|handleSubmit|function to handle your all selected state and perform further tasks on those states|function|

