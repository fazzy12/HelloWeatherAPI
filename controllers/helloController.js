import { getClientIp, getGeolocation, getWeather } from '../utils/utils.js';

class helloController {
    static async hello(req, res) {
        const visitorName = req.query.visitor_name || "Visitor";
        const clientIp = getClientIp(req);

        try {
            const locationData = await getGeolocation(clientIp);

            if (locationData.city && locationData.country) {
                const temperature = await getWeather(locationData.city);

                res.json({
                    client_ip: clientIp,
                    location: locationData.city,
                    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${locationData.city}`,
                });
            } else {
                console.error('Location data not found or incomplete:', locationData);
                res.status(404).json({ error: "Location information could not be retrieved." });
            }
        } catch (error) {
            console.error('Error in helloController:', error.message);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    }
}

export default helloController;
