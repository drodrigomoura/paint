import { COLORS } from "../utils/constants";

export type Nullable<T> = T | null;

export type ColorOptions = (typeof COLORS)[keyof typeof COLORS];
