var city = '';
var state = '';
var cs = '';

var today = new Date();
var hour = today.getHours();

const button = document.querySelector('.button');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('microphone is on');
};

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    console.log(transcript);
    console.log(event);

    //displays the speech on the page through 'content' h3 tag
    content.textContent = transcript;

    readOutLoud(transcript);
}

button.addEventListener('click', () => {
    recognition.start();
})

button.addEventListener("touchstart", () => {
    recognition.start();
})

function readOutLoud(message){
    city = '';
    state = '';
    cs = '';
    const speech = new SpeechSynthesisUtterance();

    for(var i = 0; i<cities.length; i++){
        if(message.includes(cities[i])){
            city = cities[i];
            console.log(city + ' is in the array');
        }
    }

    for(var i = 0; i<states.length; i++){
        if(message.includes(states[i])){
            state = states[i];
            console.log(state + ' is in the array');
        }
    }

    //start of state declarations - full state name to letters
    speech.text ='Here is the weather for '+ city + ', ' + state;

    var tempLoc = city+','+state;

    for(var i = 0; i<cityState.length; i++){
        if(tempLoc.includes(cityState[i])){
            cs = cityState[i];
            console.log(cs + ' is in the array');
        }
    }

    if(city !='' && state !='' && cs !=''){
        console.log("test before api calls here")
        //geocoding api call
        const geocodingapi = 'https://geocode.maps.co/search?q=';
        const geocodingapiKey = '65d2ac906f524460848773rat340c5c';
        const locationForGeo = city+'+'+state;
        const geocodingUrl = geocodingapi+locationForGeo+'&api_key='+geocodingapiKey;

        $.getJSON(geocodingUrl, 
            function(data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                var location = city+','+state;

                $(".location-zone").text(location);
                    
                //weather api call
                const weatherapi = 'https://api.openweathermap.org/data/2.5/weather?';
                const unitType = 'imperial';
                const weatherapiKey = 'a5b70ff8327851e082d72dab4d181c5d';
                const weatherUrl = weatherapi+'lat='+latitude+'&lon='+longitude+'&units='+unitType+'&APPID='+weatherapiKey;

                $.getJSON(weatherUrl, 
                    function(data) {
                        var imageId = document.getElementById("temperature-icon");
                        var temperature = Math.round(data.main.temp);
                        var humidity = Math.round(data.main.humidity);
                        var desc = data.weather[0].description;
                        var mainWeather = data.weather[0].main;
                        var temperatureMin = Math.round(data.main.temp_min);
                        var temperatureMax = Math.round(data.main.temp_max);
                        const weatherIconMap = new Map();

                        weatherIconMap.set('Clear', "./assets/icons/sun.svg");
                        weatherIconMap.set('Clouds', "./assets/icons/cloud.svg");
                        weatherIconMap.set('Drizzle', "./assets/icons/rain.svg");
                        weatherIconMap.set('Rain', "./assets/icons/rain.svg");
                        weatherIconMap.set('Thunderstorm', "./assets/icons/storm.svg");
                        weatherIconMap.set('Snow', "./assets/icons/snowflake.svg");
                        weatherIconMap.set('Mist', "./assets/icons/windy.svg");
                        weatherIconMap.set('Smoke', "./assets/icons/windy.svg");
                        weatherIconMap.set('Haze', "./assets/icons/windy.svg");
                        weatherIconMap.set('Dust', "./assets/icons/windy.svg");
                        weatherIconMap.set('Fog', "./assets/icons/windy.svg");
                        weatherIconMap.set('Sand', "./assets/icons/windy.svg");
                        weatherIconMap.set('Ash', "./assets/icons/windy.svg");
                        weatherIconMap.set('Squall', "./assets/icons/windy.svg");
                        weatherIconMap.set('Tornado', "./assets/icons/windy.svg");

                        weatherIcon = weatherIconMap.get(mainWeather)
                        imageId.setAttribute("src", weatherIcon)

                        $(".temperature-degree").text(temperature+'ºf');
                        $(".temperature-humidity").text('humidity: '+humidity+'%');
                        $(".temperature-desc").text(desc);
                        $(".temperature-degree-min").text('LO '+temperatureMin+'ºf');
                        $(".temperature-degree-max").text('HI '+temperatureMax+'ºf');
                });
            }
        );
    }
    else{
        speech.text = 'Choose a correct city and state!';
    }

    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}