export const TOKEN_DICTIONARY = {
  token: "token",
  cities: "cities",
  language: "language",
};

export const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const WEATHER_DICTIONARY = {
  ru: {
    WEATHER: "ПОГОДА",
    DESCRIPTION: "Описание",
    TEMPERATURE: "Температура",
    FEELS_LIKE: "Ощущается как",
    HUMIDITY: "Влажность",
    WIND: "Ветер",
    PRESSURE: "Давление",
    VISIBILITY: "Видимость",
    WIND_DIRECTION: "Направление ветра",
    WIND_UNIT: "м/с",
    PRESSURE_UNIT: "гПа",
    VISIBILITY_UNIT: "км",
    WIND_DIRECTIONS: ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"],
  },
  en: {
    WEATHER: "WEATHER",
    DESCRIPTION: "Description",
    TEMPERATURE: "Temperature",
    FEELS_LIKE: "Feels like",
    HUMIDITY: "Humidity",
    WIND: "Wind",
    PRESSURE: "Pressure",
    VISIBILITY: "Visibility",
    WIND_DIRECTION: "Wind direction",
    WIND_UNIT: "m/s",
    PRESSURE_UNIT: "hPa",
    VISIBILITY_UNIT: "km",
    WIND_DIRECTIONS: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  },
};
