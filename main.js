const temp = document.getElementById("temp");
const feel = document.getElementById("feel");
const city = document.getElementById("city");
const desc = document.getElementById("desc");
const icon = document.querySelector("#icon > img");
const locSelect = document.querySelector("#location");
let activeIntervals = new Set();

function capitalizeWords(string) {
  const words = string.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

async function getWeatherData(URL) {
  const response = await fetch(URL);
  if (response.status === 200) {
    const data = await response.json();
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
    city.innerHTML = `${data.name}`;
    feel.innerHTML = `Feels Like: ${data.main.feels_like}&deg;C`;
    desc.innerHTML = `${capitalizeWords(data.weather[0].description)}`;
  } else {
    for (const id of activeIntervals) {
      clearInterval(id);
    }
    icon.src = "./assets/weathericons/sad-face.png";
    temp.innerHTML = null;
    city.innerHTML = "Invalid City Request";
    feel.innerHTML = "(Please Enter a Valid City)";
    desc.innerHTML = null;
  }
}

async function updateWeather(city = "Saskatoon") {
  const intervalId = setInterval(() => {
    getWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cd7cf846784f6e5c6eb7118f9a8f8e37`
    );
  }, 1000);
  activeIntervals.add(intervalId);
}

updateWeather();

locSelect.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let city = locSelect.value;
    if (locSelect.value.trim()) {
      if (activeIntervals.size) {
        for (const id of activeIntervals) {
          clearInterval(id);
        }
      }
    }
    updateWeather(city).then(() => (locSelect.value = null));
  }
});
