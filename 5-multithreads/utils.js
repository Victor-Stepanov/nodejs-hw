// Ф-ция разбиения массива по кол-во ядер
function getChunks(arr, cpus) {
  const result = [];
  const chunkSize = Math.ceil(arr.length / cpus);
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

// Ф-ция подсчета чисел,который делятся на 3 без остатка
function divisionBy(arr, number = 3) {
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % number === 0) {
      counter += 1;
    }
  }
  return counter;
}

module.exports = {
  getChunks,
  divisionBy,
};
