const doTask = (taskName) => {
  const begin = Date.now();
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const end = Date.now();
      const timeSpent = end - begin + "ms";
      console.log(
        "\x1b[36m",
        "[TASK] FINISHED: " + taskName + " in " + timeSpent,
        "\x1b[0m"
      );
      resolve(true);
    }, Math.random() * 200);
  });
};

const manageConcurrency = async (
  taskList,
  counter,
  concurrencyMax,
  concurrencyCurrent
) => {
  setTimeout(() => {
    concurrencyMax = 2;
    console.log(`***** changing concurrency to ${concurrencyMax} *****`);
  }, 200);

  new Promise((resolve, reject) => {
    Array(concurrencyMax)
      .fill(0)
      .forEach(() => {
        startTask();
      });

    function handleEndTask() {
      concurrencyCurrent--;
      if (counter >= taskList.length) {
        if (concurrencyCurrent <= 0) {
          resolve();
        }
        return;
      }

      if (concurrencyCurrent >= concurrencyMax) {
        return;
      }

      startTask();
    }

    function startTask() {
      console.log(
        `[EXE] Concurrency: ${concurrencyCurrent + 1} of ${concurrencyMax}`
      );
      console.log(`[EXE] Task count ${counter} of ${numberOfTasks}`);
      console.log(`\x1b[31m [TASK] STARTING: ${taskList[counter]} \x1b[0m`);
      doTask(taskList[counter]).then(handleEndTask);
      counter++;
      concurrencyCurrent++;
    }
  });
};

async function init() {
  numberOfTasks = 20;
  const concurrencyMax = 4;
  const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))]
      .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
      .join("")
  );
  const counter = 0;
  const concurrencyCurrent = 0;
  console.log("[init] Concurrency Algo Testing...");
  console.log("[init] Tasks to process: ", taskList.length);
  console.log("[init] Task list: " + taskList);
  console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n");

  await manageConcurrency(
    taskList,
    counter,
    concurrencyMax,
    concurrencyCurrent
  );
}

init();
