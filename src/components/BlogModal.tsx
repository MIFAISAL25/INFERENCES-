import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
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
            className="text-secondary underline hover:text-primary break-all transition-colors"
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
                  element.classList.add('bg-outline-variant/30');
                  setTimeout(() => {
                    element.classList.remove('bg-outline-variant/30');
                  }, 2000);
                }
              }}
              className="text-[11px] font-sans font-bold text-primary hover:text-white hover:bg-primary bg-primary/10 px-1 py-[2px] rounded align-super ml-0.5 cursor-pointer transition-colors leading-none"
            >
              [{citationKey}]
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
        return <strong key={bIndex} className="font-semibold text-on-surface">{renderCitationsOnly(innerText)}</strong>;
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
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`card-${blog.id}`}
        className="relative w-full h-full bg-background flex flex-col overflow-hidden"
      >
        <div className="sticky top-0 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/30 z-10 flex justify-end px-8 py-4">
            <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors flex items-center gap-2 font-sans text-sm"
            >
            Close <X className="w-5 h-5" />
            </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar h-full flex-1">
          <article className="py-[5rem] px-8 max-w-[720px] mx-auto">
            <header className="mb-12 border-b border-outline-variant/30 pb-8">
              <span className="font-sans text-[12px] uppercase font-bold text-primary tracking-[0.1em] block mb-6">
                {blog.date}
              </span>
              <h1 className="font-headline text-[48px] leading-[1.1] font-bold text-on-surface tracking-tight">
                {blog.title}
              </h1>
            </header>

            <div className="space-y-14">
              <section className="my-10 pl-6 border-l-4 border-primary bg-surface-container-low py-8 px-8 rounded-r-2xl shadow-sm">
                <h3 className="font-sans text-[12px] uppercase font-bold text-primary tracking-[0.1em] mb-4">
                  Abstract
                </h3>
                <blockquote className="font-headline text-[24px] leading-relaxed italic text-on-surface text-justify">
                  "{blog.abstract}"
                </blockquote>
              </section>

              <section>
                <h3 className="font-headline text-[32px] text-on-surface mb-6 font-bold tracking-tight">Introduction</h3>
                <p className="font-sans text-[18px] leading-[1.8] text-on-surface-variant text-justify">
                  {renderTextWithCitations(blog.introduction)}
                </p>
              </section>

              {blog.sections.map((section, index) => (
                <section key={index}>
                  <h3 className="font-headline text-[32px] text-on-surface mb-6 font-bold tracking-tight">{section.title}</h3>
                  <div className="space-y-6">
                    {section.content.map((paragraph, pIndex) => {
                      const isHeading = /^(?:\*\*)?([IVX]+\.|[0-9]+\.|\([ivx]+\))\s/.test(paragraph);
                      return (
                        <p 
                          key={pIndex} 
                          className={`font-sans text-[18px] leading-[1.8] text-justify ${isHeading ? 'text-on-surface font-semibold mt-10 mb-4 text-[22px]' : 'text-on-surface-variant'}`}
                        >
                          {isHeading ? <strong>{renderTextWithCitations(paragraph)}</strong> : renderTextWithCitations(paragraph)}
                        </p>
                      );
                    })}
                  </div>
                </section>
              ))}

              <section>
                <h3 className="font-headline text-[32px] text-on-surface mb-6 font-bold tracking-tight">Conclusion</h3>
                <p className="font-sans text-[18px] leading-[1.8] text-on-surface-variant text-justify">
                  {renderTextWithCitations(blog.conclusion)}
                </p>
              </section>

              <section className="pt-12 mt-16 border-t border-outline-variant/30">
                <h3 className="font-sans text-[12px] uppercase font-bold text-primary tracking-[0.1em] mb-8">
                  References & Citations
                </h3>
                <ul className="list-none space-y-3">
                  {blog.references.map((reference, index) => (
                    <li 
                      key={index} 
                      id={`ref-${index}`}
                      className="font-sans text-[14px] leading-relaxed text-on-surface-variant p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors duration-500 shadow-sm"
                    >
                      {renderCitation(reference)}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        </div>
      </motion.div>
    </div>
  );
};
