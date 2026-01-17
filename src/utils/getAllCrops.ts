import { fillDom } from './scrapeFunctions';
import { Crop } from '../types/types';
import { getCrop } from './getCrop';
import { writeArrayToTsFile } from './arrayToTs';
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
  console.log(`crop list contains ${Array.from(urls).length} items`);
  return Array.from(urls);
};

export const getAllCrops = async () => {
  const document = await fillDom(
    'https://coralisland.fandom.com/wiki/Category:Crops',
  ).then(res => {
    console.log('fetched document');
    return res;
  });

  const urls = getList(document);

  const crops: Array<Crop> = [];
  for (const url of urls) {
    console.log(`fetching from ${url}`);
    const crop = await getCrop(`${HOST}${url}`).then(res => {
      if (res) {
        console.log(`SUCCESSFULLY obtained crop from ${url}`);
      } else {
        console.log(`FAILED to obtain crop from ${url}`);
      }
      return res;
    }).catch(error => {
      console.log(`${url} had the following error`)
      console.log(error)
    });
    if (crop) {
      crops.push(crop);
    }
  }
  await writeArrayToTsFile(crops);
};
