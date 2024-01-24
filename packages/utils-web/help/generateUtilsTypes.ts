import fs from 'node:fs/promises';
import path from 'node:path';

const generateUtilsTypes = async () => {
  try {
    const sourcePath = path.resolve(__dirname, '../../utils/dist/index.d.ts');
    const data = await fs.readFile(sourcePath, 'utf-8');
    const removeExportData = data.replace(/export {[^}]*};/g, '');
    const distPath = path.resolve(__dirname, '../src/constant/utilsTypes.ts');
    fs.writeFile(distPath, `export default \`${removeExportData}\``);
  } catch (err) {
    console.error(err);
  }
};

export default generateUtilsTypes;
