import HB from "handlebars";
import { basename, join } from "path";
import { readFile, writeFile } from "fs/promises";
import { template_index, readme_data, partials, assets } from "@/docs/shared";
import { ROOT_DIR, tcWrapper } from "@/module";

const register_partials = tcWrapper(async () => {
  for (const { title, path } of partials) {
    const content = await readFile(path, "utf-8");
    HB.registerPartial(title, content);
  }
});

const register_helper = tcWrapper(async () => {
  HB.registerHelper("asset", (key: string) => {
    return assets[key];
  });
});

const generateREADME = tcWrapper(async () => {
  // register hbs extra features
  await register_partials();
  await register_helper();

  const index = await readFile(template_index, "utf-8");

  const template = HB.compile(index);

  const template_content = template({
    ...(await readme_data()),
  });

  await writeFile(join(ROOT_DIR, "README.md"), template_content, "utf-8");
});

export default generateREADME;
