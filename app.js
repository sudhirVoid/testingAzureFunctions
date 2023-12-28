const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Azure Function URL
const azureFunctionUrl = 'https://weathertrigger.azurewebsites.net/api/weatherTriggerFunction?code=PKIctmtqvYr6k4CoWmsud-SRuQcVOiR5d6wG_sU56DO9AzFuoAB2FQ==';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/getWeather', async (req, res) => {
  const { location, email } = req.body;
    console.log("I am called.")
  try {
    // Call Azure Function
    await axios.post(azureFunctionUrl, {
      location,
      email,
    });

    res.status(200).send('Request sent to Azure Function!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending request to Azure Function.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
