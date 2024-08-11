import { EnumProcess } from '../enums/enums';

export const HOST = 'https://coralisland.fandom.com';

export const COST_PATTERN = / × /i;
export const PARSE_COST_PATTERN = /\b\d{1,}(?:,\d{3})*\b/;
export const SELL_PRICES_PATTERN = /Sell prices/i;
export const SELL_PRICES_IMPROVED_PATTERN = /Sell prices with Crop Price/i;

const { JAR, AGED, OIL, KEG, HONEY, MILL, LOOM, CHEESE } = EnumProcess;

export const WebProcessToEnum = {
  'mason jar': JAR,
  'aging barrel': AGED,
  keg: KEG,
  'oil press': OIL,
  'bee house': HONEY,
  'cheese press': CHEESE,
  mill: MILL,
  loom: LOOM,
};

export const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
