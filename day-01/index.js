const process = require("child_process");
const child_process = process.spawn("node", ["./_fibonacci"], {
  stdio: "inherit",
});
