import "./css/style.css";
import axios from "axios";
interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

async function fetchWeather(city: string): Promise<WeatherResponse | null> {
  const apiKey: string = "";
  const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Error fetching weather data", err);
    return null;
  }
}

function updateWeatherUI(data: WeatherResponse): void {
  const temprature: number = data.main.temp;
  const description: string = data.weather[0].description;
  const tempratureElement: HTMLSpanElement = document.getElementById(
    "temprature"
  ) as HTMLSpanElement;
  if (tempratureElement) {
    tempratureElement.textContent = `${temprature}°C`;
  }
  const descriptionElement: HTMLSpanElement = document.getElementById(
    "description"
  ) as HTMLSpanElement;
  if (descriptionElement) {
    descriptionElement.textContent = `${description}`;
  }
}

document
  .getElementById("weatherForm")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityInput: string = (
      document.getElementById("city") as HTMLInputElement
    ).value;
    const weatherData = await fetchWeather(cityInput);
    if (weatherData) {
      updateWeatherUI(weatherData);
    }
  });
