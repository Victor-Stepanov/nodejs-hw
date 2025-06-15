import { promises } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const FILE_PATH = join(homedir(), "weather-data.json");

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};

const saveKeyValue = async (key, value, options) => {
  let data = {};

  if (await isExist(FILE_PATH)) {
    const file = await promises.readFile(FILE_PATH);
    data = JSON.parse(file);
  }

  if (options?.append) {
    if (!data[key]) {
      data[key] = [value];
    } else {
      data[key].push(value);
    }
  } else {
    data[key] = value;
  }
  await promises.writeFile(FILE_PATH, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(FILE_PATH)) {
    const file = await promises.readFile(FILE_PATH);

    return JSON.parse(file)[key];
  }

  return;
};

export { saveKeyValue, getKeyValue };
