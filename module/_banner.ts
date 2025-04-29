import fs from "fs/promises";
import { resolve } from "path";
import { CREATED_AT, ROOT_DIR, TODAY, pkg_data, tcWrapper } from "@/module";

export const generateBanner = tcWrapper(async () => {
  const pkg = (await pkg_data()) || {};

  const bannerTXT = `
/**
 * @packageName     ${pkg?.name}
 * @version         ${pkg?.version}
 * @author          ${pkg?.author}
 * @license         ${pkg?.license}
 * @description     ${pkg?.description}
 * @website         ${pkg?.homepage}
 * @repository      ${pkg?.repository?.url?.replace("git+", "")}
 * @created         ${CREATED_AT}
 * @lastModified    ${TODAY}
 * ------------------------------------------------------------
 */
`.trim();

  await fs.writeFile(resolve(ROOT_DIR, "temp-banner.txt"), bannerTXT);
});
