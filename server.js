// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, () => {
    console.log (`running server on: localhost:${port}`);
});

//post route to post data to server
app.post('/weatherData', (req,res) => {
    weatherData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content 
    }
    projectData = weatherData;;
});

//get route to get all data from server
app.get('/all', (req, res) => {
    res.send(projectData);
});

