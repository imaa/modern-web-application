const cp = require("child_process");
const part1Process = cp.spawn("node", ["./part1"], { stdio: "inherit" });
const part2Process = cp.spawn("node", ["./part2"], { stdio: "inherit" });
const part3Process = cp.spawn("node", ["./part3"], { stdio: "inherit" });
const part4Process = cp.spawn("node", ["./part4"], { stdio: "inherit" });
