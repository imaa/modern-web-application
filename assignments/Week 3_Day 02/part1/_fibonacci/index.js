async function fibonacci(number) {
  return new Promise(async (resolve, reject) => {
    try {
      if (number < 0) {
        resolve(0);
        return;
      }
      if (number <= 2) {
        resolve(1);
        return;
      }
      resolve((await fibonacci(number - 1)) + (await fibonacci(number - 2)));
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = fibonacci;
