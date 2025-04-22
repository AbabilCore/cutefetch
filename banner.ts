import fs from "fs";
import { join } from "path";

const pkg = JSON.parse(
  fs.readFileSync(join(process.cwd(), "package.json"), "utf-8")
);

const bannerTXT = `
/**
 * @packageName     ${pkg.name}
 * @version         ${pkg.version}
 * @author          ${pkg.author}
 * @license         ${pkg.license}
 * @description     ${pkg.description}
 * @website         https://www.npmjs.com/package/cutefetch
 * @repository      https://github.com/DevAbabil/cutefetch
 * @created         2024-02-29
 * @lastModified    ${new Date().toISOString().split("T")[0]}
 * ------------------------------------------------------------
 */
`.trim();

fs.writeFileSync("temp-banner.txt", bannerTXT);
