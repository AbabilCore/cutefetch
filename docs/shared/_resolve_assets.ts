import { join } from "path";

export const resolve_assets = (assets_name: string) => {
  return join("docs", "assets", assets_name);
};
