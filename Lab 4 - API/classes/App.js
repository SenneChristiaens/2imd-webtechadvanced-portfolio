export default class App {
    constructor(API_KEY) {
        this.lat = 0;
        this.lng = 0;
        this.API_KEY = API_KEY;
        this.getLocation();
    }

    // geolocatie opvragen -> mdn geolocation API
    getLocation() {
        navigator.geolocation.getCurrentPosition(this.locationSucces.bind(this), this.locationError.bind(this)); // navigator is de browser
    }
    // opvragen gelukt
    locationSucces(location) {
        // console.log(location);
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.getWeather();
    }
    // opvragen mislukt
    locationError(error) {
        console.log(error);
    }

    // OpenWeather API -> Current Weather Data
    getWeather() {
        // API key = 6045a091342bd776dd0213c064c8c027
        console.log("Getting weather");
        // API call
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY}`;
        console.log(url);

        // MDN fetch API
        fetch(url).then( response => {
            return response.json(); // antwoord omzetten naar json
        } ).then( json => {
            // hier iets met json gaan doen
            this.printWeather(json);
            console.log(json);
        } ).catch( error => {
            console.log(error);
        }).finally( () => {
            console.log("finally done");
        } );
    }

    printWeather(json) {
        let summary = json.weather[0].description;
        let temp = Math.round(json.main.temp);
        let place = json.name;
        let maxTemp = Math.round(json.main.temp_max);
        let minTemp = Math.round(json.main.temp_min);

        document.querySelector(".summary").innerHTML = summary;
        document.querySelector(".temp").innerHTML = temp + "°";
        document.querySelector(".place").innerHTML = place;
        document.querySelector(".max").innerHTML = "max: " + maxTemp + "°";
        document.querySelector(".min").innerHTML = "min: " + minTemp + "°";

        // data teruggeven
        this.getSports();
        localStorage.getItem(place, summary, temp);

        let description = [];
        description.push(place)
        description.push(summary)
        description.push(temp)
        localStorage.setItem("currentTemp", JSON.stringify(temp));
        localStorage.setItem("weather", JSON.stringify(description));

        description = localStorage.getItem("weather");
        json = JSON.parse(weather);
    }
    
    // tweede API
    getSports() {
        // API key = 6045a091342bd776dd0213c064c8c027
        console.log("Getting sports");
        // API call
        let urlsports = `https://www.thesportsdb.com/api/v1/json/2/all_sports.php`;
        console.log(urlsports);
    
        // MDN fetch API
        fetch(urlsports).then( response => {
            return response.json(); // antwoord omzetten naar json
        } ).then( json => {
            // hier iets met json gaan doen
            if(localStorage.getItem("currentTemp") <= 13){
                this.printColdSport(json);
            }
            else {
                this.printWarmSport(json);
            }
            
        } ).catch( error => {
            console.log(error);
        }).finally( () => {
            console.log("got sports");
        } );
    }

    printColdSport(json) {
        let sport = json.sports[6].strSport;
        let sportThumb = json.sports[6].strSportThumb;
    
        document.querySelector(".sport").innerHTML = "It's pretty chilly today time for some " + sport + "!";
        document.querySelector(".sport-thumb").src = sportThumb;
        document.querySelector(".body").style.backgroundImage = "url('images/ice.jpeg')";
        document.querySelector(".body").style.color = "black";
    
        // data teruggeven
        localStorage.getItem(sport, sportThumb);
    
        let sportInfo = [];
        sportInfo.push(sport);
        sportInfo.push(sportThumb);
        localStorage.setItem("sports", JSON.stringify(sportInfo));
    
        description = localStorage.getItem("sport");    
    }
    
    printWarmSport(json) {
        let sport = json.sports[0].strSport;
        let sportThumb = json.sports[0].strSportThumb;
    
        document.querySelector(".sport").innerHTML = "It's quite warm, let's play some " + sport + "!";
        document.querySelector(".sport-thumb").src = sportThumb;
        document.querySelector(".body").style.backgroundImage = "url('images/grass.jpeg')";
        document.querySelector(".body").style.color = "white";

    
        // data teruggeven
        localStorage.getItem(sport, sportThumb);
    
        let sportInfo = [];
        sportInfo.push(sport);
        sportInfo.push(sportThumb);
        localStorage.setItem("sports", JSON.stringify(sportInfo));
    
        description = localStorage.getItem("sport");    
    }   
        
        // https://www.thesportsdb.com/api/v1/json/2/all_sports.php
}

// 6e1cac7a40779b5ce2a25191e7eaf33d94677c26