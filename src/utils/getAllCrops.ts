import { fillDom } from './scrapeFunctions';
import { Crop } from '../types/types';
import { getCrop } from './getCrop';
import { writeArrayToTsFile } from './arrayToTs';
import path from 'path';
import { alphabet, HOST } from '../constants/constants';

const getList = (document: Document) => {
  const allRelevantUl = [
    ...document.getElementsByClassName('category-page__members-wrapper'),
  ]?.map(element => {
    if (
      alphabet.includes(
        [...element.children]?.[0]?.textContent?.trim()?.toLocaleLowerCase() ||
          '',
      )
    ) {
      return element.children?.[1];
    }
    return;
  });

  const urls = new Set<string>();
  allRelevantUl.forEach(element => {
    [...(element?.getElementsByTagName('a') || [])]?.forEach(tag => {
      const url = tag?.getAttribute('href');
      if (url) {
        urls.add(url);
      }
    });
  });
  return Array.from(urls);
};

export const getAllCrops = async () => {
  const document = await fillDom(
    'https://coralisland.fandom.com/wiki/Category:Crops',
  );

  const urls = getList(document);

  const crops: Array<Crop> = [];
  for (const url of urls) {
    const crop = await getCrop(`${HOST}${url}`);
    if (crop) {
      crops.push(crop);
    }
  }
  await writeArrayToTsFile(crops, true);
};
