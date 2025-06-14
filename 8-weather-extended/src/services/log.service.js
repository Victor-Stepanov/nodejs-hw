import chalk from "chalk";
import dedent from "dedent-js";
import {
  getIcon,
  getTemperatureColor,
  getWindDirection,
} from "../utils/weather.js";
import { WEATHER_DICTIONARY } from "../constants.js";

const printError = (errMessage) => {
  console.log(chalk.bgRed("ERROR") + " " + errMessage);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan("HELP")}
  Без параметров - вывод погоды
  -s [CITY] для установки города
  -h для вывода помощи
  -t [API_KEY] для сохранения токена
  `)
  );
};

const printWeather = (res, lang = "ru") => {
  const t = WEATHER_DICTIONARY[lang] || WEATHER_DICTIONARY.ru;

  res.forEach((el, index) => {
    const value = el.value;
    const weather = value.weather[0];

    if (index > 0) console.log(chalk.gray("-".repeat(50)));

    console.log(
      dedent`
      ${chalk.bgHex("#FFA500").black.bold(` ${t.WEATHER} `)} ${chalk
        .hex("#FF6347")
        .bold("→")} 
      ${chalk.bold.cyan(value.name)} ${getIcon(weather.icon)}
      
      ${chalk.bold(`${t.DESCRIPTION}:`)} ${chalk.italic(weather.description)}
      ${chalk.bold(`${t.TEMPERATURE}:`)} ${getTemperatureColor(value.main.temp)}
        ${chalk.gray(`${t.FEELS_LIKE}:`)} ${getTemperatureColor(
        value.main.feels_like
      )}
      ${chalk.bold(`${t.HUMIDITY}:`)} 💧 ${chalk.cyan(
        `${value.main.humidity}%`
      )}
      ${chalk.bold(`${t.WIND}:`)} 💨 ${chalk.cyan(
        `${value.wind.speed} ${t.WIND_UNIT}`
      )} 
        ${chalk.gray(`${t.WIND_DIRECTION}:`)} ${chalk.cyan(
        getWindDirection(value.wind.deg, t.WIND_DIRECTIONS)
      )} (${value.wind.deg}°)
      ${chalk.bold(`${t.PRESSURE}:`)} ${chalk.cyan(
        `${value.main.pressure} ${t.PRESSURE_UNIT}`
      )}
      ${chalk.bold(`${t.VISIBILITY}:`)} 👀 ${chalk.cyan(
        `${Math.round(value.visibility / 1000)} ${t.VISIBILITY_UNIT}`
      )}
      `
    );
  });
};

export { printError, printSuccess, printHelp, printWeather };
