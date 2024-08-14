# coral-island-crop-scrape

This is a script used to scrape all crops from the coral island wiki. Its open
to contribution, its pretty rough but Would be nice if it can be made better.
All new versions of json should be stored in a different folder.

## Running Scrape

1. Install [tsx](https://www.npmjs.com/package/tsx)
2. If any changes have been made to the json generation. Please update `.env`
   crops version before running
3. When steps 1 and 2 are complete

## Crop Structure and Samples

Currently you can import `cropv1` for the following data as an array of `Crop`

### Notes

- PO means `payed off` only relevant for saplings
- PPD means `pay per day`
- PPD assumes perfect harvest times.
- PPD for any Artisan field (i.e., Jar, Honey, Aged, etc.) assumes that you are
  able to process the item at that artisan step synchronously. Let's say you get
  an apple tree and 3 apples. The artisan field assumes all 3 apples will be
  processed in 3 separate jars simultaneously, for example.
- Each Artisan step takes into account any previous process time when
  calculating PPD. So if the orchid takes 12 days to grow, then 3 days to
  process to honey, then aged PPD will be: `profit/(12 + 3 + aged process time)`

### V1 Types

```
Grades = Record<EnumGrades, number>;

SellPrice extends Grades {}
Profit extends Grades {}
PayPerDay extends Grades {}

Profitability {
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

Artisan {
  process: `${EnumProcess}`;
  cropCost: number;
  timeToProcess: number;
  pastProcessTime?: number;
  cropLifeSpan: number;
  totalPossibleHarvests: number;
  quantityPerHarvest: number;
  profitability: Profitability;
  handlePayedOff?: boolean;
  totalProcessTime: number;
}

BaseCrop {
  name: string;
  cropCost: number;
  cropType: `${EnumCropType}`;
  seedType: `${EnumSeedType}`;
  growthTime: number;
  seasons: `${EnumSeasons}`[];
  profitability: Profitability;
  quantityPerHarvest: number;
  regrowthTime?: number;
  totalPossibleHarvests: number;
  handlePayedOff?: boolean;
  totalProcessTime: number;
}

ArtisianCropParts = Partial<Record<EnumProcess, Artisan>>;

Crop extends BaseCrop, ArtisianCropParts {}

```

### V1 Sample Crop

```
  {
    cropCost: 75,
    totalPossibleHarvests: 1,
    quantityPerHarvest: 1,
    totalProcessTime: 8,
    handlePayedOff: false,
    profitability: {
      sellPrice: {
        base: 130,
        bronze: 150,
        silver: 194,
        gold: 195,
        osmium: 260,
      },
      sellPriceImproved: {
        base: 150,
        bronze: 172,
        silver: 194,
        gold: 224,
        osmium: 299,
      },
      profit: {
        base: 55,
        bronze: 75,
        silver: 119,
        gold: 120,
        osmium: 185,
      },
      profitImproved: {
        base: 75,
        bronze: 97,
        silver: 119,
        gold: 149,
        osmium: 224,
      },
      profitPO: null,
      profitPOImproved: null,
      payPerDay: {
        base: 6.875,
        bronze: 9.375,
        silver: 14.875,
        gold: 15,
        osmium: 23.125,
      },
      payPerDayImproved: {
        base: 9.375,
        bronze: 12.125,
        silver: 14.875,
        gold: 18.625,
        osmium: 28,
      },
      payPerDayPO: null,
      payPerDayPOImproved: null,
    },
    name: 'Orchid',
    seasons: ['fall'],
    growthTime: 8,
    cropType: 'flower',
    seedType: 'seed',
    regrowthTime: 0,
    honey: {
      cropCost: 75,
      totalPossibleHarvests: 1,
      quantityPerHarvest: 1,
      totalProcessTime: 10,
      handlePayedOff: false,
      profitability: {
        sellPrice: {
          base: 390,
          bronze: 450,
          silver: 505,
          gold: 585,
          osmium: 780,
        },
        sellPriceImproved: {
          base: 448,
          bronze: 517,
          silver: 580,
          gold: 672,
          osmium: 896,
        },
        profit: {
          base: 315,
          bronze: 375,
          silver: 430,
          gold: 510,
          osmium: 705,
        },
        profitImproved: {
          base: 373,
          bronze: 442,
          silver: 505,
          gold: 597,
          osmium: 821,
        },
        profitPO: null,
        profitPOImproved: null,
        payPerDay: {
          base: 31.5,
          bronze: 37.5,
          silver: 43,
          gold: 51,
          osmium: 70.5,
        },
        payPerDayImproved: {
          base: 37.3,
          bronze: 44.2,
          silver: 50.5,
          gold: 59.7,
          osmium: 82.1,
        },
        payPerDayPO: null,
        payPerDayPOImproved: null,
      },
      process: 'honey',
      timeToProcess: 2,
      cropLifeSpan: 8,
      pastProcessTime: 0,
    },
    aged: {
      cropCost: 75,
      totalPossibleHarvests: 1,
      quantityPerHarvest: 1,
      totalProcessTime: 16,
      handlePayedOff: false,
      profitability: {
        sellPrice: {
          base: 1755,
          bronze: 2025,
          silver: 2275,
          gold: 2635,
          osmium: 3510,
        },
        sellPriceImproved: {
          base: 2018,
          bronze: 2328,
          silver: 2616,
          gold: 3030,
          osmium: 4036,
        },
        profit: {
          base: 1680,
          bronze: 1950,
          silver: 2200,
          gold: 2560,
          osmium: 3435,
        },
        profitImproved: {
          base: 1943,
          bronze: 2253,
          silver: 2541,
          gold: 2955,
          osmium: 3961,
        },
        profitPO: null,
        profitPOImproved: null,
        payPerDay: {
          base: 105,
          bronze: 121.875,
          silver: 137.5,
          gold: 160,
          osmium: 214.6875,
        },
        payPerDayImproved: {
          base: 121.4375,
          bronze: 140.8125,
          silver: 158.8125,
          gold: 184.6875,
          osmium: 247.5625,
        },
        payPerDayPO: null,
        payPerDayPOImproved: null,
      },
      process: 'aged',
      timeToProcess: 6,
      cropLifeSpan: 8,
      pastProcessTime: 2,
    },
  },
```

## Enums

The following are the exported enums:

```
EnumSeedType {
  SEED = 'seed',
  SEEDLING = 'seedling',
  SAPLING = 'sapling',
}

EnumCropType {
  FLOWER = 'flower',
  FRUIT = 'fruit',
  VEGETABLE = 'vegetable',
  GRAIN = 'grain',
}

EnumSeasons {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  WINTER = 'winter',
}

EnumProcess {
  HONEY = 'honey',
  OIL = 'oil',
  KEG = 'keg',
  JAR = 'jar',
  AGED = 'aged',
  CHEESE = 'cheese',
  LOOM = 'loom',
  MILL = 'mill',
}

EnumGrades {
  BASE = 'base',
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  OSMIUM = 'osmium',
}
```

## Contribution

- If you make any changes to scrape functions. Please update .env version.
  - change Major version if there are changes to the resulting crops object
    shape. I.E new fields, removed fields (2_0_0)
  - Change minor version if object shape remains the same but calculations get
    updated. (1_1_0)
