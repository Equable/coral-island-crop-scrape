import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { Crop } from '../types/types';

async function ensureDirectoryExists(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);

  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function writeArrayToJsonFile(
  data: Array<Crop>,
  prettyPrint = false,
) {
  try {
    const jsonString = JSON.stringify(data, null, prettyPrint ? 2 : 0);
    const filePath = path.join(
      process.cwd(),
      `src/json/v${process.env.CROPS_VERSION}/crops.json`,
    );

    // Ensure that all directories in the file path exist
    await ensureDirectoryExists(filePath);

    // Write the JSON string to the file
    await writeFile(filePath, jsonString, 'utf8');

    console.log(`Array successfully written to ${filePath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}
