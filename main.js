const temp = document.getElementById("temp");
const feel = document.getElementById("feel");

function getWeatherData(URL) {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = `${data.main.temp}&deg;`;
      feel.innerHTML += ` ${data.main.feels_like}&deg;`;
      console.log(data);
    })
    .catch((error) => console.error(error));
}

getWeatherData(
  "https://api.openweathermap.org/data/2.5/weather?q=Saskatoon&units=metric&appid=cd7cf846784f6e5c6eb7118f9a8f8e37"
);
