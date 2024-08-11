import { EnumProcess } from '../enums/enums';
import { ArtisanConstructorArgs, Artisan as ArtisanType } from '../types/types';
import { Profits } from './profits';

export class Artisan extends Profits implements ArtisanType {
  process: EnumProcess;
  timeToProcess: number;
  pastProcessTime?: number;
  cropLifeSpan: number;
  handlePayedOff?: boolean;

  constructor({
    process,
    cropCost,
    timeToProcess,
    pastProcessTime = 0,
    cropLifeSpan,
    totalPossibleHarvests,
    quantityPerHarvest,
    totalProcessTime,
    sellPrice,
    sellPriceImproved,
    handlePayedOff = false,
  }: ArtisanConstructorArgs) {
    super({
      cropCost,
      quantityPerHarvest,
      totalPossibleHarvests,
      sellPrice,
      sellPriceImproved,
      handlePayedOff,
      totalProcessTime,
    });
    this.process = process;
    this.handlePayedOff = handlePayedOff;
    this.timeToProcess = timeToProcess;
    this.cropLifeSpan = cropLifeSpan;
    this.pastProcessTime = pastProcessTime;
  }
}
