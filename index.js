#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import express from 'express';
import { gateway4sync } from 'default-gateway';
const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const port = process.argv.includes('-p')
  ? parseInt(process.argv[process.argv.indexOf('-p') + 1]) || 8454
  : 8454;

// Get the directory path from command line argument
const rootDirPath = process.argv[2];

if (!rootDirPath) {
  console.error('Please provide a directory path');
  process.exit(1);
}
// Ensure the directory exists
if (!fs.existsSync(rootDirPath)) {
  console.error('Directory does not exist');
  process.exit(1);
}

app.use('/', express.static(rootDirPath));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const createVideos = (dirPath) => {
  const pathContents = fs.readdirSync(dirPath);

  return pathContents
    .reduce((prev, content) => {
      const contentPath = `${dirPath}/${content}`;
      if (fs.lstatSync(contentPath).isDirectory()) {
        const videos = createVideos(contentPath);

        if (videos.length === 0) {
          return prev;
        }

        return [
          ...prev,
          {
            name: content,
            path: contentPath,
            videos: createVideos(contentPath),
            type: 'dir',
          },
        ];
      } else {
        const ext = content.split('.').pop();
        if (!['mp4', 'mkv', 'avi'].includes(ext)) {
          return prev;
        }

        const relativePath = path
          .relative(rootDirPath, contentPath)
          .replace(/\\/g, '/');

        return [
          ...prev,
          {
            name: content,
            path: `/${relativePath}`,
            type: 'file',
          },
        ];
      }
    }, [])
    .sort((a, b) => parseInt(a.name) - parseInt(b.name));
};

const videos = createVideos(rootDirPath);

app.get('/', (req, res) => {
  res.render('index', {
    videos,
    networkInfo: {
      localUrl,
      networkUrl,
      ip: localIP,
    },
  });
});

// server setup
const localUrl = `http://localhost:${port}`;
const networkUrl = getLocalNetworkURL();

app.listen(port, '0.0.0.0', () => {
  const underline = '\x1b[4m';
  const reset = '\x1b[0m';
  console.log('\n===================================================\n');
  console.log(`  dPlayer is running at:`);
  console.log(`  Local: ${underline}${localUrl}${reset}`);
  if (networkUrl) {
    console.log(`  Network: ${underline}${networkUrl}${reset}`);
  }
  console.log('\n===================================================\n');
});

function getLocalNetworkURL() {
  const { int } = gateway4sync();
  const interfaces = os.networkInterfaces();
  const ifaceList = interfaces[int];
  if (!ifaceList) {
    throw new Error(`Interface ${int} not found`);
  }

  const ipv4 = ifaceList.find(
    (iface) => iface.family === 'IPv4' && !iface.internal
  );

  return ipv4?.address && `http://${ipv4?.address}:${port}`;
}
