import { pkg_data } from "@/module";
import { assets } from "@/docs/shared";

export const readme_data = async () => {
  return {
    pkg: await pkg_data(),
    assets,
    createdAt: "2024-02-29",
    lastModified: new Date().toISOString().split("T")[0],
  };
};
