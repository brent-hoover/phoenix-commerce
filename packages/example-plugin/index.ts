import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
export default async function register(app): Promise<void> {
  const pFile = Bun.file("./package.json");
  const pkg = await pFile.json();
  await app.registerPlugin({
    label: "Example Plugin",
    name: "example-plugin",
    version: pkg.version,
    graphQL: {
      resolvers,
      schemas,
    },
  });
}
