import chalk from "chalk";

export const getIcon = (icon) => {
  const code = icon.slice(0, -1);
  const isNight = icon.endsWith("n");

  switch (code) {
    case "01":
      return isNight ? "🌙" : "☀️";
    case "02":
      return isNight ? "☁️" : "⛅";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return isNight ? "🌧️" : "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
    default:
      return "🌡️";
  }
};

export const getTemperatureColor = (temp) => {
  if (temp > 30) return chalk.red.bold(`${temp}°C`);
  if (temp > 20) return chalk.yellow.bold(`${temp}°C`);
  if (temp > 5) return chalk.green.bold(`${temp}°C`);
  return chalk.blue.bold(`${temp}°C`);
};

export const getWindDirection = (deg, directions) => {
  return directions[Math.round((deg % 360) / 45) % 8];
};
