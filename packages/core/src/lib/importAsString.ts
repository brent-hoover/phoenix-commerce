import fs from "fs";
import { createRequire as createRequireFromPath } from "module";
import stack from "callsite";

export default function importAsString(specifier: string) {
  const caller: stack.CallSite = stack()[1];
  const callerFileName: string = caller.getFileName();
  const require = createRequireFromPath(callerFileName);
  return fs.readFileSync(require.resolve(specifier), { encoding: "utf8" });
}
