import axios from 'axios';

export const getClientIp = (req) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

export const getGeolocation = async (ip) => {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch geolocation data');
    }
};

export const getWeather = async (location) => {
    try {
        // Replace 'YOUR_WEATHER_API_KEY' with your actual API key for the weather service
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_WEATHER_API_KEY&q=${location}`);
        return response.data.current.temp_c;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};

