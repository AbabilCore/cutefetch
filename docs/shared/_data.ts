import { CREATED_AT, pkg_data, TODAY } from "@/module";
import { assets } from "@/docs/shared";

export const readme_data = async () => {
  return {
    pkg: await pkg_data(),
    assets,
    createdAt: CREATED_AT,
    lastModified: TODAY,
  };
};
