import { Artisan } from '../classes/artisan';
import { HOST, WebProcessToEnum } from '../constants/constants';
import { ArtisianCropParts } from '../types/types';
import {
  convertToDays,
  fillDom,
  getProducts,
  getSellPrices,
} from './scrapeFunctions';

const getTime = (document: Document) => {
  const timeText = document.querySelector('[data-source="time"]')?.textContent;
  return convertToDays(timeText ?? '');
};

const getProcessEnum = (document: Document) => {
  const processText = (document
    .querySelector('[data-source="machine"]')
    ?.textContent?.toLocaleLowerCase()
    ?.replace('machine', '')
    .trim() || 'mason jar') as keyof typeof WebProcessToEnum;

  return WebProcessToEnum[processText];
};

interface GetArtisanArgs {
  url: string;
  cropCost: number;
  pastProcessTime?: number;
  cropLifeSpan: number;
  totalPossibleHarvests: number;
  quantityPerHarvest: number;
  handlePayedOff?: boolean;
}
export const getArtisan = async ({
  url,
  cropCost,
  cropLifeSpan,
  totalPossibleHarvests,
  quantityPerHarvest,
  handlePayedOff,
  pastProcessTime = 0,
}: GetArtisanArgs) => {
  const document = await fillDom(url);

  const { sellPrice, sellPriceImproved } = getSellPrices(document);
  const timeToProcess = getTime(document);
  const products = getProducts(document);
  const process = getProcessEnum(document);

  const artisan = new Artisan({
    process,
    timeToProcess,
    totalPossibleHarvests,
    quantityPerHarvest,
    handlePayedOff,
    cropCost,
    cropLifeSpan,
    sellPrice,
    sellPriceImproved,
    pastProcessTime,
    totalProcessTime:
      (timeToProcess + pastProcessTime) * totalPossibleHarvests + cropLifeSpan,
  });
  let artisanCropParts: ArtisianCropParts = {};
  artisanCropParts[process] = artisan;
  for (const string of products) {
    const artisan = await getArtisan({
      url: `${HOST}${string}`,
      cropCost,
      cropLifeSpan,
      totalPossibleHarvests,
      quantityPerHarvest,
      handlePayedOff,
      pastProcessTime: timeToProcess,
    });
    if (artisan) {
      artisanCropParts = { ...artisanCropParts, ...artisan };
    }
  }

  return artisanCropParts;
};
