import { log, PackageJson } from "@/module";
import { join } from "path";
import { readFile } from "fs/promises";
import { execSync } from "child_process";

export const ROOT_DIR: string = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim();

export const tcWrapper = <T extends (...args: any[]) => Promise<any>>(
  fn: T
) => {
  return async (...rest: Parameters<T>): Promise<ReturnType<T> | void> => {
    try {
      return await fn(...rest);
    } catch (error: unknown) {
      if (error instanceof Error) {
        log.err(error.stack);
      } else {
        log.err("An unknown error occurred");
      }
    }
  };
};

export class CF_ERROR extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = "CuteFetch";
    this.message = message;
  }
}

export const pkg_data = async (): Promise<PackageJson> => {
  const pkg = await readFile(join(ROOT_DIR, "package.json"), "utf-8");
  return JSON.parse(pkg);
};
