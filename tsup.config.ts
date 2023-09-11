import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/bin/repeater.ts"],
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  shims: true,
  legacyOutput: false,
  bundle: true,
  splitting: true,
});
