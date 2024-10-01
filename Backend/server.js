const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // To handle JSON payloads

const PORT = process.env.PORT || 8080;

// Initially set to a static starting location, later updated via the frontend
let currentLocation = {
  latitude: 17.385044,
  longitude: 78.486671,
  timestamp: new Date().toISOString(),
};

// Endpoint to get the current location of the vehicle
app.get('/vehicle-location', (req, res) => {
  res.json([currentLocation]);
});

// Endpoint to receive updated location from the frontend
app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;

  if (latitude && longitude) {
    currentLocation = {
      latitude: latitude,
      longitude: longitude,
      timestamp: new Date().toISOString(),
    };
    res.status(200).send('Location updated successfully');
  } else {
    res.status(400).send('Invalid data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
