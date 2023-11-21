export type ArgsType<T> = T extends (...args: infer Args) => any ? Args : never;
