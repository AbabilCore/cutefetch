import { execSync } from "child_process";
import { pkg_data } from "./_common.utils";

export const get_dir_tree = () => {
  return execSync(`tree -I 'node_modules'`, { encoding: "utf-8" })?.replace(
    /^(.*)/,
    `~/${pkg_data()?.name}`
  );
};
