import { init } from "./util.js";

const main = async () => {
  console.log(
    "%cWelcome to quote app!",
    "background-color: green; color: white;padding : 10px;"
  );

  await init();
};

main();
