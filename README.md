# Currency Exchange Web Application

## Overview

Welcome to our Currency Exchange Web Application! This application leverages the Currency Exchange API to provide users with real-time currency conversion rates and the ability to add new currencies. It's designed with an emphasis on user experience, handling various inputs meticulously.

## Features

- **Real-Time Currency Conversion**: Utilize up-to-date exchange rates to convert amounts between a variety of currencies.
- **Dynamic Currency List**: Users can add new currencies to the conversion list, which are then fetched in real-time from the Currency Exchange API.
- **Responsive Design**: The application is fully responsive and provides a seamless experience on both desktop and mobile devices.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **API**: Currency Exchange API (https://www.exchangerate-api.com/)

## API Integration

### GET Request

- The application makes GET requests to the Currency Exchange API to retrieve the latest exchange rates.
- Endpoint: `https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD`
- **Error Handling**: If a user inputs something other than a number for conversion, the website will not process the request and will show an error message.

### POST Request

- The application uses POST requests in two scenarios:
  1. **Adding a New Currency**: When a user adds a new currency code, a POST request is made to update the list of available currencies.
  2. **Placing an Order**: Users can place orders for currency exchange, sent to the server using POST requests.
- **Error Handling**: If a user tries to add a currency that doesn't exist in the API's JSON file, the website displays an error message for 5 seconds.

## Setup and Installation

To set up this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser to view the application.

## Contact

- Author: [Mobina Mobaraki]
- Email: [Mobina Mobaraki]
- GitHub: [@mobinamb]
