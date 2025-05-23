const { parentPort, workerData } = require("node:worker_threads");

function compute({ array }) {
  const { divisionBy } = require("./utils");

  return divisionBy(array);
}

parentPort.postMessage(compute(workerData));
