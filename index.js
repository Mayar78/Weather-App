let todayName = document.getElementById("today_date_day_name");
let todayNumber = document.getElementById("today_date_day_number");
let todayMonth = document.getElementById("today_date_month");
let todayLocation = document.getElementById("today_location");
let todayTemp = document.getElementById("today_temp");
let todayConditionImg = document.getElementById("today_condition_img");
let todayConditionText = document.getElementById("today_condition_text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind_direction");

let nextDayName = document.getElementsByClassName("next_day_name");
let nextMaxTemp = document.getElementsByClassName("next_max_temp");
let nextMinTemp = document.getElementsByClassName("next_min_temp");


let nextConditionImg = document.getElementsByClassName("next_condition_img");
let nextConditionText = document.getElementsByClassName("next_condition_text");

let searchInput = document.getElementById("search");
let find = document.getElementById("find");

find.addEventListener("click", function () {
    weatherApp(searchInput.value);
})

async function getAPI(cityName) {
    let responce = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=20b5423eb47a45d185984307232402&q=${cityName}&days=3`);
    let data = await responce.json();
    return data;
}
function displayToday(data) {
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionText.inert = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.humidity + ' km/h';
    windDirection.innerHTML = data.current.wind_dir;

    let today = new Date();
    todayName.innerHTML = today.toLocaleDateString("en-US", { weekday: "long" });
    todayNumber.innerHTML = today.getDate();
    todayMonth.innerHTML = today.toLocaleDateString("en-Us", { month: "long" });

}

function displayNextDay(data) {
    let nextDay = data.forecast.forecastday;


    for (let i = 0; i < 2; i++) {

        let nextDate = new Date(nextDay[i + 1].date);


        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-Us", { weekday: "long" })
        nextMaxTemp[i].innerHTML = nextDay[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = nextDay[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute('src', nextDay[i + 1].day.condition.icon);
        nextConditionText[i].innerHTML = nextDay[i + 1].day.condition.text;

    }
}
searchInput.addEventListener("input", function () {
    if (this.value == '') {
        weatherApp("cairo")
    }
    if(this.value.length>2){  
        weatherApp(this.value)
    }


})

async function weatherApp(city = "cairo") {
    let weatherData = await getAPI(city);
    
    if (!weatherData.error) {
        displayToday(weatherData);
        displayNextDay(weatherData);
    }


}
weatherApp()






