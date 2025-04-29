import { readdirSync } from "fs";
import { ROOT_DIR } from "@/module";
import { join, resolve } from "path";

const ASSETS_DIR = resolve(ROOT_DIR, "docs", "assets");

const assets_files = readdirSync(ASSETS_DIR);

export const resolve_assets = (assets_name: string) => {
  return join("docs", "assets", assets_name);
};

export const assets = Object.fromEntries(
  assets_files.map((name) => [name, resolve_assets(name)])
);
