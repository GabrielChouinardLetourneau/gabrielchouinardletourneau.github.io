import { File, Paths } from "expo-file-system";

export async function copyFile(from: string, to: string) {
  try {
    // 1. Create a reference to the source file (assuming it exists)
    const sourceFile = new File(Paths.document, from); 

    // 2. Define the destination file (name and directory)
    const copiedFile = new File(Paths.cache, to); 

    // 3. Use the copy() method on the source file instance, passing the destination file instance
    await sourceFile.copy(copiedFile); 

    console.log(`File copied to: ${copiedFile.uri}`);
  } catch (error) {
    console.error('Error copying file:', error);
  }
}