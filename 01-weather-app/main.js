const apiKey= 'b7f0f35577df47b0871225329241309';


function api(city) {
  return `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
}

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

async function checkWeather(city){
  const response = await fetch(api(city))
  var data = await response.json();
  console.log(data);

  console.log(data.current.condition.text);

  let weatherCondition = '';
  if(data.current.condition.text.toLowerCase().includes('sunny') || data.current.condition.text.toLowerCase().includes('clear')){
    weatherCondition = 'sun'
  }else if(data.current.condition.text.toLowerCase().includes('overcast') || data.current.condition.text.toLowerCase().includes('cloud')){
    weatherCondition = 'clouds'
  }else if(data.current.condition.text.toLowerCase().includes('rain') || data.current.condition.text.toLowerCase().includes('drizzle') || data.current.condition.text.toLowerCase().includes('patchy')){
    weatherCondition = 'rain'
  }else{
    weatherCondition = 'snow'
  }


  document.querySelector('#realtime-weather-icon').src = `./images/${weatherCondition}.png`
  document.querySelector('#realtime-temperature').textContent = data.current.temp_c + ' °c';
  document.querySelector('#realtime-city-name').textContent = data.location.name;

  document.querySelector('#realtime-humidity').textContent = data.current.humidity + ' %';
  document.querySelector('#realtime-wind-speed').textContent = data.current.wind_kph + ' km/h';
}

searchBtn.addEventListener('click', ()=>{
  checkWeather(searchInput.value)
})
