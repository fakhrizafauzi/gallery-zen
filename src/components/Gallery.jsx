import React from 'react';
import { motion } from 'framer-motion';
import FileCard from './FileCard';

const Gallery = ({ activeTab, images, documents, onSelectFile }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const showImages = activeTab === 'all' || activeTab === 'images';
  const showDocs = activeTab === 'all' || activeTab === 'documents';

  return (
    <div className="space-y-16">
      {/* Images Section */}
      {showImages && images.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-sans-jp font-bold tracking-[0.3em] uppercase text-nihon-ink">VISUAL ARTIFACTS</h2>
            <div className="flex-1 h-[1px] bg-nihon-ink/10" />
            <span className="text-[10px] text-nihon-gumi font-serif-jp">画像アーカイブ</span>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {images.map((img, idx) => (
              <FileCard 
                key={`${img.name}-${idx}`} 
                file={img} 
                onClick={() => onSelectFile(img)} 
              />
            ))}
          </motion.div>
        </section>
      )}

      {/* Documents Section */}
      {showDocs && documents.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-sm font-sans-jp font-bold tracking-[0.3em] uppercase text-nihon-ink">DOCUMENTED SCROLLS</h2>
             <div className="flex-1 h-[1px] bg-nihon-ink/10" />
             <span className="text-[10px] text-nihon-gumi font-serif-jp">文書コレクション</span>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3"
          >
            {documents.map((doc, idx) => (
              <FileCard 
                key={`${doc.name}-${idx}`} 
                file={doc} 
                onClick={() => onSelectFile(doc)} 
                variant="list"
              />
            ))}
          </motion.div>
        </section>
      )}

      {/* Empty State */}
      {((showImages && images.length === 0) && (showDocs && documents.length === 0)) && (
        <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-nihon-ink/5 rounded-sm">
           <div className="text-4xl mb-4 opacity-20">🈳</div>
           <p className="font-serif-jp text-nihon-gumi tracking-widest italic">The archive is empty. Nothing exists.</p>
           <p className="text-[10px] mt-2 opacity-30 uppercase tracking-widest">禅 • 静寂</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
