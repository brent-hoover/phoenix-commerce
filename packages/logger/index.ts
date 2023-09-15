import chalk from "chalk";

const cliName = "[bun-commerce]";

export default function log(msg: string) {
  console.log(`${chalk.blueBright(cliName)}: ${chalk.white(msg)}`);
}
