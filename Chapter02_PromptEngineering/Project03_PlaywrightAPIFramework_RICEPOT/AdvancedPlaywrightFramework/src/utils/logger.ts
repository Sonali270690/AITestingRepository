export class Logger {
  private static format(level: string, msg: string): string {
    return `[${new Date().toISOString()}] [${level}] ${msg}`;
  }

  static info(msg: string): void {
    console.log(this.format("INFO", msg));
  }

  static warn(msg: string): void {
    console.warn(this.format("WARN", msg));
  }

  static error(msg: string, err?: unknown): void {
    console.error(this.format("ERROR", msg), err ?? "");
  }

  static debug(msg: string): void {
    if (process.env.DEBUG) {
      console.log(this.format("DEBUG", msg));
    }
  }
}
