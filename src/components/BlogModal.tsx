import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, BookOpen, Quote } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogModalProps {
  blog: BlogPost;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
  // Function to linkify URLs in text
  const renderCitation = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part?.match(urlRegex)) {
        const href = part.startsWith('www.') ? `http://${part}` : part;
        return (
          <a 
            key={i} 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Pre-calculate citation mapping for quick lookup
  const citationMap = new Map<string, number>();
  blog.references.forEach((ref, index) => {
    // Match prefix like "1.", "1", "i", "i.", "iv", etc.
    const match = ref.match(/^([a-zA-Z0-9]+)[\.\s]/);
    if (match) {
      citationMap.set(match[1], index);
    }
  });

  const renderCitationsOnly = (text: string) => {
    const parts = text.split(/(\[[a-zA-Z0-9]+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[([a-zA-Z0-9]+)\]$/);
      if (match) {
        const citationKey = match[1];
        const refIndex = citationMap.get(citationKey);
        if (refIndex !== undefined) {
          return (
            <a
              key={i}
              href={`#ref-${refIndex}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(`ref-${refIndex}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  element.classList.add('bg-black/10');
                  setTimeout(() => {
                    element.classList.remove('bg-black/10');
                  }, 2000);
                }
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-bold"
            >
              {part}
            </a>
          );
        }
      }
      return part;
    });
  };

  // Function to render text and replace citations like [1] or [i] with clickable links
  const renderTextWithCitations = (text: string) => {
    const boldParts = text.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((boldPart, bIndex) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        const innerText = boldPart.slice(2, -2);
        return <strong key={bIndex} className="font-bold">{renderCitationsOnly(innerText)}</strong>;
      }
      return <React.Fragment key={bIndex}>{renderCitationsOnly(boldPart)}</React.Fragment>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-white/90 backdrop-blur-md"
      />
      <motion.div
        layoutId={`card-${blog.id}`}
        className="relative w-full h-full bg-[#FDFBF7] border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden rounded-none"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto custom-scrollbar h-full">
          <div className="p-8 sm:p-16 max-w-5xl mx-auto">
            <div className="mb-12 border-b-2 border-black pb-12">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black/40 mb-6">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-black leading-[0.95] mb-8">
                {blog.title}
              </h2>
            </div>

            <div className="space-y-16">
              <section>
                <h3 className="text-xl font-black uppercase tracking-widest text-black mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Abstract
                </h3>
                <p className="text-xl font-medium text-black/70 leading-relaxed italic pl-6 border-l-4 border-black text-justify">
                  {blog.abstract}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-black text-black mb-6">Introduction</h3>
                <p className="text-lg text-black/80 leading-relaxed font-medium text-justify">
                  {renderTextWithCitations(blog.introduction)}
                </p>
              </section>

              {blog.sections.map((section, index) => (
                <section key={index}>
                  <h3 className="text-2xl font-black text-black mb-6">{section.title}</h3>
                  <div className="space-y-6">
                    {section.content.map((paragraph, pIndex) => {
                      // Check if the paragraph is a subheading (e.g., "I. ...", "1. ...", "(i) ...")
                      const isHeading = /^(?:\*\*)?([IVX]+\.|[0-9]+\.|\([ivx]+\))\s/.test(paragraph);
                      return (
                        <p 
                          key={pIndex} 
                          className={`text-lg text-black/80 leading-relaxed text-justify ${isHeading ? 'font-black text-black mt-8 mb-4' : 'font-medium'}`}
                        >
                          {isHeading ? <strong>{renderTextWithCitations(paragraph)}</strong> : renderTextWithCitations(paragraph)}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}

              <section>
                <h3 className="text-2xl font-black text-black mb-6">Conclusion</h3>
                <p className="text-lg text-black/80 leading-relaxed font-medium text-justify">
                  {renderTextWithCitations(blog.conclusion)}
                </p>
              </section>

              <section className="bg-black/5 p-8 sm:p-12 mt-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black uppercase tracking-widest text-black mb-8 flex items-center gap-2">
                  <Quote className="w-5 h-5" /> References
                </h3>
                <ul className="list-none space-y-4">
                  {blog.references.map((reference, index) => (
                    <li 
                      key={index} 
                      id={`ref-${index}`}
                      className="text-sm font-medium text-black/70 text-justify p-2 -mx-2 rounded transition-colors duration-500"
                    >
                      {renderCitation(reference)}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
