import { readdir } from 'fs/promises';
import path from 'path';

export default async function findFilesByExtension(
  dir: string,
  fileExtension: string
): Promise<string[]> {
  const matchedFiles = [];
  const files = await readdir(dir);
  for (const file of files) {
    const fileExt = path.extname(file);
    if (fileExt === `.${fileExtension}`) {
      matchedFiles.push(file);
    }
  }
  return matchedFiles;
}
