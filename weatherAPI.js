// This script fetch the weather of Bogota, Colombia when the html
// is loaded, and shows different offers depending on weather conditions.

// variables to call the weather API
const cityName = "Bogota";
const countryCode = "COL";
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${APIkey}&units=metric`;

// initialize the isGoodDay variable to false in case the api fails
let isGoodDay = false;

// function that fetch the weather api and calls the other functions
function getWeatherData(url) {
    console.log(url);
    fetch(url)
      .then(resp => resp.json())
      .then(analizeWeather)
      .then(createContent)
}
// function that checks if the weather conditions are good and change the isGoodDay variable if that is the case
function analizeWeather(data) {
    const goodDay = [800, 801, 802]; //weather group ids of clear and less than 50% clouds conditions
    const currentWeatherId = data.weather[0].id;
    if (goodDay.includes(currentWeatherId)) {
        console.log("It is a good day to go outside and enjoy a delicious ice cream");
        isGoodDay = true;
    } else {
        console.log("It is a perfect day to order ice cream and watch movies at home")
    }
    console.log(currentWeatherId);
}

// functions that creates different prices for the products depending on weather conditions
function createContent() {
    const pricesDiv = document.getElementById("prices");
    if (isGoodDay) { //prices when the weather conditions are good
        pricesDiv.innerHTML = `
        <h2>Sunny offers</h2>
        <p>It is a good day to go outside and enjoy a delicious ice cream.</p>
        <div class="prices-table">
        <div class="item-price">
        <h4>Vainilla ice cream</h4>
        <p class="price">$15</p>
        <p class="description">
        1L of delicious vainilla ice cream
        </p>
        </div>
        <div class="item-price">
        <h4>Chocolate ice cream</h4>
        <p class="price">$15</p>
        <p class="description">
        1L of delicious chocolate ice cream
        </p>
        </div>
        <div class="item-price">
        <h4>Cookies &amp; Cream</h4>
        <p class="price">$17</p>
        <p class="description">
        1L of delicious Cookies &amp; Cream ice cream
        </p>
        </div>
        </div>
        `
    } else { //prices when the weather conditions are bad
        pricesDiv.innerHTML = `
        <h2>Rainy offers</h2>
        <p>It is a perfect day to order ice cream and watch movies at home.</p>
        <div class="prices-table">
        <div class="item-price">
        <h4>Vainilla ice cream</h4>
        <p class="price">$12</p>
        <p class="description">
        1L of delicious vainilla ice cream
        </p>
        </div>
        <div class="item-price">
        <h4>Chocolate ice cream</h4>
        <p class="price">$12</p>
        <p class="description">
        1L of delicious chocolate ice cream
        </p>
        </div>
        <div class="item-price">
        <h4>Cookies &amp; Cream</h4>
        <p class="price">$15</p>
        <p class="description">
        1L of delicious Cookies &amp; Cream ice cream
        </p>
        </div>
        </div>
        `
    }
}

// call the api and other functions when the html is loaded
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData(weatherUrl);
})


