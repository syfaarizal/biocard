import React, { useState, useEffect } from 'react';
import { 
  Home, Star, Camera, Briefcase, BarChart2, Settings, 
  Play, SkipForward, MapPin, Calendar, Heart, 
  Share2, ArrowLeft, Copy, Check, Music, User, Edit3,
  Instagram, Youtube, Link as LinkIcon, Sparkles, Zap, Crown
} from 'lucide-react';

// Logo X (Twitter)
const IconBrandX = ({ size = 20, className }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    aria-label="X (Twitter)"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Logo TikTok
const IconBrandTikTok = ({ size = 20, className }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    aria-label="TikTok"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// --- Default Data ---
const INITIAL_DATA = {
  username: 'kaishiscd',
  realName: 'Kai Shi',
  role: 'Coder',
  tags: 'Creator, Developer',
  hometown: 'Jawa Barat, Indonesia',
  birthdayDay: '13',
  birthdayMonth: 'April',
  birthdayYear: '2006',
  yearsActiveStart: '2026',
  heroImage: 'https://i.pinimg.com/736x/65/e7/aa/65e7aac180c9321c90d2f3434e1f1f69.jpg',
  secondaryImage: 'https://i.pinimg.com/736x/b3/53/e0/b353e01568cd45a320acb490c90748f4.jpg',
  themeColor: 'red',
  // Social Media Links (Empty by default)
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  twitter: 'https://twitter.com',
  youtube: 'https://youtube.com',
  // Spotify Track
  spotifyLink: 'https://open.spotify.com/intl-id/track/4KKVuHMZLBUltt0VxLc23N?si=dc2168d2114a4f63',
  songTitle: 'GUARDED',
  songArtist: 'Chris Grey',
  songThumbnail: 'https://i.pinimg.com/1200x/6a/81/e0/6a81e082aefd34078fbbd05c46aca6c3.jpg'
};

// --- Theme Configurations ---
const THEMES = {
  pink: {
    primary: 'bg-pink-500',
    text: 'text-pink-500',
    soft: 'bg-pink-100',
    border: 'border-pink-200',
    hover: 'hover:text-pink-600',
    ring: 'focus:ring-pink-500'
  },
  blue: {
    primary: 'bg-blue-500',
    text: 'text-blue-500',
    soft: 'bg-blue-100',
    border: 'border-blue-200',
    hover: 'hover:text-blue-600',
    ring: 'focus:ring-blue-500'
  },
  purple: {
    primary: 'bg-purple-500',
    text: 'text-purple-500',
    soft: 'bg-purple-100',
    border: 'border-purple-200',
    hover: 'hover:text-purple-600',
    ring: 'focus:ring-purple-500'
  },
  green: {
    primary: 'bg-emerald-500',
    text: 'text-emerald-500',
    soft: 'bg-emerald-100',
    border: 'border-emerald-200',
    hover: 'hover:text-emerald-600',
    ring: 'focus:ring-emerald-500'
  },
  orange: {
    primary: 'bg-orange-500',
    text: 'text-orange-500',
    soft: 'bg-orange-100',
    border: 'border-orange-200',
    hover: 'hover:text-orange-600',
    ring: 'focus:ring-orange-500'
  },
  red: {
    primary: 'bg-red-500',
    text: 'text-red-500',
    soft: 'bg-red-100',
    border: 'border-red-200',
    hover: 'hover:text-red-600',
    ring: 'focus:ring-red-500'
  }
};

// --- Main Application Component ---
export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'published'
  const [isCopied, setIsCopied] = useState(false);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('biocard_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setIsSaved(false); // Mark as unsaved when any change is made
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to compress image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize if too large (max 800px width)
          const maxWidth = 800;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to 0.7 quality
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          setData(prev => ({ ...prev, [fieldName]: compressedImage }));
          setIsSaved(false); // Mark as unsaved
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpotifyLink = async (e) => {
    console.log('⚡ handleSpotifyLink CALLED! Event:', e.target.value);
    
    const link = e.target.value;
    
    // First, update the link immediately
    setData(prev => ({ ...prev, spotifyLink: link }));
    setIsSaved(false);

    console.log('📝 Link updated to:', link);

    // Check if it's a valid Spotify track link (support all formats including regional)
    const isSpotifyTrack = link.includes('open.spotify.com') && link.includes('/track/');
    
    if (isSpotifyTrack) {
      console.log('✅ Valid Spotify link detected!');
      setIsLoadingSpotify(true);
      try {
        console.log('🎵 Fetching Spotify data for:', link);
        const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(link)}`);
        if (!response.ok) throw new Error('Failed to fetch Spotify data');
        
        const spotifyData = await response.json();
        console.log('✅ Spotify data received:', spotifyData);
        console.log('📊 Full Spotify Response:', JSON.stringify(spotifyData, null, 2));
        
        // Extract title and artist from the response
        let songTitle = spotifyData.title || '';
        let songArtist = spotifyData.author_name || '';
        
        console.log('📝 Title from API:', songTitle);
        console.log('👤 Author from API:', songArtist);
        
        // If author_name is empty, try parsing from iframe HTML
        if (!songArtist && spotifyData.html) {
          console.log('⚠️ No author_name, trying to parse from iframe HTML...');
          const iframeHTML = spotifyData.html;
          console.log('🔍 iframe HTML:', iframeHTML);
          
          // Try to extract from iframe title attribute
          const titleMatch = iframeHTML.match(/title="([^"]+)"/);
          if (titleMatch && titleMatch[1]) {
            const iframeTitle = titleMatch[1];
            console.log('📺 iframe title found:', iframeTitle);
            
            // Format is usually "Spotify Embed: Song Title" or similar
            // Try to extract artist from iframe title
            if (iframeTitle.includes(' by ')) {
              const parts = iframeTitle.split(' by ');
              if (parts.length === 2) {
                songArtist = parts[1].trim();
                console.log('✅ Artist extracted from iframe:', songArtist);
              }
            }
          }
        }
        
        // If still no artist, try parsing from title field
        if (!songArtist && songTitle) {
          console.log('⚠️ Still no artist, trying to parse from title field...');
          
          // Try parsing "Title by Artist" format
          const byIndex = songTitle.lastIndexOf(' by ');
          if (byIndex > -1) {
            const parsedTitle = songTitle.substring(0, byIndex).trim();
            const parsedArtist = songTitle.substring(byIndex + 4).trim();
            songTitle = parsedTitle;
            songArtist = parsedArtist;
            console.log('✅ Parsed from title - Title:', songTitle, '| Artist:', songArtist);
          } 
          // Try parsing "Artist - Title" format
          else {
            const dashIndex = songTitle.indexOf(' - ');
            if (dashIndex > -1) {
              const parsedArtist = songTitle.substring(0, dashIndex).trim();
              const parsedTitle = songTitle.substring(dashIndex + 3).trim();
              songTitle = parsedTitle;
              songArtist = parsedArtist;
              console.log('✅ Parsed from title (dash) - Title:', songTitle, '| Artist:', songArtist);
            }
          }
        }
        
        console.log('🎵 FINAL - Title:', songTitle || 'Unknown Track', '| Artist:', songArtist || 'Unknown Artist');
        
        // Force update with new data
        setData(prev => {
          const newData = {
            ...prev,
            spotifyLink: link,
            songTitle: songTitle || 'Unknown Track',
            songArtist: songArtist || 'Unknown Artist',
            songThumbnail: spotifyData.thumbnail_url || ''
          };
          console.log('🔄 State updated with:', newData);
          return newData;
        });
        
        setIsLoadingSpotify(false);
        console.log('✅ Spotify update complete!');
      } catch (error) {
        console.error('❌ Failed to fetch Spotify data:', error);
        alert('Failed to load Spotify track. Please check the link and try again.');
        setIsLoadingSpotify(false);
      }
    } else if (link === '') {
      // Reset to default if link is cleared
      console.log('🔄 Clearing Spotify data');
      setData(prev => ({ 
        ...prev,
        spotifyLink: '',
        songTitle: '',
        songArtist: '',
        songThumbnail: ''
      }));
    } else {
      console.log('⚠️ Not a valid Spotify track link:', link);
      console.log('💡 Link should contain "open.spotify.com" and "/track/"');
    }
  };

  const handleThemeChange = (color) => {
    setData(prev => ({ ...prev, themeColor: color }));
    setIsSaved(false);
  };

  const handleSaveChanges = () => {
    try {
      console.log('💾 Saving data:', data);
      localStorage.setItem('biocard_data', JSON.stringify(data));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Hide after 3 seconds
      console.log('✅ Data saved successfully!');
    } catch (error) {
      console.error('❌ Failed to save data:', error);
      alert('Failed to save changes. Images might be too large.');
    }
  };

  const saveAndPublish = () => {
    try {
      localStorage.setItem('biocard_data', JSON.stringify(data));
      setViewMode('published');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Failed to save data. Images might be too large. Please try with smaller images.');
    }
  };

  const handleEditClick = () => {
    setViewMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyLink = () => {
    const fakeUrl = `biocard.app/${data.username}`;
    navigator.clipboard.writeText(fakeUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const theme = THEMES[data.themeColor];

  // --- Helper to render Social Icon ---
  const SocialIcon = ({ type, url }) => {
    if (!url) return null;
    
    // Default fallback
    let IconComponent = LinkIcon;
    let iconProps = { size: 20 };

    if (type === 'instagram') {
      IconComponent = Instagram;
    } else if (type === 'twitter') {
      IconComponent = IconBrandX;
      iconProps = { size: 18 };
    } else if (type === 'youtube') {
      IconComponent = Youtube;
    } else if (type === 'tiktok') {
      IconComponent = IconBrandTikTok;
      iconProps = { size: 18 };
    }

    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`group relative p-2.5 rounded-xl transition-all hover:bg-white hover:shadow-md ${theme.text} flex items-center justify-center`}
        title={type}
      >
        <IconComponent {...iconProps} strokeWidth={1.5} />
      </a>
    );
  };

  // --- The Card Component ---
  const BioCard = () => (
    <div className="w-full max-w-6xl mx-auto bg-gray-50 rounded-[40px] shadow-2xl overflow-hidden p-3 md:p-5 font-sans text-gray-800 transition-all duration-500 relative">
      
      <div className="absolute top-8 left-8 z-10 hidden lg:block opacity-30">
        <div className="text-3xl font-black italic tracking-tighter text-gray-800 select-none">SCD</div>
        <div className="text-[10px] font-bold tracking-widest uppercase mt-1">Profile</div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[100px_1fr_350px] gap-4 md:gap-6 lg:gap-8 min-h-[600px]">
        
        <div className="order-3 lg:order-1 flex lg:flex-col items-center justify-between py-3 px-4 lg:py-8 bg-gray-200/50 lg:bg-gray-100/50 rounded-2xl lg:rounded-[32px] overflow-x-auto lg:overflow-hidden h-full">
          <div className="flex lg:flex-col gap-6 md:gap-10 text-gray-400 mr-8 lg:mr-0 lg:mt-16">
            <Home className="hover:text-gray-800 cursor-pointer transition-colors mt-2" size={24} />
            <div className={`hidden lg:block relative ${theme.text}`}>
              <Star fill="currentColor" size={24} />
              <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-10 ${theme.primary} rounded-full`}></div>
            </div>
            
            <div className="flex lg:flex-col gap-5 border-l lg:border-l-0 lg:border-t border-gray-300 pl-4 lg:pl-0 lg:pt-8 items-center">
              {data.instagram && <SocialIcon type="instagram" url={data.instagram} />}
              {data.tiktok && <SocialIcon type="tiktok" url={data.tiktok} />}
              {data.twitter && <SocialIcon type="twitter" url={data.twitter} />}
              {data.youtube && <SocialIcon type="youtube" url={data.youtube} />}
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col gap-5 text-gray-400 items-center pb-4 pt-4">
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-100">
                <img src={data.secondaryImage} alt="mini" className="w-full h-full object-cover" />
             </div>
             
             <button 
               onClick={handleEditClick}
               className={`group relative p-3 rounded-2xl transition-all hover:bg-white hover:shadow-lg cursor-pointer ${theme.hover} ${viewMode === 'edit' ? theme.text : 'text-gray-400'}`}
               aria-label="Edit Profile"
             >
                <Settings size={22} />
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  Edit Profile
                </div>
             </button>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative rounded-[32px] lg:rounded-[40px] overflow-hidden group min-h-[500px] shadow-sm">
          <div className="absolute inset-0 bg-gray-200">
             <img 
               src={data.heroImage} 
               alt="Hero" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               onError={(e) => e.target.src = 'https://placehold.co/600x800/e2e8f0/475569?text=No+Image'}
             />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent lg:hidden"></div>
          
          <div className="absolute top-6 left-6 lg:left-10 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 max-w-[180px] lg:max-w-[220px]">
             <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Real Name</div>
             <div className="text-sm lg:text-base font-bold text-gray-900 leading-tight">{data.realName}</div>
          </div>

          <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10">
             <div className="text-xs text-white/80 font-medium mb-1 tracking-wide uppercase">Birthday</div>
             <div className="flex items-baseline gap-3 text-white drop-shadow-lg">
                <span className="text-6xl lg:text-7xl font-black tracking-tighter leading-none">{data.birthdayDay}</span>
                <div className="flex flex-col text-sm font-bold leading-none opacity-90 gap-1">
                  <span>{data.birthdayMonth}</span>
                  <span>{data.birthdayYear}</span>
                </div>
             </div>
          </div>

          <div className={`absolute top-6 right-6 lg:right-10 w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/50 hover:${theme.text} shadow-2xl cursor-pointer transition-all z-20 group-hover:scale-110`}>
             <Heart fill="currentColor" size={24} className="lg:w-8 lg:h-8" />
          </div>

          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 max-w-[200px] lg:max-w-[240px] text-right">
             <div className="bg-black/30 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-2xl">
                <h1 className={`font-black italic leading-none text-white uppercase tracking-tight mb-3 drop-shadow-md break-words ${
                  data.username.length > 12 ? 'text-xl lg:text-2xl' : 
                  data.username.length > 8 ? 'text-2xl lg:text-3xl' : 
                  'text-3xl lg:text-4xl'
                }`}>
                  {data.username}
                </h1>
                
                <div className="flex gap-2 justify-between max-w-full">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800 shadow-sm`}>
                      <Sparkles size={14} className={theme.text} fill="currentColor" />
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800 shadow-sm`}>
                      <Heart size={14} className={theme.text} fill="currentColor" />
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800 shadow-sm`}>
                      <Crown size={14} className={theme.text} fill="currentColor" />
                    </div>
                </div>
             </div>
          </div>
        </div>

        <div className="order-2 lg:order-3 flex flex-col gap-4 lg:gap-6 h-full">
          
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50">
             <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-xl">Hometown</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                   <MapPin size={12} /> {data.hometown}
                </div>
             </div>
             <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-bold tracking-wide">{data.role}</span>
                {data.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 rounded-full text-xs font-medium transition-colors cursor-default">{tag.trim()}</span>
                ))}
             </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50 flex flex-col justify-center relative overflow-hidden group">
             <div className={`absolute -right-10 -top-10 w-40 h-40 ${theme.soft} rounded-full opacity-50`}></div>
             
             <div className="flex items-center gap-5 relative z-10">
                {data.songThumbnail ? (
                  <div className="w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <img src={data.songThumbnail} alt="Album art" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-16 h-16 flex-shrink-0 ${theme.soft} rounded-2xl flex items-center justify-center`}>
                    <Music className={theme.text} size={32} />
                  </div>
                )}
                <div className="flex-1 overflow-hidden">
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                     {data.songTitle || 'Music'}
                   </div>
                   <div className="text-base font-bold text-gray-800 truncate">
                     {data.songArtist || 'Add your favorite song'}
                   </div>
                   <div className="flex items-end gap-0.5 h-4 mt-2 opacity-60">
                     {[...Array(16)].map((_, i) => (
                       <div key={i} className={`w-1 rounded-full ${theme.primary} transition-all duration-300`} style={{height: `${Math.max(20, Math.random() * 100)}%`}}></div>
                     ))}
                   </div>
                </div>
                {data.spotifyLink ? (
                  <a 
                    href={data.spotifyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full ${theme.soft} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm`}
                  >
                    <Play size={18} className={`ml-1 ${theme.text}`} fill="currentColor" />
                  </a>
                ) : (
                  <div className={`w-12 h-12 rounded-full ${theme.soft} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-sm opacity-50`}>
                    <Play size={18} className={`ml-1 ${theme.text}`} fill="currentColor" />
                  </div>
                )}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6 flex-1 min-h-[180px]">
             <div className={`bg-gray-100 rounded-[32px] p-5 flex flex-col justify-between relative overflow-hidden`}>
                <div className="text-xs text-gray-500 font-bold uppercase z-10">Active Since</div>
                <div className="text-4xl font-black text-gray-800 z-10">{data.yearsActiveStart}</div>
                <div className={`self-end p-3 rounded-full bg-white text-${theme.text} shadow-sm z-10`}>
                   <Calendar size={18} className={theme.text} />
                </div>
                <Calendar size={100} className="absolute -bottom-4 -left-4 text-gray-200/50 rotate-12" />
             </div>

             <div className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100/50 overflow-hidden relative group cursor-pointer">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 shadow-sm flex items-center gap-1">
                   Gallery
                </div>
                <img src={data.secondaryImage} className="w-full h-full object-cover rounded-[24px] group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-[24px]"></div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );

  // --- Editor View (unchanged logic) ---
  if (viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-200 p-2 md:p-8 font-sans">
        
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 pt-4 md:pt-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${theme.primary} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md`}>B</div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">BioCard Creator</h1>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <button 
              onClick={() => {
                if(window.confirm("Reset data to default?")) setData(INITIAL_DATA);
              }}
              className="flex-1 md:flex-none px-4 py-2 bg-white text-gray-600 rounded-lg text-xs md:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Reset
            </button>
            <button 
              onClick={saveAndPublish}
              className={`flex-1 md:flex-none px-6 py-2 ${theme.primary} text-white rounded-lg text-xs md:text-sm font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2`}
            >
              Create Card <Share2 size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
          
          <div className="order-1">
             <div className="space-y-4">
               <div className="flex items-center justify-between px-2">
                 <span className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Live Preview
                 </span>
                 <span className="text-xs text-gray-400 hidden md:inline">Scale window to test responsiveness</span>
               </div>
               <div className="transform transition-all duration-500">
                 <BioCard />
               </div>
             </div>
          </div>

          <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-6 shadow-xl h-fit order-2 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <div className={`p-2 rounded-lg ${theme.soft}`}>
                <Edit3 size={18} className={theme.text} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Kolom Kiri */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Theme Color</label>
                  <div className="flex flex-wrap gap-3">
                    {Object.keys(THEMES).map(color => (
                      <button
                        key={color}
                        onClick={() => handleThemeChange(color)}
                        className={`w-10 h-10 rounded-full border-4 transition-all ${
                          data.themeColor === color ? 'border-gray-800 scale-110 shadow-md' : 'border-transparent'
                        } ${THEMES[color].primary}`}
                        aria-label={`Select ${color} theme`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Social Media (Links)</label>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                          <Instagram size={16} />
                        </div>
                        <input name="instagram" value={data.instagram} onChange={handleInputChange} placeholder="Instagram URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                      </div>
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                          <IconBrandTikTok size={16} />
                        </div>
                        <input name="tiktok" value={data.tiktok} onChange={handleInputChange} placeholder="TikTok URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                      </div>
                      <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                          <IconBrandX size={16} />
                        </div>
                        <input name="twitter" value={data.twitter} onChange={handleInputChange} placeholder="X / Twitter URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                      </div>
                      <div className="relative">
                         <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                           <Youtube size={16} />
                         </div>
                        <input name="youtube" value={data.youtube} onChange={handleInputChange} placeholder="YouTube URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Spotify Track</label>
                   <div className="relative">
                     <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
                       <Music size={16} />
                     </div>
                     <input 
                       name="spotifyLink" 
                       value={data.spotifyLink} 
                       onChange={handleSpotifyLink} 
                       placeholder="Paste Spotify track URL (e.g. https://open.spotify.com/track/...)" 
                       className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-20 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`}
                       disabled={isLoadingSpotify}
                     />
                     {data.spotifyLink && !isLoadingSpotify && (
                       <button
                         onClick={() => {
                           console.log('🧹 Clearing Spotify link');
                           setData(prev => ({ 
                             ...prev,
                             spotifyLink: '',
                             songTitle: '',
                             songArtist: '',
                             songThumbnail: ''
                           }));
                           setIsSaved(false);
                         }}
                         className="absolute top-2.5 right-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium"
                       >
                         Clear
                       </button>
                     )}
                     {isLoadingSpotify && (
                       <div className="absolute top-3 right-3">
                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
                       </div>
                     )}
                   </div>
                   {isLoadingSpotify && (
                     <div className="text-xs text-gray-500 italic">Loading track info...</div>
                   )}
                   {!isLoadingSpotify && data.songTitle && (
                     <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
                       {data.songThumbnail && (
                         <img src={data.songThumbnail} alt="Album" className="w-12 h-12 rounded-lg object-cover" />
                       )}
                       <div className="flex-1 min-w-0">
                         <div className="text-sm font-bold text-gray-800 truncate">{data.songTitle}</div>
                         {data.songArtist && (
                           <div className="text-xs text-gray-500 truncate">by {data.songArtist}</div>
                         )}
                       </div>
                     </div>
                   )}
                </div>

                <div className="space-y-4">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Images (Upload)</label>
                   
                   {/* Main Photo Upload */}
                   <div className="space-y-2">
                     <label className="text-xs text-gray-500 font-medium">Main Photo</label>
                     <div className="relative">
                       <input 
                         type="file" 
                         accept="image/*" 
                         onChange={(e) => handleImageUpload(e, 'heroImage')}
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 cursor-pointer"
                       />
                       {data.heroImage && (
                         <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                           <img src={data.heroImage} alt="Main preview" className="w-full h-full object-cover" />
                         </div>
                       )}
                     </div>
                   </div>

                   {/* Secondary Photo Upload */}
                   <div className="space-y-2">
                     <label className="text-xs text-gray-500 font-medium">Secondary Photo</label>
                     <div className="relative">
                       <input 
                         type="file" 
                         accept="image/*" 
                         onChange={(e) => handleImageUpload(e, 'secondaryImage')}
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 cursor-pointer"
                       />
                       {data.secondaryImage && (
                         <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                           <img src={data.secondaryImage} alt="Secondary preview" className="w-full h-full object-cover" />
                         </div>
                       )}
                     </div>
                   </div>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-6">
                <div className="space-y-4">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Identity</label>
                   <div className="grid grid-cols-2 gap-4">
                      <input name="username" value={data.username} onChange={handleInputChange} placeholder="Username" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                      <input name="role" value={data.role} onChange={handleInputChange} placeholder="Role" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                   </div>
                   <input name="realName" value={data.realName} onChange={handleInputChange} placeholder="Full Real Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                </div>

                <div className="space-y-4">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Details</label>
                   <input name="hometown" value={data.hometown} onChange={handleInputChange} placeholder="Hometown" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                   <input name="tags" value={data.tags} onChange={handleInputChange} placeholder="Tags (comma separated)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                   
                   <input 
                      name="yearsActiveStart" 
                      value={data.yearsActiveStart} 
                      onChange={handleInputChange} 
                      placeholder="Active Since (Year)" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" 
                   />

                   <div className="grid grid-cols-3 gap-2">
                      <input name="birthdayDay" value={data.birthdayDay} onChange={handleInputChange} placeholder="DD" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                      <input name="birthdayMonth" value={data.birthdayMonth} onChange={handleInputChange} placeholder="Month" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                      <input name="birthdayYear" value={data.birthdayYear} onChange={handleInputChange} placeholder="YYYY" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                   </div>
                </div>
              </div>

            </div>

            {/* Save Changes Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveChanges}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                  isSaved 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gray-900 hover:bg-gray-800 hover:shadow-xl'
                }`}
              >
                {isSaved ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} /> Changes Saved!
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
              {!isSaved && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Don't forget to save your changes!
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- Published / Result View (unchanged mostly) ---
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-0 md:p-4 overflow-x-hidden">
      
      <div className="w-full md:max-w-2xl bg-gray-800 md:rounded-t-xl p-4 flex flex-col md:flex-row items-center gap-4 border-b border-gray-700 sticky top-0 z-50 md:static">
         <div className="hidden md:flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
         </div>
         <div 
            onClick={copyLink}
            className="w-full flex-1 bg-gray-900 rounded-lg px-4 py-3 md:py-1.5 text-xs text-gray-400 font-mono flex justify-between items-center group cursor-pointer active:scale-95 transition-transform"
         >
            <span className="truncate max-w-[200px] md:max-w-none">biocard.app/<span className="text-white">{data.username}</span></span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-600 group-hover:text-gray-400 hidden md:block">Click to Copy</span>
              {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </div>
         </div>
      </div>

      <div className="w-full md:max-w-6xl bg-gray-100 md:rounded-b-xl p-4 md:p-8 shadow-2xl min-h-screen md:min-h-0">
         <BioCard />
         
         <div className="mt-12 mb-8 flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => setViewMode('edit')}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold shadow-xl hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <Edit3 size={18} /> Edit This Card
            </button>
            <button 
              onClick={copyLink}
              className={`px-8 py-4 ${theme.primary} text-white rounded-full font-bold shadow-xl hover:brightness-110 hover:-translate-y-1 transition-all flex items-center justify-center gap-2`}
            >
              {isCopied ? 'Link Copied!' : 'Share Profile'} <Share2 size={18} />
            </button>
         </div>
      </div>

      {isCopied && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce z-50 whitespace-nowrap">
          <Check size={18} className="text-green-400" /> Link Copied!
        </div>
      )}

    </div>
  );
}