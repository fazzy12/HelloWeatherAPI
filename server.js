const express = require('express');
const axios = require('axios');
const app = express();
const requestIp = require('request-ip');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.use(requestIp.mw());

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name;
    let clientIp = req.clientIp || req.ip;

    if ( clientIp === '127.0.0.1' || clientIp === '::1') {
        clientIp = '';
    }

    try {
        let location = 'Unknown';

        if (clientIp) {
            const locationResponse = await axios.get(`https://ipinfo.io/${clientIp}/json?token=5efae1190a428`);
            location = locationResponse.data.city || 'Unknown';
        }
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=98d479a425d1a70b61341c8f8b615126`);
        const temperature = weatherResponse.data.main.temp;

        res.json({
            client_ip: clientIp,
            location: location,
            greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}.`
        });
    } catch (error) {
        console.error('Error:', error.message);

        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
        }

        res.status(500).json({ error: 'error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});