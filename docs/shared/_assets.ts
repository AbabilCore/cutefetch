import { resolve_assets } from "./_resolve_assets";

const asset_names = [
  "browser.console.result.png",
  "config.err-1.png",
  "config.err-2.png",
  "config.err-3.png",
  "config.err-4.png",
] as const;

export const assets = Object.fromEntries(
  asset_names.map((name) => [name, resolve_assets(name)])
);
