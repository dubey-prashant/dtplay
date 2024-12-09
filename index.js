//  take filepath as input and render a player based on folder structure and video files of that location

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Get the directory path from command line argument
const rootDirPath = process.argv[2];

console.log(process.argv);

if (!rootDirPath) {
  console.error('Please provide a directory path');
  process.exit(1);
}
// Ensure the directory exists
if (!fs.existsSync(rootDirPath)) {
  console.error('Directory does not exist');
  process.exit(1);
}

app.use('/', express.static(path.join(__dirname, rootDirPath)));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.listen(8454, () => console.log('Server running on port 8454!'));

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

// console.log(videos);

app.get('/', (req, res) => {
  res.render('index', { videos });
});
