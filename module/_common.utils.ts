import { log, PackageJson } from "@/module";
import { join } from "path";
import { readFileSync } from "fs";

export const ROOT_DIR: string = process.cwd();

export const pkg_data = (): PackageJson => {
  const pkg = readFileSync(join(ROOT_DIR, "package.json"), "utf-8");
  return JSON.parse(pkg);
};

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

export const TODAY = new Date().toLocaleDateString("en-CA", {
  timeZone: "Asia/Dhaka",
});

export const CREATED_AT: string = pkg_data()?.createdAt?.split("T")[0];
