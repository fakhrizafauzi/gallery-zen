import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, Download, Maximize2 } from 'lucide-react';

const FileCard = ({ file, onClick, variant = 'grid' }) => {
  const isImage = file.type === 'image';
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (variant === 'list') {
    return (
      <motion.div 
        variants={item}
        whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        onClick={onClick}
        className="group flex items-center justify-between p-4 cursor-pointer zen-card hover:border-nihon-beni/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-nihon-ink/5 rounded-sm">
            <FileText className="w-5 h-5 text-nihon-gumi group-hover:text-nihon-beni transition-colors" />
          </div>
          <div>
            <h4 className="text-sm font-sans-jp font-bold text-nihon-ink group-hover:text-nihon-beni transition-colors line-clamp-1">{file.name}</h4>
            <div className="flex items-center gap-3 text-[10px] text-nihon-gumi uppercase tracking-widest mt-0.5">
              <span>{file.ext}</span>
              <span className="opacity-30">•</span>
              <span>{file.size}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <a 
             href={`${import.meta.env.BASE_URL}${file.url}`} 
             download 
             onClick={(e) => e.stopPropagation()} 
             className="p-2 text-nihon-gumi hover:text-nihon-beni transition-colors"
           >
             <Download className="w-4 h-4" />
           </a>
           <button className="p-2 text-nihon-gumi hover:text-nihon-beni transition-colors">
              <Maximize2 className="w-4 h-4" />
           </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={item}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-white/40 border border-nihon-ink/5 hover:border-nihon-beni/20 p-2 transition-all duration-500 rounded-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-nihon-ink/5 flex items-center justify-center group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all">
        {isImage ? (
          <img 
            src={`${import.meta.env.BASE_URL}${file.url}`} 
            alt={file.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <FileText className="w-10 h-10 text-nihon-gumi" />
        )}
        
        <div className="absolute inset-0 bg-nihon-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-nihon-ink hover:text-nihon-beni scale-0 group-hover:scale-100 transition-transform delay-75 duration-300">
             <Maximize2 className="w-4 h-4" />
           </div>
        </div>
      </div>
      
      <div className="mt-3 px-1 flex-1">
        <h4 className="text-[11px] font-sans-jp font-bold text-nihon-ink uppercase tracking-wider line-clamp-1 group-hover:text-nihon-beni transition-colors">{file.name}</h4>
        <div className="flex items-center justify-between mt-1 text-[9px] text-nihon-gumi uppercase tracking-[0.2em]">
           <span>{file.size}</span>
           <span className="hanko opacity-0 group-hover:opacity-100 transition-all duration-300">ZEN</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FileCard;
