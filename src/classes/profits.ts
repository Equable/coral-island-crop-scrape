import {
  PayPerDay,
  Profit,
  Profitability,
  ProfitabilityConstructorArgs,
  ProfitsConstructorArgs,
  SellPrice,
} from '../types/types';

export class Profits {
  quantityPerHarvest: number;
  totalPossibleHarvests: number;
  cropCost: number;
  totalProcessTime: number;
  handlePayedOff?: boolean;
  profitability: Profitability;

  constructor({
    cropCost,
    totalPossibleHarvests,
    quantityPerHarvest,
    sellPrice,
    sellPriceImproved,
    handlePayedOff = false,
    totalProcessTime,
  }: ProfitsConstructorArgs) {
    this.cropCost = cropCost;
    this.totalPossibleHarvests = totalPossibleHarvests;
    this.quantityPerHarvest = quantityPerHarvest;
    this.totalProcessTime = totalProcessTime;
    this.handlePayedOff = handlePayedOff;
    this.profitability = this.generateProfitability({
      sellPrice,
      sellPriceImproved,
    });
  }

  protected profitCalc(sellPrice: number, payedOff?: boolean) {
    return (
      sellPrice * this.quantityPerHarvest * this.totalPossibleHarvests -
      (payedOff ? 0 : this.cropCost)
    );
  }

  protected profitGenerator(
    profitability: ProfitabilityConstructorArgs,
    improved?: boolean,
  ): Profit {
    if (improved) {
      return {
        base: this.profitCalc(profitability.sellPriceImproved.base),
        bronze: this.profitCalc(profitability.sellPriceImproved.bronze),
        silver: this.profitCalc(profitability.sellPriceImproved.silver),
        gold: this.profitCalc(profitability.sellPriceImproved.gold),
        osmium: this.profitCalc(profitability.sellPriceImproved.osmium),
      };
    }
    return {
      base: this.profitCalc(profitability.sellPrice.base),
      bronze: this.profitCalc(profitability.sellPrice.bronze),
      silver: this.profitCalc(profitability.sellPrice.silver),
      gold: this.profitCalc(profitability.sellPrice.gold),
      osmium: this.profitCalc(profitability.sellPrice.osmium),
    };
  }

  protected profitPO(
    profitability: ProfitabilityConstructorArgs,
    improved?: boolean,
  ): Profit | null {
    if (!this.handlePayedOff) {
      return null;
    }
    if (improved) {
      return {
        base: this.profitCalc(profitability.sellPriceImproved.base, true),
        bronze: this.profitCalc(profitability.sellPriceImproved.bronze, true),
        silver: this.profitCalc(profitability.sellPriceImproved.silver, true),
        gold: this.profitCalc(profitability.sellPriceImproved.gold, true),
        osmium: this.profitCalc(profitability.sellPriceImproved.osmium, true),
      };
    }
    return {
      base: this.profitCalc(profitability.sellPrice.base, true),
      bronze: this.profitCalc(profitability.sellPrice.bronze, true),
      silver: this.profitCalc(profitability.sellPrice.silver, true),
      gold: this.profitCalc(profitability.sellPrice.gold, true),
      osmium: this.profitCalc(profitability.sellPrice.osmium, true),
    };
  }

  protected payPerDay(profit: Profit | null) {
    if (profit) {
      return {
        base: profit.base / this.totalProcessTime,
        bronze: profit.bronze / this.totalProcessTime,
        silver: profit.silver / this.totalProcessTime,
        gold: profit.gold / this.totalProcessTime,
        osmium: profit.osmium / this.totalProcessTime,
      };
    }
    return null;
  }
  protected generateProfitability(
    profConstructor: ProfitabilityConstructorArgs,
  ): Profitability {
    const profit = this.profitGenerator(profConstructor);
    const profitImproved = this.profitGenerator(profConstructor, true);
    const profitPO = this.profitPO(profConstructor);
    const profitPOImproved = this.profitPO(profConstructor, true);
    const payPerDay = this.payPerDay(profit) as PayPerDay;
    const payPerDayImproved = this.payPerDay(profitImproved) as PayPerDay;
    const payPerDayPO = this.payPerDay(profitPO);
    const payPerDayPOImproved = this.payPerDay(profitPOImproved);
    return {
      ...profConstructor,
      profit,
      profitImproved,
      profitPO,
      profitPOImproved,
      payPerDay,
      payPerDayImproved,
      payPerDayPO,
      payPerDayPOImproved,
    };
  }
}
