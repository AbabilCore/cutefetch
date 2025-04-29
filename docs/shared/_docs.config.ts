import { ROOT_DIR, PartialConfig } from "@/module";
import { readdirSync } from "fs";
import { resolve } from "path";

/**
 * Directory structure for templates and partials
 */
const dir: Record<string, string> = {
  doc_dir: resolve(ROOT_DIR, "docs"),

  // Path to the main templates folder
  get templates() {
    return resolve(this.doc_dir, "templates");
  },

  // Path to the partials folder
  get partials() {
    return resolve(this.templates, "partials");
  },

  // Path to base partials (header, footer, etc.)
  get base() {
    return resolve(this.partials, "base");
  },

  // Path to body partials
  get body() {
    return resolve(this.partials, "body");
  },

  // Path to detailed partials (feature breakdowns, etc.)
  get details() {
    return resolve(this.partials, "details");
  },
};

/**
 * List of all Handlebars partials used to generate the README
 */
export const partials: PartialConfig[] = [
  // Base Partials
  ...readdirSync(dir.base).map((hbr) => ({
    title: hbr.replace(".hbs", ""),
    path: resolve(dir.base, hbr),
  })),

  // Body Partials
  ...readdirSync(dir.body).map((hbr) => ({
    title: hbr.replace(".hbs", ""),
    path: resolve(dir.body, hbr),
  })),

  // Details Partials
  ...readdirSync(dir.details).map((hbr) => ({
    title: hbr.replace(".hbs", ""),
    path: resolve(dir.details, hbr),
  })),
];

/**
 * Path to the main README index template
 */
export const template_index = resolve(dir.templates, "index.hbs");
