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

export async function writeArrayToTsFile(data: Array<Crop>) {
  try {
    // Create TypeScript file content
    const tsContent = `import { Crop } from '../types/types';\n\nexport const crops: Crop[] = ${JSON.stringify(data, null)};\n`;

    const filePath = path.join(process.cwd(), `src/crops/crops.ts`);

    // Ensure that all directories in the file path exist
    await ensureDirectoryExists(filePath);

    // Write the TypeScript content to the file
    await writeFile(filePath, tsContent, 'utf8');

    console.log(`Array successfully written to ${filePath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}
