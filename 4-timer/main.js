const EventEmitter = require("node:events");

const timerEmitter = new EventEmitter();

// constants
const EVENT_START = "START";
const EVENT_END = "END";
const EVENT_ERROR = "ERROR";

//utils
function convertToMls(args) {
  const [hours, minutes, seconds] = args;

  return (hours || 0 * 60 * 60 + minutes || 0 * 60 + seconds) * 1000;
}

let timerId;

timerEmitter.on(EVENT_START, (mls) => {
  console.log(`Таймер установлен на: ${mls} мc`);

  timerId = setTimeout(() => {
    timerEmitter.emit(EVENT_END, "Время вышло");
  }, mls);
});

timerEmitter.on(EVENT_ERROR, (msg) => {
  console.error(msg);
});

timerEmitter.on(EVENT_END, (msg) => {
  console.log(msg);
  clearTimeout(timerId);
});

function setTimer() {
  const args = process.argv.slice(2);

  if (!args.length) {
    timerEmitter.emit(
      EVENT_ERROR,
      "Допущена ошибка при выполнении команды\nПример корректной команды: node main 1 23 33"
    );

    return;
  }

  try {
    const mls = convertToMls(args);

    timerEmitter.emit(EVENT_START, mls);
  } catch (error) {
    timerEmitter.emit(EVENT_ERROR, error.message);
  }
}

setTimer();
