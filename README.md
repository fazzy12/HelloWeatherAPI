# HelloWeatherAPI

HelloWeatherAPI is a simple web server deployed on Vercel, providing an API endpoint to greet visitors with their location-based weather information.

## API Endpoint

***Endpoint***: `https://createserver-kpcyk6koy-fazzy12s-projects.vercel.app/api/hello?visitor_name=John`

Response Example:
```
{
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark! The temperature is 11 degrees Celsius in New York."
}

```

## Setup and Deployment
1. Clone the Repository:

```
git clone https://github.com/fazzy12/HelloWeatherAPI.git
cd HelloWeatherAPI

```
2. Install Dependencies:


```
npm install
```
3. start application

```
npm run start
```

## Technologies Used
- Node.js
- Express.js
- IPinfo (for IP geolocation)
- OpenWeatherMap API (for weather data)
