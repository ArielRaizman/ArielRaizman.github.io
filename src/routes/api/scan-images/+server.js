import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      // Check if file is an image
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        // Get relative path from assets directory
        const relativePath = path.relative(
          path.join(process.cwd(), 'src', 'lib', 'assets'),
          filePath
        );
        fileList.push(relativePath);
      }
    }
  });
  
  return fileList;
}

export async function GET() {
  try {
    const assetsDir = path.join(process.cwd(), 'src', 'lib', 'assets');
    const images = walkDir(assetsDir);
    return json(images);
  } catch (error) {
    console.error('Error scanning images:', error);
    return json({ error: 'Failed to scan images' }, { status: 500 });
  }
} 