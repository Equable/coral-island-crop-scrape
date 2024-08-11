import { COST_PATTERN, HOST } from '../constants/constants';
import { EnumCropType, EnumSeasons, EnumSeedType } from '../enums/enums';
import { ArtisianCropParts } from '../types/types';
import { Crop } from '../classes/crop';
import { getArtisan } from './getArtisan';
import {
  fillDom,
  getCost,
  getName,
  getProducts,
  getSellPrices,
} from './scrapeFunctions';

const { FLOWER, FRUIT, VEGETABLE, GRAIN } = EnumCropType;
const { SEED, SEEDLING, SAPLING } = EnumSeedType;
const { WINTER, FALL, SPRING, SUMMER } = EnumSeasons;

const getSeedType = (document: Document) => {
  const costEl = Array.from(document.querySelectorAll('span')).find(el =>
    COST_PATTERN.test(el.textContent ?? ''),
  );
  if (costEl?.textContent?.toLocaleLowerCase().includes(SEEDLING)) {
    return SEEDLING;
  }
  if (costEl?.textContent?.toLocaleLowerCase().includes(SEED)) {
    return SEED;
  }
  return SAPLING;
};

const getType = (document: Document) => {
  switch (
    document
      .querySelector('[data-source="type"]')
      ?.textContent?.replace('Type', '')
      .trim()
      .toLocaleLowerCase()
  ) {
    case FLOWER:
      return FLOWER;
    case VEGETABLE:
      return VEGETABLE;
    case GRAIN:
      return GRAIN;
    default:
      return FRUIT;
  }
};

const getGrowth = (document: Document) => {
  const numberArray = document
    .querySelector('[data-source="growth"]')
    ?.textContent?.match(/\d+/g);
  const growthTime = parseInt(numberArray?.[0] ?? '', 10);
  const regrowthTime = parseInt(numberArray?.[1] ?? '', 10);

  return { growthTime, regrowthTime: regrowthTime ? regrowthTime : undefined };
};

const getQuantityPerHarvest = (seedType: EnumSeedType) => {
  switch (seedType) {
    case SEEDLING:
      return 2;
    case SAPLING:
      return 3;
    default:
      return 1;
  }
};

const getSeasons = (document: Document) => {
  const seasonsText = document.querySelector(
    '[data-source="season"]',
  )?.textContent;
  const seasonsArray: EnumSeasons[] = [];
  if (seasonsText?.toLocaleLowerCase()?.includes(WINTER)) {
    seasonsArray.push(WINTER);
  }
  if (seasonsText?.toLocaleLowerCase()?.includes(SPRING)) {
    seasonsArray.push(SPRING);
  }
  if (seasonsText?.toLocaleLowerCase()?.includes(SUMMER)) {
    seasonsArray.push(SUMMER);
  }
  if (seasonsText?.toLocaleLowerCase()?.includes(FALL)) {
    seasonsArray.push(FALL);
  }
  return seasonsArray;
};

export const getCrop = async (url: string) => {
  const document = await fillDom(url);
  const name = getName(document);
  const cropCost = getCost(document);
  const cropType = getType(document);
  const seedType = getSeedType(document);
  const { growthTime, regrowthTime } = getGrowth(document);
  const quantityPerHarvest = getQuantityPerHarvest(seedType);
  const seasons = getSeasons(document);
  const { sellPrice, sellPriceImproved } = getSellPrices(document);
  const products = getProducts(document);
  const isSapling = SAPLING === seedType;
  if (
    cropCost &&
    cropType &&
    seedType &&
    growthTime &&
    quantityPerHarvest &&
    seasons.length > 0 &&
    name &&
    sellPrice
  ) {
    const totalPossibleHarvests = regrowthTime
      ? Math.floor(
          (seasons.length * 28 - (isSapling ? 0 : growthTime)) / regrowthTime,
        ) + 1
      : 1;
    const cropLifeSpan = regrowthTime
      ? (totalPossibleHarvests - 1) * regrowthTime +
        (isSapling ? 0 : growthTime)
      : growthTime;

    let artisanCropParts: ArtisianCropParts = {};
    for (const string of products) {
      const artisan = await getArtisan({
        url: `${HOST}${string}`,
        cropCost,
        cropLifeSpan,
        totalPossibleHarvests,
        quantityPerHarvest,
        handlePayedOff: isSapling,
      });
      if (artisan) {
        artisanCropParts = { ...artisanCropParts, ...artisan };
      }
    }

    const crop = new Crop({
      name,
      cropCost,
      growthTime,
      cropType,
      seedType,
      regrowthTime,
      quantityPerHarvest,
      totalPossibleHarvests,
      totalProcessTime: cropLifeSpan,
      seasons,
      sellPrice,
      handlePayedOff: isSapling,
      sellPriceImproved,
      ...artisanCropParts,
    });
    return crop;
  }
  return;
};
