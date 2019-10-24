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

button.addEventListener('touchstart', () => {
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
            break;
        }
    }

    for(var i = 0; i<states.length; i++){
        if(message.includes(states[i])){
            state = states[i];
            console.log(state + ' is in the array');
            break;
        }
    }

    //start of state declarations - full state name to letters
    speech.text ='Here is the weather for '+ city + ', ' + state;

    if(message.includes('Alabama')){
        state = 'AL';
    }
    if(message.includes('Alaska')){
        state = 'AK';
    }
    if(message.includes('Arizona')){
        state = 'AZ';
    }
    if(message.includes('Arkansas')){
        state = 'AR';
    }
    if(message.includes('California')){
        state = 'CA';
    }
    if(message.includes('Colorado')){
        state = 'CO';
    }
    if(message.includes('Connecticut')){
        state = 'CT';
    }
    if(message.includes('Delaware')){
        state = 'DE';
    }
    if(message.includes('Florida')){
        state = 'FL';
    }
    if(message.includes('Georgia')){
        state = 'GA';
    }
    if(message.includes('Hawaii')){
        state = 'HI';
    }
    if(message.includes('Idaho')){
        state = 'ID';
    }
    if(message.includes('Illinois')){
        state = 'IL';
    }
    if(message.includes('Indiana')){
        state = 'IN';
    }
    if(message.includes('Iowa')){
        state = 'IA';
    }
    if(message.includes('Kansas')){
        state = 'KS';
    }
    if(message.includes('Kentucky')){
        state = 'KY';
    }
    if(message.includes('Louisiana')){
        state = 'LA';
    }
    if(message.includes('Maine')){
        state = 'ME';
    }
    if(message.includes('Maryland')){
        state = 'MD';
    }
    if(message.includes('Massachusetts')){
        state = 'MA';
    }
    if(message.includes('Michigan')){
        state = 'MI';
    }
    if(message.includes('Minnesota')){
        state = 'MN';
    }
    if(message.includes('Mississippi')){
        state = 'MS';
    }
    if(message.includes('Missouri')){
        state = 'MO';
    }
    if(message.includes('Montana')){
        state = 'MT';
    }
    if(message.includes('Nebraska')){
        state = 'NE';
    }
    if(message.includes('Nevada')){
        state = 'NV';
    }
    if(message.includes('New Hampshire')){
        state = 'NH';
    }
    if(message.includes('New Jersey')){
        state = 'NJ';
    }
    if(message.includes('New Mexico')){
        state = 'NM';
    }
    if(message.includes('New York')){
        state = 'NY';
    }
    if(message.includes('North Carolina')){
        state = 'NC';
    }
    if(message.includes('North Dakota')){
        state = 'ND';
    }
    if(message.includes('Ohio')){
        state = 'OH';
    }
    if(message.includes('Oklahoma')){
        state = 'OK';
    }
    if(message.includes('Oregon')){
        state = 'OR';
    }
    if(message.includes('Pennsylvania')){
        state = 'PA';
    }
    if(message.includes('Rhode Island')){
        state = 'RI';
    }
    if(message.includes('South Carolina')){
        state = 'SC';
    }
    if(message.includes('South Dakota')){
        state = 'SD';
    }
    if(message.includes('Tennessee')){
        state = 'TN';
    }
    if(message.includes('Texas')){
        state = 'TX';
    }
    if(message.includes('Utah')){
        state = 'UT';
    }
    if(message.includes('Vermont')){
        state = 'VT';
    }
    if(message.includes('Virginia')){
        state = 'VA';
    }
    if(message.includes('Washington')){
        state = 'WA';
    }
    if(message.includes('West Virginia')){
        state = 'WV';
    }
    if(message.includes('Wisconsin')){
        state = 'WI';
    }
    if(message.includes('Wyoming')){
        state = 'WY';
    }

    var tempLoc = city+','+state;
    console.log(tempLoc);

    for(var i = 0; i<cityState.length; i++){
        if(tempLoc.includes(cityState[i])){
            cs = cityState[i];
            console.log(cs + ' is in the array');
            break;
        }
    }

    if(city !='' && state !='' && cs !=''){
        //geocoding api call
        const geocodingapi = 'http://open.mapquestapi.com/geocoding/v1/address?';
        const geocodingapiKey = 'gSPCRHTm8M2qPeoups5ARoWAYvKAJ3Cn';
        const locationForGeo = '&location='+city+','+state;
        const geocodingUrl = geocodingapi+'key='+geocodingapiKey+locationForGeo;
        console.log(geocodingUrl);

        $.getJSON(geocodingUrl, 
            function(data) {
                console.log(data);

                var latitude = data.results[0].locations[0].latLng.lat;
                var longitude = data.results[0].locations[0].latLng.lng;
                var location = data.results[0].providedLocation.location;

                console.log(location);

                $(".location-zone").text(location);
                    
                //weather api call
                const weatherapi = 'http://api.openweathermap.org/data/2.5/weather?';
                const unitType = 'imperial';
                const weatherapiKey = 'a5b70ff8327851e082d72dab4d181c5d';
                const weatherUrl = weatherapi+'lat='+latitude+'&lon='+longitude+'&units='+unitType+'&APPID='+weatherapiKey;
                console.log(weatherUrl);

                $.getJSON(weatherUrl, 
                    function(data) {
                        console.log(data);

                        var imageId = document.getElementById("temperature-icon");

                        var temperature = Math.round(data.main.temp);
                        var humidity = Math.round(data.main.humidity);
                        var desc = data.weather[0].description;
                        var mainWeather = data.weather[0].main;
                        var temperatureMin = Math.round(data.main.temp_min);
                        var temperatureMax = Math.round(data.main.temp_max);

                        console.log(temperature);
                        console.log(humidity);
                        console.log(desc);
                        console.log(mainWeather);
                        console.log(temperatureMin);
                        console.log(temperatureMax);

                        if(mainWeather=='Clear'){
                            imageId.setAttribute("src", "./assets/icons/sun.svg");
                        }
                        if(mainWeather=='Clouds'){
                            imageId.setAttribute("src", "./assets/icons/cloud.svg");
                        }
                        if(mainWeather=='Drizzle'){
                            imageId.setAttribute("src", "./assets/icons/rain.svg");                            
                        }
                        if(mainWeather=='Rain'){
                            imageId.setAttribute("src", "./assets/icons/rain.svg");                            
                        }
                        if(mainWeather=='Thunderstorm'){
                            imageId.setAttribute("src", "./assets/icons/storm.svg");                            
                        }
                        if(mainWeather=='Snow'){
                            imageId.setAttribute("src", "./assets/icons/snowflake.svg");                            
                        }
                        if(mainWeather=='Mist'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Smoke'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Haze'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Dust'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Fog'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Sand'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Ash'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Squall'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }
                        if(mainWeather=='Tornado'){
                            imageId.setAttribute("src", "./assets/icons/windy.svg");                            
                        }

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