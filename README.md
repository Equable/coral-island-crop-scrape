# coral-island-crop-scrape

This is a script used to scrape all crops from the coral island wiki. Its open
to contribution, its pretty rough but Would be nice if it can be made better.
All new versions of json should be stored in a different folder.

## Running

1. Install [tsx](https://www.npmjs.com/package/tsx)
2. If any changes have been made to the json generation. Please update `.env`
   crops version before running
3. When steps 1 and 2 are complete

## Contribution

- If you make any changes to scrape functions. Please update .env version.
  - change Major version if there are changes to the resulting crops object
    shape. I.E new fields, removed fields (2_0_0)
  - Change minor version if object shape remains the same but calculations get
    updated. (1_1_0)
