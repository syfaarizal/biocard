import React, { useState, useEffect } from 'react';
import { 
  Home, Star, Camera, Briefcase, BarChart2, Grid, Settings, 
  Play, SkipBack, SkipForward, MapPin, Calendar, Heart, 
  Share2, ArrowLeft, Copy, Check, Music, User, Edit3,
  Instagram, Twitter, Youtube, Facebook, Link as LinkIcon, Video
} from 'lucide-react';

// --- Default Data ---
const INITIAL_DATA = {
  username: 'jazzlyn',
  realName: 'Jazzlyn Agatha Trisha',
  role: 'Singer',
  tags: 'Idol, J-Pop',
  hometown: 'Jakarta, Indonesia',
  birthdayDay: '16',
  birthdayMonth: 'February',
  birthdayYear: '2011',
  yearsActiveStart: '2023',
  heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
  secondaryImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
  themeColor: 'pink',
  likes: 9977,
  // Social Media Links (Empty by default)
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  twitter: 'https://twitter.com',
  youtube: 'https://youtube.com'
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
  }
};

// --- Main Application Component ---
export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'published'
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('biocard_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (color) => {
    setData(prev => ({ ...prev, themeColor: color }));
  };

  const saveAndPublish = () => {
    localStorage.setItem('biocard_data', JSON.stringify(data));
    setViewMode('published');
    window.scrollTo(0, 0);
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
    
    let Icon = LinkIcon;
    if (type === 'instagram') Icon = Instagram;
    if (type === 'twitter') Icon = Twitter;
    if (type === 'youtube') Icon = Youtube;
    if (type === 'tiktok') Icon = Video; // Generic video icon for TikTok as standard lib lacks it

    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`group relative p-2 rounded-xl transition-all hover:bg-white hover:shadow-md ${theme.text}`}
        title={type}
      >
        <Icon size={24} strokeWidth={1.5} />
      </a>
    );
  };

  // --- The Card Component ---
  const BioCard = () => (
    <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-[20px] md:rounded-[40px] shadow-2xl overflow-hidden p-3 md:p-6 font-sans text-gray-800 transition-all duration-500">
      
      {/* Top Navigation */}
      <div className="flex flex-wrap justify-between items-center mb-4 px-2 gap-2">
        <div className="text-xl md:text-2xl font-black italic tracking-tighter text-gray-800">SCD</div>
        <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm text-[10px] md:text-xs font-bold text-gray-500 flex items-center gap-2 whitespace-nowrap">
            <ArrowLeft size={12} /> Back
          </div>
          <div className="bg-white px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-sm text-[10px] md:text-xs font-bold text-gray-600 flex items-center gap-3 whitespace-nowrap">
            <span className="flex items-center gap-1"><Heart size={12} fill="currentColor" className="text-gray-400" /> 4</span>
            <span className="flex items-center gap-1"><Star size={12} fill="currentColor" className={theme.text} /> {data.likes}</span>
          </div>
        </div>
        <div className="hidden md:flex bg-white px-4 py-2 rounded-full shadow-sm text-xs font-bold text-gray-500 items-center gap-2">
          Next <SkipForward size={14} />
        </div>
      </div>

      {/* Main Grid Layout - Mobile: Flex Col, Desktop: Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-[80px_1fr_300px] xl:grid-cols-[80px_1fr_320px] gap-4 md:gap-6 min-h-[500px]">
        
        {/* Navigation / Social Bar (Sidebar on Desktop, Bottom Bar on Mobile) */}
        <div className="order-3 lg:order-1 flex lg:flex-col items-center justify-between py-3 px-4 lg:py-6 bg-gray-200/50 lg:bg-gray-100/50 rounded-2xl lg:rounded-3xl overflow-x-auto">
          {/* Static Nav Icons (Hidden on small mobile if too crowded, or just flexed) */}
          <div className="flex lg:flex-col gap-4 md:gap-8 text-gray-400 mr-8 lg:mr-0">
            <Home className="hover:text-gray-800 cursor-pointer transition-colors" size={20} />
            <div className={`hidden lg:block relative ${theme.text}`}>
              <Star fill="currentColor" size={20} />
              <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-1 h-8 ${theme.primary} rounded-full`}></div>
            </div>
            {/* Social Media Links Rendering */}
            <div className="flex lg:flex-col gap-4 border-l lg:border-l-0 lg:border-t border-gray-300 pl-4 lg:pl-0 lg:pt-4">
              {data.instagram && <SocialIcon type="instagram" url={data.instagram} />}
              {data.tiktok && <SocialIcon type="tiktok" url={data.tiktok} />}
              {data.twitter && <SocialIcon type="twitter" url={data.twitter} />}
              {data.youtube && <SocialIcon type="youtube" url={data.youtube} />}
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col gap-6 text-gray-400">
             <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src={data.secondaryImage} alt="mini" className="w-full h-full object-cover" />
             </div>
             <Settings size={20} />
          </div>
        </div>

        {/* Center Hero Section */}
        <div className="order-1 lg:order-2 relative rounded-[24px] md:rounded-[30px] overflow-hidden group min-h-[400px] md:min-h-auto">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gray-200">
             <img 
               src={data.heroImage} 
               alt="Hero" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               onError={(e) => e.target.src = 'https://placehold.co/600x800/e2e8f0/475569?text=No+Image'}
             />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

          {/* Floating Info Elements */}
          
          {/* Real Name - Repositioned for mobile */}
          <div className="absolute top-4 left-4 md:top-auto md:bottom-32 md:left-8 bg-white/90 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-lg border border-white/50 max-w-[150px] md:max-w-[200px]">
             <div className="text-[9px] md:text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-0.5">Real Name</div>
             <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight">{data.realName}</div>
          </div>

          {/* Birthday Stats */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
             <div className="text-[10px] md:text-xs text-gray-300 font-medium mb-1">Birthday</div>
             <div className="flex items-baseline gap-2 text-white drop-shadow-md">
                <span className="text-5xl md:text-6xl font-black tracking-tighter">{data.birthdayDay}</span>
                <div className="flex flex-col text-xs md:text-sm font-semibold leading-none opacity-90">
                  <span>{data.birthdayMonth}</span>
                  <span>{data.birthdayYear}</span>
                </div>
             </div>
          </div>

          {/* Heart Button */}
          <div className={`absolute top-4 right-4 md:top-auto md:bottom-8 md:right-24 w-10 h-10 md:w-14 md:h-14 ${theme.primary} rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform z-10`}>
             <Heart fill="currentColor" size={20} className="md:w-6 md:h-6" />
          </div>

          {/* Name Tag */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-40 md:w-48 bg-white/20 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/30 text-white">
             <h1 className="text-2xl md:text-3xl font-black italic leading-none drop-shadow-lg uppercase break-words">
               {data.username}
             </h1>
             <div className="flex justify-between mt-3 text-[10px] md:text-xs font-medium opacity-90">
                <div className="flex flex-col items-center">
                   <Heart size={10} className="mb-1" /> 9k
                </div>
                <div className="flex flex-col items-center">
                   <Star size={10} className="mb-1" /> 7k
                </div>
                <div className="flex flex-col items-center">
                   <Share2 size={10} className="mb-1" /> 4k
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar / Widgets - Mobile: Stacked below hero */}
        <div className="order-2 lg:order-3 flex flex-col gap-3 md:gap-5">
          
          {/* Location & Tags */}
          <div className="bg-white rounded-[24px] md:rounded-3xl p-4 md:p-5 shadow-sm border border-gray-100">
             <div className="flex items-start justify-between mb-3 md:mb-4">
                <span className="font-bold text-gray-800 text-base md:text-lg">Hometown</span>
                <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500 text-right max-w-[50%]">
                   <MapPin size={12} /> {data.hometown}
                </div>
             </div>
             <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-[10px] md:text-xs font-bold">{data.role}</span>
                {data.tags.split(',').map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-[10px] md:text-xs font-medium">{tag.trim()}</span>
                ))}
             </div>
          </div>

          {/* Music Widget */}
          <div className="bg-white rounded-[24px] md:rounded-3xl p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center">
             <div className="w-full flex items-center gap-4">
                <div className={`w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-gray-200 rounded-xl md:rounded-2xl relative overflow-hidden group`}>
                   <div className={`absolute inset-0 ${theme.primary} opacity-20`}></div>
                   <Music className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${theme.text} w-6 h-6 md:w-8 md:h-8 opacity-50`} />
                </div>
                <div className="flex-1 text-left overflow-hidden">
                   <div className="text-xs md:text-sm font-bold text-gray-800 truncate">Now Playing</div>
                   <div className="text-[10px] md:text-xs text-gray-400 truncate">{data.songTitle || 'Select a song'}</div>
                   {/* Fake Waveform */}
                   <div className="flex items-center gap-0.5 h-3 md:h-4 w-full mt-2 opacity-50">
                     {[...Array(12)].map((_, i) => (
                       <div key={i} className={`w-0.5 md:w-1 rounded-full ${theme.primary}`} style={{height: `${30 + Math.random() * 70}%`}}></div>
                     ))}
                   </div>
                </div>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${theme.soft} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}>
                   <Play size={12} className={`ml-0.5 ${theme.text}`} fill="currentColor" />
                </div>
             </div>
          </div>

          {/* Years Active & Small Media Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-5 flex-1">
             <div className="bg-white rounded-[24px] md:rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                <div className="text-[10px] md:text-xs text-gray-400 font-bold">Active Since</div>
                <div className="text-xl md:text-2xl font-black text-gray-800 mt-1">{data.yearsActiveStart}</div>
                <div className={`w-8 h-8 ${theme.primary} rounded-full flex items-center justify-center text-white mt-2 self-end`}>
                   <Calendar size={14} />
                </div>
             </div>

             <div className="bg-white rounded-[24px] md:rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden relative min-h-[100px]">
                <div className="absolute top-3 left-3 z-10 text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">Gallery</div>
                <img src={data.secondaryImage} className="w-full h-full object-cover rounded-2xl" alt="Media" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );

  // --- Editor View ---
  if (viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-200 p-2 md:p-8 font-sans">
        
        {/* Editor Header */}
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

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8 pb-10">
          
          {/* Editor Form Panel */}
          <div className="bg-white rounded-[24px] md:rounded-3xl p-5 md:p-6 shadow-xl h-fit order-2 xl:order-1">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <div className={`p-2 rounded-lg ${theme.soft}`}>
                <Edit3 size={18} className={theme.text} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
            </div>
            
            <div className="space-y-6">
              
              {/* Theme Selector */}
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

              {/* Social Media Section */}
              <div className="space-y-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Social Media (Links)</label>
                 <div className="grid grid-cols-1 gap-3">
                    <div className="relative">
                      <Instagram size={16} className="absolute top-3 left-3 text-gray-400" />
                      <input name="instagram" value={data.instagram} onChange={handleInputChange} placeholder="Instagram URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                    </div>
                    <div className="relative">
                      <Video size={16} className="absolute top-3 left-3 text-gray-400" />
                      <input name="tiktok" value={data.tiktok} onChange={handleInputChange} placeholder="TikTok URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                    </div>
                    <div className="relative">
                      <Twitter size={16} className="absolute top-3 left-3 text-gray-400" />
                      <input name="twitter" value={data.twitter} onChange={handleInputChange} placeholder="X / Twitter URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                    </div>
                    <div className="relative">
                      <Youtube size={16} className="absolute top-3 left-3 text-gray-400" />
                      <input name="youtube" value={data.youtube} onChange={handleInputChange} placeholder="YouTube URL" className={`w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${theme.ring} focus:border-transparent`} />
                    </div>
                 </div>
              </div>

              {/* Identity Section */}
              <div className="space-y-4 pt-4 border-t">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Identity</label>
                 <div className="grid grid-cols-2 gap-4">
                    <input name="username" value={data.username} onChange={handleInputChange} placeholder="Username" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                    <input name="role" value={data.role} onChange={handleInputChange} placeholder="Role" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                 </div>
                 <input name="realName" value={data.realName} onChange={handleInputChange} placeholder="Full Real Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
              </div>

              {/* Details Section */}
              <div className="space-y-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Details</label>
                 <input name="hometown" value={data.hometown} onChange={handleInputChange} placeholder="Hometown" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                 <input name="tags" value={data.tags} onChange={handleInputChange} placeholder="Tags (comma separated)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                 <div className="grid grid-cols-3 gap-2">
                    <input name="birthdayDay" value={data.birthdayDay} onChange={handleInputChange} placeholder="DD" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                    <input name="birthdayMonth" value={data.birthdayMonth} onChange={handleInputChange} placeholder="Month" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                    <input name="birthdayYear" value={data.birthdayYear} onChange={handleInputChange} placeholder="YYYY" className="bg-gray-50 border rounded-xl px-3 py-2 text-sm text-center"/>
                 </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Images (URL)</label>
                 <input name="heroImage" value={data.heroImage} onChange={handleInputChange} placeholder="Main Photo URL" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
                 <input name="secondaryImage" value={data.secondaryImage} onChange={handleInputChange} placeholder="Secondary Photo URL" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all" />
              </div>

            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="order-1 xl:order-2">
             <div className="sticky top-8 space-y-4">
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

        </div>
      </div>
    );
  }

  // --- Published / Result View ---
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-0 md:p-4 overflow-x-hidden">
      
      {/* Published Header */}
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

      {/* The Result Card */}
      <div className="w-full md:max-w-5xl bg-gray-100 md:rounded-b-xl p-4 md:p-8 shadow-2xl min-h-screen md:min-h-0">
         <BioCard />
         
         {/* Footer Actions */}
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