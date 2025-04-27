export class Logger {
  private $: typeof console;

  constructor() {
    this.$ = console;
  }

  info(...args: any[]) {
    this.$.info("CuteFetch Info :", ...args);
  }

  warn(...args: any[]) {
    this.$.warn("CuteFetch Warn :", ...args);
  }

  err(...args: any[]) {
    this.$.error("CuteFetch Errr :", ...args);
  }
}

export const log = new Logger();
