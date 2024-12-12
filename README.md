# coral-island-crop-scrape

The following is an importable library that provides scraped data of all crops
of the coral island wiki including usable enums and types.

## Crop Structure and Samples

Currently you can import `crops` for the following data as an array of `Crop`

## Adding to project

```
 yarn add coral-island-crop-scrape
```

In your project you should be able to import as needed:

```
import { EnumCropType, crops } from "coral-island-crop-scrape";

```

### Notes

- `PO` means `payed off` only relevant for saplings
- `PPD` means `pay per day`
- PPD assumes perfect harvest times.
- PPD for any Artisan field (i.e., Jar, Honey, Aged, etc.) assumes that you are
  able to process the item at that artisan step synchronously. Let's say you get
  an apple tree and 3 apples. The artisan field assumes all 3 apples will be
  processed in 3 separate jars simultaneously, for example.
- Each Artisan step takes into account any previous process time when
  calculating PPD. So if the orchid takes 12 days to grow, then 3 days to
  process to honey, then aged PPD will be: `profit/(12 + 3 + aged process time)`
- All saplings ignore their `growthTime` when calculating PPD. This was to
  reduce complexity. Assumes they are planted and grown before their harvestable
  seasons.

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
  isOceanCrop: boolean;
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
    "cropCost": 50,
    "totalPossibleHarvests": 1,
    "quantityPerHarvest": 1,
    "totalProcessTime": 11,
    "handlePayedOff": false,
    "profitability": {
      "sellPrice": {
        "base": 105,
        "bronze": 121,
        "silver": 137,
        "gold": 158,
        "osmium": 210
      },
      "sellPriceImproved": {
        "base": 121,
        "bronze": 139,
        "silver": 157,
        "gold": 181,
        "osmium": 242
      },
      "profit": {
        "base": 55,
        "bronze": 71,
        "silver": 87,
        "gold": 108,
        "osmium": 160
      },
      "profitImproved": {
        "base": 71,
        "bronze": 89,
        "silver": 107,
        "gold": 131,
        "osmium": 192
      },
      "profitPO": null,
      "profitPOImproved": null,
      "payPerDay": {
        "base": 5,
        "bronze": 6.454545454545454,
        "silver": 7.909090909090909,
        "gold": 9.818181818181818,
        "osmium": 14.545454545454545
      },
      "payPerDayImproved": {
        "base": 6.454545454545454,
        "bronze": 8.090909090909092,
        "silver": 9.727272727272727,
        "gold": 11.909090909090908,
        "osmium": 17.454545454545453
      },
      "payPerDayPO": null,
      "payPerDayPOImproved": null
    },
    "name": "Watermelon",
    "seasons": ["fall"],
    "growthTime": 11,
    "isOceanCrop": false,
    "cropType": "fruit",
    "seedType": "seed",
    "regrowthTime": 0,
    "jar": {
      "cropCost": 50,
      "totalPossibleHarvests": 1,
      "quantityPerHarvest": 1,
      "totalProcessTime": 11.25,
      "handlePayedOff": false,
      "profitability": {
        "sellPrice": {
          "base": 175,
          "bronze": 195,
          "silver": 220,
          "gold": 250,
          "osmium": 330
        },
        "sellPriceImproved": {
          "base": 201,
          "bronze": 224,
          "silver": 252,
          "gold": 287,
          "osmium": 379
        },
        "profit": {
          "base": 125,
          "bronze": 145,
          "silver": 170,
          "gold": 200,
          "osmium": 280
        },
        "profitImproved": {
          "base": 151,
          "bronze": 174,
          "silver": 202,
          "gold": 237,
          "osmium": 329
        },
        "profitPO": null,
        "profitPOImproved": null,
        "payPerDay": {
          "base": 11.11111111111111,
          "bronze": 12.88888888888889,
          "silver": 15.11111111111111,
          "gold": 17.77777777777778,
          "osmium": 24.88888888888889
        },
        "payPerDayImproved": {
          "base": 13.422222222222222,
          "bronze": 15.466666666666667,
          "silver": 17.955555555555556,
          "gold": 21.066666666666666,
          "osmium": 29.244444444444444
        },
        "payPerDayPO": null,
        "payPerDayPOImproved": null
      },
      "process": "jar",
      "timeToProcess": 0.25,
      "cropLifeSpan": 11,
      "pastProcessTime": 0
    },
    "keg": {
      "cropCost": 50,
      "totalPossibleHarvests": 1,
      "quantityPerHarvest": 1,
      "totalProcessTime": 11.5,
      "handlePayedOff": false,
      "profitability": {
        "sellPrice": {
          "base": 230,
          "bronze": 265,
          "silver": 300,
          "gold": 350,
          "osmium": 460
        },
        "sellPriceImproved": {
          "base": 264,
          "bronze": 304,
          "silver": 345,
          "gold": 402,
          "osmium": 529
        },
        "profit": {
          "base": 180,
          "bronze": 215,
          "silver": 250,
          "gold": 300,
          "osmium": 410
        },
        "profitImproved": {
          "base": 214,
          "bronze": 254,
          "silver": 295,
          "gold": 352,
          "osmium": 479
        },
        "profitPO": null,
        "profitPOImproved": null,
        "payPerDay": {
          "base": 15.652173913043478,
          "bronze": 18.695652173913043,
          "silver": 21.73913043478261,
          "gold": 26.08695652173913,
          "osmium": 35.65217391304348
        },
        "payPerDayImproved": {
          "base": 18.608695652173914,
          "bronze": 22.08695652173913,
          "silver": 25.652173913043477,
          "gold": 30.608695652173914,
          "osmium": 41.65217391304348
        },
        "payPerDayPO": null,
        "payPerDayPOImproved": null
      },
      "process": "keg",
      "timeToProcess": 0.5,
      "cropLifeSpan": 11,
      "pastProcessTime": 0
    },
    "aged": {
      "cropCost": 50,
      "totalPossibleHarvests": 1,
      "quantityPerHarvest": 1,
      "totalProcessTime": 17.5,
      "handlePayedOff": false,
      "profitability": {
        "sellPrice": {
          "base": 1035,
          "bronze": 1195,
          "silver": 1350,
          "gold": 1575,
          "osmium": 2070
        },
        "sellPriceImproved": {
          "base": 1190,
          "bronze": 1374,
          "silver": 1552,
          "gold": 1811,
          "osmium": 2380
        },
        "profit": {
          "base": 985,
          "bronze": 1145,
          "silver": 1300,
          "gold": 1525,
          "osmium": 2020
        },
        "profitImproved": {
          "base": 1140,
          "bronze": 1324,
          "silver": 1502,
          "gold": 1761,
          "osmium": 2330
        },
        "profitPO": null,
        "profitPOImproved": null,
        "payPerDay": {
          "base": 56.285714285714285,
          "bronze": 65.42857142857143,
          "silver": 74.28571428571429,
          "gold": 87.14285714285714,
          "osmium": 115.42857142857143
        },
        "payPerDayImproved": {
          "base": 65.14285714285714,
          "bronze": 75.65714285714286,
          "silver": 85.82857142857142,
          "gold": 100.62857142857143,
          "osmium": 133.14285714285714
        },
        "payPerDayPO": null,
        "payPerDayPOImproved": null
      },
      "process": "aged",
      "timeToProcess": 6,
      "cropLifeSpan": 11,
      "pastProcessTime": 0.5
    }
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

## Contributing

### Versioning

- If you make any changes to scrape functions. Please update version.
  - change Major version if there are changes to the resulting crops object
    shape. I.E new fields, removed fields (2.0.0)
  - Change minor version if object shape remains the same but calculations get
    updated. (1.1.0)
  - Change patch version only if refreshing data. I.E re-running scrape as new
    crops were added.

### Running Scrape

1. Install [tsx](https://www.npmjs.com/package/tsx)
2. Run `yarn generate-crops` to proudce updated crops file
