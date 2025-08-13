import { promises as fs } from 'fs';
import { join } from 'path';

const buildDir = 'build';
const src = join(buildDir, 'index.html');
const dest = join(buildDir, '404.html');

async function copyFallback() {
  try {
    await fs.copyFile(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  } catch (err) {
    console.error('Failed to copy fallback page', err);
    process.exit(1);
  }
}

copyFallback();
