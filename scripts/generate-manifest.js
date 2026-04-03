import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '..', 'uploads', 'image');
const documentDir = path.join(__dirname, '..', 'uploads', 'document');
const publicDir = path.join(__dirname, '..', 'public');
const manifestFile = path.join(publicDir, 'files-manifest.json');

const publicImageDir = path.join(publicDir, 'image');
const publicDocDir = path.join(publicDir, 'document');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function syncDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory not found: ${src}`);
    return;
  }
  
  // Clean sync: remove destination if it exists to clear deleted files
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  ensureDir(dest);
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function scanDirectory(dir, type) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(file => !file.startsWith('.') && fs.lstatSync(path.join(dir, file)).isFile())
    .map(file => {
      const stats = fs.statSync(path.join(dir, file));
      return {
        name: file,
        url: `${type}/${file}`,
        size: (stats.size / 1024).toFixed(2) + ' KB',
        mtime: stats.mtime,
        type: type,
        ext: path.extname(file).toLowerCase().substring(1)
      };
    });
}

function generateManifest() {
  ensureDir(publicDir);
  
  console.log('Syncing files to public directory...');
  syncDirectory(imageDir, publicImageDir);
  syncDirectory(documentDir, publicDocDir);

  const images = scanDirectory(imageDir, 'image');
  const documents = scanDirectory(documentDir, 'document');

  const manifest = {
    updatedAt: new Date().toISOString(),
    images,
    documents,
    total: images.length + documents.length
  };

  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest generated with ${manifest.total} files.`);
}

generateManifest();
