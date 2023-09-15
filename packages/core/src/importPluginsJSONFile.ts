import path from "path";
import stack from "callsite";
import log from "../../logger/index.ts";

export default async function importPluginsJSONFile(pluginsFile: string) {
  let absolutePluginsFile;
  const plugins = {};

  const caller = stack()[1];
  const callerFileName = caller.getFileName();
  absolutePluginsFile = path.join(path.dirname(callerFileName), pluginsFile);

  const { default: pluginRefs } = await import(`${absolutePluginsFile}`, {
    assert: { type: "json" },
  });

  for (const [name, pluginPath] of Object.entries(pluginRefs)) {
    let plugin;
    try {
      ({ default: plugin } = await import(pluginPath));
    } catch (err) {
      ({ default: plugin } = await import(
        path.join(
          path.dirname(absolutePluginsFile),
          "node_modules",
          pluginPath,
          "index.js",
        )
      ));
    }
    log(`Installed plugin ${name} from ${pluginPath}`);
  }
}
