const fibonacci = require("./_fibonacci");

fibonacci(30)
  .then((result) => {
    console.log(`Fibonacci of 30 is`, result);
  })
  .catch((err) => {
    console.error(err);
  });
fibonacci(-10)
  .then((result) => {
    console.log(`Fibonacci of -10 is`, result);
  })
  .catch((err) => {
    console.error(err);
  });
