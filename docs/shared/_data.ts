import { get_dir_tree, CREATED_AT, pkg_data, TODAY } from "@/module";
import { assets } from "@/docs/shared";

export const readme_data = async () => {
  return {
    assets,
    createdAt: CREATED_AT,
    lastModified: TODAY,
    pkg: pkg_data(),
    dir_tree: get_dir_tree(),
  };
};
