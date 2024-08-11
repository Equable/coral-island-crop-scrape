import {
  COST_PATTERN,
  PARSE_COST_PATTERN,
  SELL_PRICES_IMPROVED_PATTERN,
  SELL_PRICES_PATTERN,
} from '../constants/constants';
import { JSDOM } from 'jsdom';
import { SellPrice } from '../types/types';

export const getName = (document: Document) => {
  return document.querySelector('[data-source="title"]')?.textContent;
};

export const getCost = (document: Document) => {
  const costEl = Array.from(document.querySelectorAll('span')).find(el =>
    COST_PATTERN.test(el.textContent ?? ''),
  );
  return parseInt(
    costEl?.textContent?.match(PARSE_COST_PATTERN)?.[0] ?? '',
    10,
  );
};

export const getSellPrices = (document: Document) => {
  const sellPricesTBody = [...document.getElementsByTagName('caption')]
    .find(element => SELL_PRICES_PATTERN.test(element.textContent ?? ''))
    ?.parentElement?.getElementsByTagName('tbody');

  const sellPricesImprovedTBody = [...document.getElementsByTagName('caption')]
    .find(element => {
      return SELL_PRICES_IMPROVED_PATTERN.test(element.textContent ?? '');
    })
    ?.parentElement?.getElementsByTagName('tbody');

  const prices: number[] = [];
  const improvedPrices: number[] = [];
  if (sellPricesTBody) {
    [...[...sellPricesTBody][0].getElementsByTagName('td')].forEach(element => {
      prices.push(
        parseInt(element?.textContent?.replace(',', '')?.trim() || '', 10),
      );
    });
  }

  if (sellPricesImprovedTBody) {
    [...[...sellPricesImprovedTBody][0].getElementsByTagName('td')].forEach(
      element =>
        improvedPrices.push(
          parseInt(element?.textContent?.replace(',', '')?.trim() || '', 10),
        ),
    );
  }

  const sellPrice: SellPrice = {
    base: prices?.[0],
    bronze: prices?.[1],
    silver: prices?.[2],
    gold: prices?.[3],
    osmium: prices?.[4],
  };

  const sellPriceImproved: SellPrice = {
    base: improvedPrices?.[0],
    bronze: improvedPrices?.[1],
    silver: improvedPrices?.[2],
    gold: improvedPrices?.[3],
    osmium: improvedPrices?.[4],
  };

  return { sellPrice, sellPriceImproved };
};

export const getProducts = (document: Document) => {
  const artisanProductsHeader = [...document.getElementsByTagName('h3')]?.find(
    element => element.textContent?.includes('Artisan products'),
  );

  const artisanProductsTable = artisanProductsHeader?.nextElementSibling;

  if (artisanProductsTable) {
    const productUrls = [
      ...(artisanProductsTable?.getElementsByTagName('tbody')?.[0]?.children ||
        []),
    ]
      ?.slice(1)
      ?.map(tElement => {
        return tElement
          .getElementsByTagName('td')?.[0]
          ?.getElementsByTagName('a')?.[0]
          ?.getAttribute('href');
      });

    return productUrls;
  }
  return [];
};

export const fillDom = async (url: string) => {
  const dom = await fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong with the URL given');
      }
      return res.text();
    })
    .then(body => new JSDOM(body)?.window?.document);

  return dom;
};

export const convertToDays = (timeString: string): number => {
  const regex = /\d+/g;
  const matches = timeString.match(regex);
  const hasDays = timeString?.toLocaleLowerCase()?.includes('days');

  if (!matches) {
    throw new Error('Invalid time format');
  }
  if (matches.length > 1) {
    const days = matches[0] ? parseInt(matches[0], 10) : 0;
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    return days + hours / 24;
  }

  if (hasDays) {
    return matches[0] ? parseInt(matches[0], 10) : 0;
  }
  return (matches[0] ? parseInt(matches[0], 10) : 0) / 24;
};
