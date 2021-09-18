/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=6588b63c8bd10035e6d47e54d1e99fa0&units=metric';
const date = document.getElementById('date');
const tempreature = document.getElementById('temp');
const statusP = document.getElementById('content');
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() < 12 ? d.getMonth() + 1 : 1) + '.' + d.getDate() + '.' + d.getFullYear() + '     ' +
              d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

//GET request to the OpenWeatherMap API
const weather = async(baseURL, country, apiKey) => {
    const res = await fetch(baseURL+country+apiKey)
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error", error);
    }
}

//Create an event listener for the button
button.addEventListener('click', (e) => {
  const countryName = document.getElementById('zip').value;
  const feelingsInput = document.getElementById('feelings').value;
    weather(baseURL,countryName,apiKey)

        .then( (eve) => {
            console.log(eve);
            postData('/weatherData', {date:newDate, temp:eve.main.temp, content:feelingsInput});
            viewUI();
    })
});

//post function to send data to server
const postData = async ( url = '', data = {}) => {
    console.log(data);
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await res.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//update User Interface on html 
const viewUI = async () => {
    const req = await fetch('/all');
    try {
      const weatherData = await req.json();
          date.innerHTML = `Date: ${weatherData.date}`;
          tempreature.innerHTML = `Temperature: ${weatherData.temp}`;
          statusP.innerHTML = `Status: ${weatherData.content}`;
      }
      catch (error) {
        console.log("error", error);
      }
  }