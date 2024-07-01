import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIp = req.ip || req.connection.remoteAddress;

  try {
    // Get location and temperature data
    const geoResponse = await axios.get(`http://ipapi.co/${clientIp}`);
    const apiKey = process.env.OPENWEATHER_API_KEY
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${geoResponse.data.city}&appid=${apiKey}&units=metric`);


    const location = geoResponse.data.city;
    const temperature = weatherResponse.data.main.temp;

    res.json({
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});