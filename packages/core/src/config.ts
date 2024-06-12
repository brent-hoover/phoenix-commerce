import { cleanEnv, str, num, makeValidator } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const bodyParserValidator = makeValidator((value: any) => {
  if (typeof value !== "number") throw new Error("Expected type number");
  if (value <= 0) throw new Error("Expected value to be greater than 0");
});

export default cleanEnv(process.env, {
  BODY_PARSER_SIZE_LIMIT: bodyParserValidator({
    default: 5 * 1000000,
  }),
  PORT: num({
    default: 3000,
    desc: "The port on which the API server should listen",
    example: "8000",
  }),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  dotEnvPath: null,
});
