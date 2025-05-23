/* 
Сгенерировать массив чисел от 1 до 300 000.
Нужно посчитать сколько чисел делиться на 3 без остатка. 
1. Сначала сделайте простым циклом и замерьте производительность.
2. Разбейте массив на N массивов, где N число ядер у вашего процессора. Выполните расчет для каждого массива в отдельном процессе и передайте результат обратно. 
Замерьте выполнения и сравните с пунктом 1.

*/
const { cpus } = require("node:os");
const { Worker } = require("node:worker_threads");

const { getChunks, divisionBy } = require("./utils");

const CPUS_COUNT = cpus().length;
const initialArray = Array.from({ length: 300000 }, (_, i) => i + 1);

function getSlowResult() {
  const start = Date.now();
  const count = divisionBy(initialArray);
  const end = Date.now();
  const duration = (end - start).toFixed(2);
  return { count, duration };
}

function getResultInThreads(array) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker", {
      workerData: {
        array,
      },
    });

    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error.message);
    });
  });
}

async function main(array) {
  try {
    console.log("\n🔍 Анализ производительности\n");
    console.log(`💻 Количество ядер процессора: ${CPUS_COUNT}`);
    console.log(`📊 Размер массива: ${array.length} элементов\n`);

    console.log("=== Однопоточная версия ===");
    const singleThreadResult = getSlowResult();
    console.log(
      `✅ Найдено чисел, делящихся на 3: ${singleThreadResult.count}`
    );
    console.log(`⏱️  Время выполнения: ${singleThreadResult.duration}ms\n`);

    console.log("\n=== Многопоточная версия ===");
    const chunks = getChunks(array, CPUS_COUNT);
    console.log(`📦 Размер чанка: ${chunks[0].length} элементов`);
    const start = Date.now();
    const promises = chunks.map((chunk) => getResultInThreads(chunk));
    const results = await Promise.all(promises);
    const multiThreadCount = results.reduce((sum, count) => sum + count, 0);
    const end = Date.now();
    const duration = (end - start).toFixed(2);
    console.log(`✅ Найдено чисел, делящихся на 3: ${multiThreadCount}`);
    console.log(`⏱️  Время выполнения: ${duration}ms`);
    console.log(
      `\n🔍 Проверка результатов: ${
        singleThreadResult.count === multiThreadCount
          ? "✅ Совпадают"
          : "❌ Не совпадают"
      }`
    );
  } catch (error) {
    console.error("❌ Ошибка:", error);
  }
}

main(initialArray);
