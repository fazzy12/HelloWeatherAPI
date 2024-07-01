import axios from 'axios';

export const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = xForwardedFor.split(',');
        return ips[0].trim();
    }
    return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

export const getGeolocation = async (ip) => {
    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);

        if (response.status === 200) {
            return {
                city: response.data.city,
                country: response.data.country_name,
                latitude: response.data.latitude,
                longitude: response.data.longitude,
            };
        } else {
            throw new Error('Failed to fetch geolocation data');
        }
    } catch (error) {
        throw new Error('Failed to fetch geolocation data');
    }
};

export const getWeather = async (location) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        return response.data.main.temp;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};
