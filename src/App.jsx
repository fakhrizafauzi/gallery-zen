import React, { useState, useEffect } from 'react';
import { LayoutGrid, FileText, Settings, Download, Maximize2, X, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Gallery from './components/Gallery';
import Preview from './components/Preview';

function App() {
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'images', 'documents'
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}files-manifest.json`)
      .then(res => res.json())
      .then(data => {
        setManifest(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading manifest:', err);
        setLoading(false);
      });
  }, []);

  const filteredImages = manifest?.images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredDocs = manifest?.documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-nihon-cream/80 backdrop-blur-md border-b border-nihon-ink/5 py-4 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-nihon-beni flex items-center justify-center rounded-sm rotate-3 shadow-lg">
            <span className="text-white font-serif-jp text-xl">禅</span>
          </div>
          <div>
            <h1 className="text-2xl font-serif-jp tracking-tighter text-nihon-ink">ZEN GALLERY</h1>
            <p className="text-[10px] text-nihon-gumi font-sans-jp uppercase tracking-widest leading-none">Minimalist Archive • 禅アーカイブ</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/40 p-1 rounded-sm border border-nihon-ink/5 max-w-md w-full">
          <Search className="w-4 h-4 ml-2 text-nihon-gumi" />
          <input 
            type="text" 
            placeholder="Search artifacts... 検索する" 
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 px-2 font-sans-jp"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-sans-jp uppercase tracking-widest">
           <span className="text-nihon-beni font-bold">{manifest?.total || 0} ITEMS</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Tabs */}
        <div className="flex items-center justify-center mb-12 gap-2 md:gap-8">
          {[
            { id: 'all', label: 'Everything', jp: 'すべて', icon: LayoutGrid },
            { id: 'images', label: 'Visuals', jp: '画像', icon: Maximize2 },
            { id: 'documents', label: 'Texts', jp: '文書', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 flex flex-col items-center transition-all duration-300 group ${activeTab === tab.id ? 'text-nihon-beni' : 'text-nihon-gumi hover:text-nihon-ink'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                <span className="text-xs font-sans-jp uppercase tracking-[0.2em] font-bold">{tab.label}</span>
              </div>
              <span className="text-[10px] font-serif-jp opacity-60">{tab.jp}</span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute -bottom-1 w-full h-[1px] bg-nihon-beni shadow-[0_0_8px_rgba(192,57,43,0.4)]"
                />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
            <div className="w-16 h-16 border-2 border-nihon-beni/20 border-t-nihon-beni rounded-full animate-spin mb-4" />
            <p className="font-serif-jp text-lg tracking-widest">読み込み中...</p>
          </div>
        ) : (
          <Gallery 
            activeTab={activeTab} 
            images={filteredImages} 
            documents={filteredDocs} 
            onSelectFile={setSelectedFile}
          />
        )}
      </main>

      {/* Desktop Footer Info */}
      <footer className="fixed bottom-0 left-0 w-full bg-nihon-cream pb-6 pt-4 px-12 border-t border-nihon-ink/5 hidden md:flex items-center justify-between pointer-events-none">
          <div className="text-[10px] text-nihon-gumi tracking-[0.3em] font-sans-jp uppercase opacity-50">
            Design Philosophy: Wabi-Sabi Minimalism
          </div>
          <div className="text-[10px] text-nihon-gumi tracking-[0.3em] font-sans-jp uppercase opacity-50">
            Last Sync: {manifest ? new Date(manifest.updatedAt).toLocaleTimeString() : '--:--'}
          </div>
      </footer>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <Preview 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
