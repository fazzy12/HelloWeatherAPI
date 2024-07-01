import { getClientIp, getGeolocation, getWeather } from '../utils/utils.js';

class helloController {
  static async hello(req, res) {
    const visitorName = req.query.visitor_name || "Visitor";
    const clientIp = getClientIp(req);

    try {
      const locationData = await getGeolocation(clientIp);

      if (locationData.status !== "fail") {
        const location = locationData.city || "Unknown Location";
        const temperature = await getWeather(location);

        res.json({
          client_ip: clientIp,
          location: location,
          greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`,
        });
      } else {
        res
          .status(404)
          .json({ error: "Location information could not be retrieved." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    }
  }
}

export default helloController;
