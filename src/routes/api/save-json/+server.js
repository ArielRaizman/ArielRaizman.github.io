import { json } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Construct the path to image-data.json
        const jsonPath = join(dirname(__dirname), '..', '..', 'lib', 'assets', 'image-data.json');
        
        // Write the file
        await writeFile(jsonPath, JSON.stringify(data, null, 2));
        
        return json({ success: true });
    } catch (error) {
        console.error('Error saving JSON:', error);
        return json({ success: false, error: error.message }, { status: 500 });
    }
} 