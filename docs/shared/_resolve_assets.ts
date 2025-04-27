import { ROOT_DIR } from "module/_common.utils";
import { join } from "path";

export const resolve_assets = (assets_name: string) => {
  return join(ROOT_DIR, "docs", "assets", assets_name);
};
