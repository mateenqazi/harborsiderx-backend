export type ThrowNotFound<B extends boolean, T> = B extends true ? T : T | undefined;
