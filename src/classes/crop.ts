import {
  EnumCropType,
  EnumProcess,
  EnumSeasons,
  EnumSeedType,
} from '../enums/enums';
import { Artisan, CropConstructor, Crop as CropType } from '../types/types';
import { Profits } from './profits';

const { OIL, JAR, HONEY, KEG, AGED, CHEESE, LOOM, MILL } = EnumProcess;

export class Crop extends Profits implements CropType {
  name: string;
  cropType: EnumCropType;
  seedType: EnumSeedType;
  growthTime: number;
  seasons: EnumSeasons[];
  regrowthTime?: number;
  handlePayedOff?: boolean;
  [OIL]?: Artisan;
  [JAR]?: Artisan;
  [HONEY]?: Artisan;
  [KEG]?: Artisan;
  [CHEESE]?: Artisan;
  [LOOM]?: Artisan;
  [AGED]?: Artisan;
  [MILL]?: Artisan;

  constructor({
    cropCost,
    quantityPerHarvest,
    totalPossibleHarvests,
    sellPrice,
    sellPriceImproved,
    handlePayedOff,
    totalProcessTime,
    name,
    seasons,
    growthTime,
    cropType,
    seedType,
    regrowthTime,
    oil,
    jar,
    honey,
    keg,
    aged,
    loom,
    cheese,
    mill,
  }: CropConstructor) {
    super({
      cropCost,
      quantityPerHarvest,
      totalPossibleHarvests,
      sellPrice,
      sellPriceImproved,
      handlePayedOff,
      totalProcessTime,
    });
    this.name = name;
    this.seasons = seasons;
    this.growthTime = growthTime;
    this.cropType = cropType;
    this.seedType = seedType;
    this.regrowthTime = regrowthTime ?? 0;
    this[OIL] = oil;
    this[JAR] = jar;
    this[HONEY] = honey;
    this[KEG] = keg;
    this[AGED] = aged;
    this[LOOM] = loom;
    this[CHEESE] = cheese;
    this[MILL] = mill;
  }
}
