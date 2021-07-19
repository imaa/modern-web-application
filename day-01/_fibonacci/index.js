const fib = function (number) {
  if (number < 0) return 0;
  if (number <= 2) return 1;
  return fib(number - 1) + fib(number - 2);
};
console.log("Fibonacci of 30 is", fib(30));
console.log("Fibonacci of -10 is", fib(-10));
