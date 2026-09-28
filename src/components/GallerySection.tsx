import React, { useState } from 'react';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  X,
  Maximize2,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Campus',
    'Academic',
    'Sports',
    'Cultural',
    'Students',
    'Events',
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActivePhoto(filteredItems[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActivePhoto(filteredItems[nextIndex]);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Campus Chronicles & Visual Memory
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Institutional Photo Gallery
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            Capturing the lively academic vibrancy, sporting triumphs, laboratory breakthroughs, and festive traditions of our students.
          </p>
        </div>

        {/* Category Filters (Zero-pill compliant tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center border-b border-slate-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'All' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all cursor-pointer h-64"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Dark subtle overlay with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  {item.category} · {item.date}
                </span>
                <h4 className="text-xs sm:text-sm font-bold leading-tight font-academic">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-1 font-sans">
                  {item.description}
                </p>
                <div className="absolute top-3 right-3 p-1.5 bg-black/40 rounded-lg text-white/80">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Top Bar */}
            <div className="p-4 bg-slate-950/80 flex items-center justify-between text-white border-b border-white/10">
              <div>
                <span className="text-xs uppercase text-amber-400 font-semibold">
                  {activePhoto.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white font-crest">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[70vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />

              {/* Prev / Next Controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors border border-white/20"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors border border-white/20"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption / Description Bar */}
            <div className="p-4 bg-slate-950 text-slate-300 text-xs sm:text-sm font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p>{activePhoto.description}</p>
              <span className="text-slate-500 text-xs shrink-0 font-mono">
                Laxmipur SC Archives · {activePhoto.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
