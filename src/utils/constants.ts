export const BOARD_ROWS = 100;
export const BOARD_COLS = 100;

export const COLORS = {
  magenta: "#F0F",
  salmon: "#FF7578",
  slateblue: "#876FFF",
  canary: "#FDFF6A",
  cyan: "#4AFFFF",
} as const;

export const COLOR_NAMES = Object.fromEntries(
  Object.entries(COLORS).map(([name, hex]) => [hex, name])
);

export const COLOR_OPTIONS = Object.values(COLORS);

export const LEFT_CLICK = 0;
