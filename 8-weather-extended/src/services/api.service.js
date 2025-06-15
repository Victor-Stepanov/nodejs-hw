import axios from "axios";
import { API_URL, TOKEN_DICTIONARY } from "../constants.js";
import { getKeyValue } from "./storage.service.js";

const getWeather = async () => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его с помощью -t [API_KEY] для сохранения токена"
    );
  }

  const cities = (await getKeyValue(TOKEN_DICTIONARY.cities)) ?? [];

  if (!cities.length) {
    throw new Error("Укажите минимум один город");
  }

  const language = await getKeyValue(TOKEN_DICTIONARY.language);

  const fetchDataArray = await Promise.allSettled(
    cities.map(async (city) => {
      const { data } = await axios.get(API_URL, {
        params: {
          q: city,
          appid: token,
          lang: language,
          units: "metric",
        },
      });
      return data;
    })
  );

  const successFetchedData = fetchDataArray.filter(
    (data) => data.status === "fulfilled"
  );

  return successFetchedData;
};

export { getWeather };
