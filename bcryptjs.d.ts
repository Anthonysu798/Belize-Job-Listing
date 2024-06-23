declare module 'bcryptjs' {
    export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
    export function hash(data: string | Buffer, salt: number): Promise<string>;
    export function genSaltSync(rounds: number): string;
  }
  