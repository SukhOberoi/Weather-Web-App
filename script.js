fname.addEventListener("keydown", function (event) { 
    if (event.keyCode == 13) { 
        fetchWeather(document.getElementById('fname').value);
    } 
}); 



const apiKey = '2b2d723cc773401f9e2112952231710'; 
let cityname = ' ';
let regionname = ' ';
let favarr = [];
// localStorage['fav']= JSON.stringify(favarr);
function fetchandshow(){
    if(localStorage.getItem('fav')){
        favarr = JSON.parse(localStorage['fav']);
    
    }
    console.log(favarr);
    // for (let i = 0; i<favarr.length; i++){
    //     document.querySelector(`#city${i+1}`).textContent = favarr[i];
    // }
    switch(favarr.length){
        case 0:
            document.querySelector(`#city1`).textContent = '';
            document.querySelector(`#city2`).textContent = '';
            document.querySelector(`#city3`).textContent = '';
            document.querySelector(`#city4`).textContent = '';
            document.querySelector(`#city5`).textContent = '';
            break;
        case 1:
            document.querySelector(`#city1`).textContent = '';
            document.querySelector(`#city2`).textContent = '';
            document.querySelector(`#city3`).textContent = favarr[0];
            document.querySelector(`#city4`).textContent = '';
            document.querySelector(`#city5`).textContent = '';
            break;
        case 2:
            document.querySelector(`#city1`).textContent = '';
            document.querySelector(`#city2`).textContent = favarr[0];
            document.querySelector(`#city3`).textContent = '';
            document.querySelector(`#city4`).textContent = favarr[1];
            document.querySelector(`#city5`).textContent = '';
            break;
        case 3:
            document.querySelector(`#city1`).textContent = '';
            document.querySelector(`#city2`).textContent = favarr[0];
            document.querySelector(`#city3`).textContent = favarr[1];
            document.querySelector(`#city4`).textContent = favarr[2];
            document.querySelector(`#city5`).textContent = '';
            break;
        case 4:
            document.querySelector(`#city1`).textContent = favarr[0];
            document.querySelector(`#city2`).textContent = favarr[1];
            document.querySelector(`#city3`).textContent = '';
            document.querySelector(`#city4`).textContent = favarr[2];
            document.querySelector(`#city5`).textContent = favarr[3];
            break;
        case 5:
            document.querySelector(`#city1`).textContent = favarr[0];
            document.querySelector(`#city2`).textContent = favarr[1];
            document.querySelector(`#city3`).textContent = favarr[2];
            document.querySelector(`#city4`).textContent = favarr[3];
            document.querySelector(`#city5`).textContent = favarr[4];
            break;
    }
}
fetchandshow();
document.querySelector('.headform').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('fname').value;
    fetchWeather(cityName);
});

function fetchWeather(cityName) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=4&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.current;
            const forecast = data.forecast.forecastday;
            cityname= data.location.name;
            document.getElementById('fname').value=cityname;
            regionname= data.location.region;
            document.querySelector('.city').textContent = `Currently in ${cityname}, ${regionname}`;
            const condition = currentWeather.condition.text;
            document.querySelector('#condi').textContent = condition;
            const conditionIconUrl=currentWeather.condition.icon;
            const conditionIcon = document.getElementById('condicon');
            conditionIcon.src = conditionIconUrl;
            const conditionCode = currentWeather.condition.code;
            const isday = currentWeather.is_day;
            document.querySelector('main').style.color='black';
            let dark = false;
            switch(conditionCode){
                case 1000:
                case 1030:
                    if(isday==1){
                        document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('sunny.jpg')";
                    }
                    else{
                        document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('clearmoon.jpg')";
                        
                    }
                    break;
                case 1003:
                    if(isday==1){
                        document.body.style.backgroundImage = "url('partlycloudy.jpg')";
                    }
                    else{
                        document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('partlycloudynight.jpg')";
                        dark= true
                    }
                    break;
                case 1006:
                case 1009:
                    document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('overcast.jpg')";
                    break;
                
                case 1135:
                case 1147:
                    document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('mistfog.jpg')";
                    break;
                case 1063:
                case 1072:
                case 1150:
                    document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('rain2.jpg')";
                    break;
                case 1153:
                case 1168:
                case 1171:
                case 1180:
                case 1183:
                    document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('rain3.jpg')";
                    break;
                case 1189:
                case 1192:
                case 1195:
                case 1198:
                case 1201:
                case 1204:
                case 1207:
                case 1240:
                case 1243:
                case 1246:
                case 1249:
                case 1252:
                case 1261:
                case 1273:
                case 1276:
                    document.body.style.backgroundImage = "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('thunderstorm.jpg')";
                    break;
                case 1213:
                case 1216:
                case 1219:
                case 1222:
                case 1225:
                case 1237:
                case 1264:
                case 1279:
                case 1282:
                    document.body.style.backgroundImage = "url('snow.jpg')";
            }
            
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center"; 
            document.body.style.backgroundSize = "cover"; 

            const switchCheckbox = document.getElementById('switch');
            if (switchCheckbox.checked) {
                const tempFahrenheit = `${currentWeather.temp_f}°F`;
                const feelsLikeFahrenheit = `${currentWeather.feelslike_f}°F`;
                const todaymax = `${forecast[0].day.maxtemp_f}°F`;
                const todaymin = `${forecast[0].day.mintemp_f}°F`;
                document.querySelector('.temp h1').textContent = tempFahrenheit;
                document.querySelector('.temp p').textContent = `Feels like ${feelsLikeFahrenheit}`;
                document.querySelector('#maximum').textContent = `${todaymax} /`;
                document.querySelector('#minimum').textContent = `${todaymin}`;

            }else{
                const tempCelsius = `${currentWeather.temp_c}°C`;
                const feelsLikeCelsius = `${currentWeather.feelslike_c}°C`;
                const todaymax = `${forecast[0].day.maxtemp_c}°C`;
                const todaymin = `${forecast[0].day.mintemp_c}°C`;
                document.querySelector('.temp h1').textContent = tempCelsius;
                document.querySelector('.temp p').textContent = `Feels like ${feelsLikeCelsius}`;
                document.querySelector('#maximum').textContent = `${todaymax} /`;
                document.querySelector('#minimum').textContent = `${todaymin}`;
            }
            const humidity= currentWeather.humidity;
            document.querySelector('#humidity').textContent = `${humidity}%`;
            const windspeed= currentWeather.wind_kph;
            document.querySelector('#windspeed').textContent = `${windspeed}km/h`;
            const rain= currentWeather.precip_mm;
            document.querySelector('#rainfall').textContent = `${rain}mm`;

            // Update forecast for the next 3 days
            for (let i = 1; i <=3 ; i++) {
                const datex = new Date(forecast[i].date);
                const forecastDay = forecast[i].day;
                const divId = i === 1 ? 'Tomorrow' : (i === 2 ? 'daTomorrow' : 'da3'); // Determine div ID based on index
                const daynames=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                // Get the div element corresponding to the current iteration
                const currentDiv = document.getElementById(divId);
                currentDiv.querySelector('.date').textContent = daynames[datex.getDay()];
                // Update div content using forecastDay data
                if (switchCheckbox.checked){
                    currentDiv.querySelector('.foremaxmin').textContent = `${forecastDay.maxtemp_f}°F | ${forecastDay.mintemp_f}°F`;
                }else{
                currentDiv.querySelector('.foremaxmin').textContent = `${forecastDay.maxtemp_c}°C | ${forecastDay.mintemp_c}°C`;
                }
                currentDiv.querySelector('.forecondi').textContent = forecastDay.condition.text;
                currentDiv.querySelector('.forecondicon').src = forecastDay.condition.icon;
                currentDiv.querySelector('.max').textContent = forecastDay.avghumidity + '%';
                currentDiv.querySelector('.windsp').textContent = forecastDay.maxwind_kph + ' km/h';
                currentDiv.querySelector('.rainmm').textContent = forecastDay.totalprecip_mm + ' mm';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Toggle between Celsius and Fahrenheit
document.getElementById('switch').addEventListener('change', function() {
    fetchWeather(document.getElementById('fname').value);
});

// Example for handling favorite button click (you need to implement this according to your needs)
document.getElementById('favorite').addEventListener('click', function() {
    if(favarr.length == 5){
        alert('You have reached maximum number of favorites!\nPlease right click on a city to remove it from favorites.');
    }else if(cityname!=' ' && !favarr.includes(cityname)){
        addToFavorites(cityname, regionname);
        
    }
});

function addToFavorites(cityName, regionName) {
    favarr[favarr.length] = cityName;
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();

}

document.getElementById('city1').addEventListener('click', function() {
    fetchWeather(document.getElementById('city1').textContent);
});
document.getElementById('city2').addEventListener('click', function() {
    fetchWeather(document.getElementById('city2').textContent);
});
document.getElementById('city3').addEventListener('click', function() {
    fetchWeather(document.getElementById('city3').textContent);
});
document.getElementById('city4').addEventListener('click', function() {
    fetchWeather(document.getElementById('city4').textContent);
});
document.getElementById('city5').addEventListener('click', function() {
    fetchWeather(document.getElementById('city5').textContent);
});


document.getElementById('city1').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if(favarr.length>1){
    const index = favarr.indexOf(document.getElementById('city1').textContent);
    favarr.splice(index, 1);
    }else{
        favarr.pop();
    }
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();
    return false;
}, false);
document.getElementById('city2').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if(favarr.length>1){
        const index = favarr.indexOf(document.getElementById('city2').textContent);
        favarr.splice(index, 1);
        }else{
            favarr.pop();
        }
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();
    return false;
}, false);
document.getElementById('city3').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if(favarr.length>1){
        const index = favarr.indexOf(document.getElementById('city3').textContent);
        favarr.splice(index, 1);
        }else{
            favarr.pop();
        }
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();
    return false;
}, false);
document.getElementById('city4').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if(favarr.length>1){
        const index = favarr.indexOf(document.getElementById('city4').textContent);
        favarr.splice(index, 1);
        }else{
            favarr.pop();
        }
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();
    return false;
}, false);
document.getElementById('city5').addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if(favarr.length>1){
        const index = favarr.indexOf(document.getElementById('city5').textContent);
        favarr.splice(index, 1);
        }else{
            favarr.pop();
        }
    localStorage['fav']= JSON.stringify(favarr);
    fetchandshow();
    return false;
}, false);
