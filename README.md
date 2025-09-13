# dplay 🎬

A modern CLI tool and web server to browse and play videos from any folder structure with an elegant, responsive UI.

## ✨ Features

- **🚀 Zero Configuration**: Just point to a folder and start watching
- **🎥 Universal Video Support**: Plays all common video formats (MP4, AVI, MKV, etc.)
- **📱 Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **🔍 Smart Search**: Real-time search with auto-expanding folders
- **⌨️ Keyboard Shortcuts**: Full keyboard control (Space, F, M, Arrow keys)
- **💾 Progress Tracking**: Remembers where you left off in each video
- **📚 Recently Played**: Quick access to your recently watched videos
- **🎛️ Custom Controls**: Volume control, playback speed, fullscreen
- **📁 Nested Folder Support**: Handles complex directory structures
- **🖱️ Click to Play**: Click anywhere on video to play/pause

## 🚀 Quick Start

### Installation

```bash
npm install -g dplay
```

### Usage

Navigate to any folder containing videos and run:

```bash
dplay /path/to/your/videos
```

Or use current directory:

```bash
dplay .
```

Then open your browser to `http://localhost:8454`

## 🎮 Controls

### Keyboard Shortcuts

- **Space**: Play/Pause
- **F**: Toggle Fullscreen
- **M**: Mute/Unmute
- **←/→**: Seek backward/forward (10s)
- **↑/↓**: Volume up/down

### Mouse Controls

- **Click video**: Play/Pause
- **Click progress bar**: Seek to position
- **Scroll on volume**: Adjust volume

## 📋 Requirements

- Node.js 14.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Development

Clone the repository:

```bash
git clone https://github.com/dubey-prashant/dplay.git
cd dplay
npm install
```

Build CSS:

```bash
npm run build-css
```

Start the server:

```bash
npm start /path/to/videos
```

## 📁 Project Structure

```
dplay/
├── index.js          # Main CLI entry point
├── views/
│   └── index.ejs     # Web UI template
├── public/
│   ├── index.css     # Compiled styles
│   └── alpine.js     # Frontend framework
└── package.json
```

## 🎨 UI Features

- **Dark Theme**: Easy on the eyes for extended viewing
- **Folder Navigation**: Expandable/collapsible folder tree
- **Video Thumbnails**: Visual indicators for video files
- **Progress Indicators**: Visual progress bars for watched videos
- **Path Display**: Shows full file paths for context
- **Loading States**: Smooth loading animations
- **Responsive Layout**: Adapts to any screen size

## 🔧 Configuration

dplay works out of the box with no configuration needed. Simply point it to any folder containing videos.

### Supported Video Formats

- MP4
- WebM
- OGV
- AVI (if browser supports)
- MKV (if browser supports)
- MOV (if browser supports)

## 📝 License

MIT © [Prashant Dubey](https://github.com/dubey-prashant)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/dubey-prashant/dplay/issues).

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
