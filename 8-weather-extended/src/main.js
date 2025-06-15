import { TOKEN_DICTIONARY } from "./constants.js";
import { getWeather } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";
import { getArgs } from "./utils/args.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Нужно указать город, для получения погоды");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.cities, city, { append: true });
    printSuccess("Город успешно сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const saveLanguage = async (language = "ru") => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.language, language);
    printSuccess("Язык сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const getForCast = async () => {
  try {
    const weather = await getWeather();
    const language = await getKeyValue(TOKEN_DICTIONARY.language);
    printWeather(weather, language);
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("Неверно указан город");
    } else if (error?.response?.status === 401) {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.lng) {
    return saveLanguage(args.lng);
  }
  return getForCast();
};

initCLI();
