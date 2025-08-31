const temp = document.getElementById("temp");
const feel = document.getElementById("feel");
const city = document.getElementById("city");
const desc = document.getElementById("desc");
const icon = document.querySelector("#icon > img");

function capitalizeWords(string) {
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

function getWeatherData(URL) {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      let iconId = data.weather[0].icon;
      if (iconId === "01d" || iconId === "01n") {
        icon.src = "./assets/weathericons/sun.png";
        icon.alt = "sun";
      } else if (iconId === "02d" || iconId === "02n") {
        icon.src = "./assets/weathericons/cloudy-day.png";
        icon.alt = "sunny cloud";
      } else if (iconId === "03d" || iconId === "03n") {
        icon.src = "./assets/weathericons/cloud.png";
        icon.alt = "cloud";
      } else if (iconId === "04d" || iconId === "04n") {
        icon.src = "./assets/weathericons/cloudy.png";
        icon.alt = "broken cloud";
      } else if (
        iconId === "09d" ||
        iconId === "09d" ||
        iconId === "10d" ||
        iconId === "10n"
      ) {
        icon.src = "./assets/weathericons/rainy.png";
        icon.alt = "rain";
      } else if (iconId === "11d" || iconId === "11n") {
        icon.src = "./assets/weathericons/thunderstorm.png";
        icon.alt = "thunderstorm";
      } else if (iconId === "13d" || iconId === "13n") {
        icon.src = "./assets/weathericons/snow.png";
        icon.alt = "snowflake";
      } else if (iconId === "50d" || iconId === "50n") {
        icon.src = "./assets/weathericons/mist.png";
        icon.alt = "windy/mist";
      } else {
        icon.alt = "We currently don't have the image you're looking for.";
      }
      temp.innerHTML = `${data.main.temp}&deg;C`;
      feel.innerHTML = `Feels Like: ${data.main.feels_like}&deg;C`;
      city.innerHTML = `${data.name}`;
      desc.innerHTML = `${capitalizeWords(data.weather[0].description)}`;
    })
    .catch((error) => console.error(error));
}

getWeatherData(
  "https://api.openweathermap.org/data/2.5/weather?q=Saskatoon&units=metric&appid=cd7cf846784f6e5c6eb7118f9a8f8e37"
);

setInterval(
  () =>
    getWeatherData(
      "https://api.openweathermap.org/data/2.5/weather?q=Saskatoon&units=metric&appid=cd7cf846784f6e5c6eb7118f9a8f8e37"
    ),
  1500
);
