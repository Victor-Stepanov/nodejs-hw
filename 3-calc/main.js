const { add, multiply } = require("./operations");

const OPERATIONS_MAP = {
  add,
  multiply,
};

const DEFAULT_ERROR_MSG = "Ошибка при выполнении операции";

function main() {
  const [, , firstValue, secondValue, mathOperation] = process.argv;

  if (!firstValue || !secondValue || !mathOperation) {
    console.log(
      "Допущена ошибка при выполнении команды\nПример корректной команды: node main 2 2 add"
    );
    return;
  }

  try {
    return OPERATIONS_MAP[mathOperation](firstValue, secondValue);
  } catch {
    throw new Error(DEFAULT_ERROR_MSG);
  }
}

main();
