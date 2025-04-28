import fs from "fs";
import { join } from "path";
import { CREATED_AT, ROOT_DIR, TODAY } from "@/module";

const pkg = JSON.parse(
  fs.readFileSync(join(ROOT_DIR, "package.json"), "utf-8")
);

const bannerTXT = `
/**
 * @packageName     ${pkg.name}
 * @version         ${pkg.version}
 * @author          ${pkg.author}
 * @license         ${pkg.license}
 * @description     ${pkg.description}
 * @website         ${pkg.homepage}
 * @repository      https://github.com/DevAbabil/cutefetch
 * @created         ${CREATED_AT}
 * @lastModified    ${TODAY}
 * ------------------------------------------------------------
 */
`.trim();

export const generateBanner = () => {
  fs.writeFileSync(join(ROOT_DIR, "temp-banner.txt"), bannerTXT);
};
