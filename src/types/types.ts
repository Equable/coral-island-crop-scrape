import {
  EnumCropType,
  EnumGrades,
  EnumProcess,
  EnumSeasons,
  EnumSeedType,
} from '../enums/enums';

export type Grades = Record<EnumGrades, number>;

export interface SellPrice extends Grades {}
export interface Profit extends Grades {}
export interface PayPerDay extends Grades {}

export interface Profitability {
  sellPrice: SellPrice;
  sellPriceImproved: SellPrice;
  profit: Profit;
  profitImproved: Profit;
  payPerDay: PayPerDay;
  payPerDayImproved: PayPerDay;
  payPerDayPO: PayPerDay | null;
  payPerDayPOImproved: PayPerDay | null;
  profitPO: Profit | null;
  profitPOImproved: Profit | null;
}

export interface Artisan {
  process: EnumProcess;
  cropCost: number;
  timeToProcess: number;
  pastProcessTime?: number;
  cropLifeSpan: number;
  totalPossibleHarvests: number;
  quantityPerHarvest: number;
  profitability: Profitability;
  handlePayedOff?: boolean;
}

export interface BaseCrop {
  name: string;
  cropCost: number;
  cropType: EnumCropType;
  seedType: EnumSeedType;
  growthTime: number;
  seasons: EnumSeasons[];
  profitability: Profitability;
  quantityPerHarvest: number;
  regrowthTime?: number;
  totalPossibleHarvests: number;
  handlePayedOff?: boolean;
  totalProcessTime: number;
}
export type ArtisianCropParts = Partial<Record<EnumProcess, Artisan>>;

export interface Crop extends BaseCrop, ArtisianCropParts {}

export interface ProfitabilityConstructorArgs {
  sellPrice: SellPrice;
  sellPriceImproved: SellPrice;
}

export interface ProfitsConstructorArgs {
  quantityPerHarvest: number;
  totalPossibleHarvests: number;
  cropCost: number;
  sellPrice: SellPrice;
  sellPriceImproved: SellPrice;
  handlePayedOff?: boolean;
  totalProcessTime: number;
}

export interface ArtisanConstructorArgs extends ProfitsConstructorArgs {
  process: EnumProcess;
  timeToProcess: number;
  pastProcessTime: number;
  cropLifeSpan: number;
}
export interface CropConstructor
  extends ProfitsConstructorArgs,
    ArtisianCropParts {
  name: string;
  seasons: EnumSeasons[];
  growthTime: number;
  cropType: EnumCropType;
  seedType: EnumSeedType;
  regrowthTime?: number;
}
