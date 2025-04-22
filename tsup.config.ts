import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    outExtension: () => ({ js: ".mjs" }),
    dts: true,
    clean: true,
    esbuildOptions(options) {
      options.mangleProps = /^_/;
      options.mangleQuoted = true;
    },
    banner: {
      js: fs.readFileSync("temp-banner.txt", "utf-8"),
    },
  },
  {
    entry: ["src/index.cts"],
    format: ["cjs"],
    outExtension: () => ({ js: ".cjs" }),
    dts: false,
    clean: false,
    esbuildOptions(options) {
      options.mangleProps = /^_/;
      options.mangleQuoted = true;
    },
    banner: {
      js: fs.readFileSync("temp-banner.txt", "utf-8"),
    },
  },
]);
