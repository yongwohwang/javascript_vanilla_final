const weather = document.querySelector(".js-weather")

const COORDS = 'coords'
const API_KEY = "8d1dd9efaae743506a3a92b7f09347f3"

function getWeather(lat,lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
  return response.json()
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `You're in ${place}! The temperature is ${temperature}°C `;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude:latitude,
    longitude:longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}
function handleGeoError(){
  console.log("can't access to a geo location")
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init(){
  loadCoords();
}

init();
