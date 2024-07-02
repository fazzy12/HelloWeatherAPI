const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;


app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Visitor';

    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // If it's an IPv6 address, extract the IPv4 part
    if (clientIp.substr(0, 7) == "::ffff:") {
        clientIp = clientIp.substr(7);
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const ip_token = process.env.IPINFO_TOKEN;

    if (!apiKey || !ip_token) {
        return res.status(500).json({ error: 'API keys not configured' });
    }

    try {
        let location = 'Unknown';

        if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1') {
            try {
                const locationResponse = await axios.get(`https://ipinfo.io/${clientIp}/json?token=${ip_token}`);
                location = locationResponse.data.city || 'Unknown';
            } catch (locationError) {
                console.error('Error getting location:', locationError.message);
            }
        }

        let temperature = 'Unknown';
        if (location !== 'Unknown') {
            try {
                const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
                temperature = weatherResponse.data.main.temp;
            } catch (weatherError) {
                console.error('Error getting weather:', weatherError.message);
            }
        }

        res.json({
            client_ip: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}! ${temperature !== 'Unknown' ? `The temperature is ${temperature} degrees Celsius in ${location}.` : `Weather information is not available for ${location}.`}`
        });

        console.log('Request processed successfully.');
    } catch (error) {
        console.error('Unexpected error:', error.message);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Server started successfully.');
});