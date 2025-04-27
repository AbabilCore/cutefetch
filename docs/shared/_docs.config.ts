import { ROOT_DIR, PartialConfig } from "@/module";
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
  {
    title: "Header",
    path: resolve(dir.base, "header.hbs"),
  },
  {
    title: "Table of Contents",
    path: resolve(dir.base, "toc.hbs"),
  },
  {
    title: "Footer",
    path: resolve(dir.base, "footer.hbs"),
  },
  {
    title: "Banner Comment",
    path: resolve(dir.base, "banner.comment.hbs"),
  },

  // Root Partials
  {
    title: "Features",
    path: resolve(dir.partials, "features.hbs"),
  },
  {
    title: "Uses",
    path: resolve(dir.partials, "uses.hbs"),
  },
  {
    title: "Exceptions",
    path: resolve(dir.partials, "exceptions.hbs"),
  },
  {
    title: "License",
    path: resolve(dir.partials, "license.hbs"),
  },
  {
    title: "HTML Helper",
    path: resolve(dir.partials, "html.hbs"),
  },

  // 🔍 Details Partials
  {
    title: "Inspector",
    path: resolve(dir.details, "inspect.hbs"),
  },
  {
    title: "Transformer",
    path: resolve(dir.details, "transformer.hbs"),
  },
];

/**
 * Path to the main README index template
 */
export const template_index = resolve(dir.templates, "index.hbs");
