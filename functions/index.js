const functions = require('firebase-functions');
const fetch = require('node-fetch');
const cors = require('cors')({ origin: true }); // Enable CORS for all origins

const apiKey = 'AIzaSyBFl_RbbAYl8WeodWJppLRJOcV1PFXvnxw'; // Replace with your API key

exports.getPlaceSuggestions = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { inputQuery } = req.query; // Assuming you'll pass inputQuery as a query parameter

    if (!inputQuery) {
      res.status(400).send('Missing inputQuery parameter');
      return;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${inputQuery}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });
});

exports.getLatLng = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { address } = req.query; // Assuming you pass the address as a query parameter

    if (!address) {
      res.status(400).send('Missing address parameter');
      return;
    }

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { location } = data.results[0].geometry;
        const { lat, lng } = location;
        res.status(200).json({ lat, lng });
      } else {
        res.status(404).send('Location not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });
});

exports.getAddressFromLatLng = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { lat, lng } = req.query; // Assuming you pass lat and lng as query parameters

    if (!lat || !lng) {
      res.status(400).send('Missing lat or lng parameter');
      return;
    }

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        res.status(200).json({ address });
      } else {
        res.status(404).send('Address not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });
});