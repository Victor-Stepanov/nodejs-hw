const EventEmitter = require("node:events");

const { add, multiply } = require("./operations");

const OPERATIONS_MAP = {
  add,
  multiply,
};

const EVENTS_TYPE = {
  CALCULATE_RESULT: "calculate",
  GET_RESULT: "result",
  GET_ERROR: "error",
};

const DEFAULT_ERROR_MSG = "Ошибка при выполнении операции";

const myEmitter = new EventEmitter();

myEmitter.on(EVENTS_TYPE.CALCULATE_RESULT, (a, b, mathOperation) => {
  myEmitter.emit(EVENTS_TYPE.GET_RESULT, OPERATIONS_MAP[mathOperation](a, b));
});

myEmitter.on(EVENTS_TYPE.GET_RESULT, console.log);

myEmitter.on(EVENTS_TYPE.GET_ERROR, console.error);

function main() {
  const [, , firstValue, secondValue, mathOperation] = process.argv;

  if (!firstValue || !secondValue || !mathOperation) {
    myEmitter.emit(
      EVENTS_TYPE.GET_ERROR,
      "Допущена ошибка при выполнении команды\nПример корректной команды: node main 2 2 add"
    );

    return;
  }

  try {
    myEmitter.emit(
      EVENTS_TYPE.CALCULATE_RESULT,
      firstValue,
      secondValue,
      mathOperation
    );
  } catch {
    myEmitter.emit(EVENTS_TYPE.GET_ERROR, DEFAULT_ERROR_MSG);
  } finally {
    myEmitter.removeAllListeners();
  }
}

main();
