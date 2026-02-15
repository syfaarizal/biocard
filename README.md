# 🎴 BioCard Creator - MVP

Digital profile card creator dengan URL-based sharing system.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

### Test Locally
```bash
npm install -g http-server
http-server -p 3000
```
Buka: `http://localhost:3000/#/edit`

---

## 📱 3 Modes

### 1. Edit Mode (`/#/edit`)
- Form editor
- Live preview
- Button: **[Create Card]**

### 2. Published Mode (`/#/p/username?data=...`)
- Card view
- Button: **[Edit This Card]** ← Owner bisa edit
- Button: **[Share Profile]** ← Generate share link

### 3. View Mode (`/#/v/username?data=...`)
- Card view only
- NO edit button ← Pure viewing
- Button: **[Share Profile]** ← Viewer bisa share juga

---

## 🔗 URL Structure

```
Edit:      /#/edit
Published: /#/p/kaishiscd?data=eyJ1c2VybmFtZSI6ImthaX...
View:      /#/v/kaishiscd?data=eyJ1c2VybmFtZSI6ImthaX...
           ↑         ↑           ↑
           mode   username    encoded data
```

---

## 📋 User Flow

```
1. User opens /#/edit
2. Fill form → Click [Create Card]
3. Navigate to /#/p/username (with edit button)
4. Click [Share Profile]
5. Copy /#/v/username (no edit button)
6. Share link with others!
```

---

## 🌐 Deploy

### Netlify (Recommended)
```bash
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
npm run deploy
```

### Surge.sh
```bash
cd dist && surge
```

Lihat `DEPLOYMENT_GUIDE.md` untuk detail lengkap!

---

## ✨ Features

- ✅ **No Backend** - Data encoded in URL
- ✅ **3 Mode System** - Edit / Published / View
- ✅ **Share Links** - Copy shareable URLs
- ✅ **Mobile Optimized** - Responsive design
- ✅ **Spotify Integration** - Add favorite tracks
- ✅ **Image Upload** - Local image support
- ✅ **Theme Colors** - Customizable themes
- ✅ **Social Links** - Instagram, TikTok, X, YouTube

---

## 🎯 MVP Goals

- [x] URL-based sharing
- [x] Edit vs View mode separation
- [x] Mobile responsive
- [x] Copy to clipboard
- [x] No backend required

---

## 🔮 Future (Backend Phase)

- [ ] Database storage
- [ ] Clean URLs: `biocard.app/username`
- [ ] User authentication
- [ ] Custom domains
- [ ] Analytics
- [ ] QR codes

---

## 📖 Documentation

- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- Console logs - Debug dengan F12

---

## 🐛 Debug

```javascript
// Check mode
console.log('Current mode:', viewMode);

// Check URL
console.log('URL hash:', window.location.hash);

// Check data
console.log('Current data:', data);
```

---

**Built with React + Tailwind CSS** ⚛️
