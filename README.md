# Weather-App
basic weather app
Basic weather app where user input is through speech.
The user can give a sentence (ex: "What is the weather in Raleigh North Carolina?", or just simply a city and state name) and the speech recognition will take that in and validation will happen with an output of data from APIs. 
The given city and state will be read out loud using the same speech recognition platform.

Two APIs are used in this. 
The first is a geocoding API, which is used to determine the latitude and longitude of the city and state. The coordinates are then passed to the second API. 
The second is the weather API, which takes in the coordinates and gives a more accurate weather reading.
