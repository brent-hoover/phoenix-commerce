import Core from "../packages/core/src/core.ts";
import importPluginsJSONFile from "../packages/core/src/importPluginsJSONFile.ts";
import log from "../packages/logger/index.ts";

async function runApp() {
  log("Starting bun-commerce");
  await importPluginsJSONFile("../../../plugins.json");
}

runApp();
