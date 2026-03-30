import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink, Calendar, HardDrive, FileText, Info } from 'lucide-react';

const Preview = ({ file, onClose }) => {
  const isImage = file.type === 'image';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-nihon-ink/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-nihon-cream w-full max-w-6xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-sm shadow-2xl"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-nihon-ink text-white rounded-full hover:bg-nihon-beni transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Preview */}
        <div className="flex-[3] bg-white/20 flex items-center justify-center overflow-auto p-4 md:p-0">
          {isImage ? (
            <img 
              src={`${import.meta.env.BASE_URL}${file.url}`} 
              alt={file.name} 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-6 p-20 text-nihon-ink/20 opacity-40">
              <FileText className="w-40 h-40" />
              <p className="font-serif-jp text-2xl tracking-[0.3em] uppercase">DOCUMENT VIEW</p>
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="flex-1 bg-white p-8 md:p-12 border-l border-nihon-ink/5 flex flex-col gap-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="hanko">ARTIFACT</span>
              <span className="text-[10px] text-nihon-gumi font-sans-jp tracking-widest uppercase">Metadata • メタデータ</span>
            </div>
            <h2 className="text-2xl font-serif-jp text-nihon-ink leading-tight tracking-tight break-all">{file.name}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-nihon-cream rounded-sm flex items-center justify-center text-nihon-gumi group-hover:text-nihon-beni transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-nihon-gumi uppercase tracking-[0.2em] font-sans-jp mb-1">Created • 日時</p>
                <p className="text-xs font-sans-jp font-bold">{new Date(file.mtime).toLocaleString('ja-JP')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-nihon-cream rounded-sm flex items-center justify-center text-nihon-gumi group-hover:text-nihon-beni transition-colors">
                <HardDrive className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[9px] text-nihon-gumi uppercase tracking-[0.2em] font-sans-jp mb-1">Weight • サイズ</p>
                <p className="text-xs font-sans-jp font-bold">{file.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
               <div className="w-10 h-10 bg-nihon-cream rounded-sm flex items-center justify-center text-nihon-gumi group-hover:text-nihon-beni transition-colors">
                 <Info className="w-4 h-4" />
               </div>
               <div>
                 <p className="text-[9px] text-nihon-gumi uppercase tracking-[0.2em] font-sans-jp mb-1">Type • 種類</p>
                 <p className="text-xs font-sans-jp font-bold uppercase">{file.ext}</p>
               </div>
            </div>
          </div>

          <div className="mt-auto space-y-3">
             <a 
               href={`${import.meta.env.BASE_URL}${file.url}`} 
               download 
               className="flex items-center justify-center gap-3 w-full py-4 bg-nihon-ink text-white font-sans-jp font-bold text-xs uppercase tracking-[0.3em] hover:bg-nihon-beni transition-all duration-300 shadow-xl active:scale-95"
             >
               <Download className="w-4 h-4" />
               DOWNLOAD SCROLL
             </a>
             <a 
               href={`${import.meta.env.BASE_URL}${file.url}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-3 w-full py-4 border border-nihon-ink/10 text-nihon-ink font-sans-jp font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all duration-300 active:scale-95"
             >
                <ExternalLink className="w-4 h-4" />
                OPEN IN NEW TAB
             </a>
          </div>

          <div className="mt-4 pt-4 border-t border-nihon-ink/5 flex justify-center opacity-30 select-none pointer-events-none">
             <span className="text-4xl">🉐</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preview;
