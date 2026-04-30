import { useState } from 'react';
import { Layout } from './components/Layout';
import { BlogModal } from './components/BlogModal';
import { blogs } from './data/blogs';
import { BlogPost } from './types';
import { AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <header className="pt-[5rem] pb-16 text-center border-b border-outline-variant/30">
          <div className="max-w-[720px] mx-auto">
            <h1 className="font-headline text-[48px] leading-[1.1] font-bold text-on-surface mb-8 tracking-tight">Analyzing Policy and Legal Frameworks</h1>
            <p className="font-sans text-[18px] text-on-surface-variant italic leading-relaxed">
              This research article series is an attempt to analyze ongoing legal developments which require a significant policy rethink.
            </p>
          </div>
        </header>

        {/* About Me Section */}
        <section id="about" className="py-16 border-b border-outline-variant/30">
          <div className="flex flex-col md:flex-row items-start gap-12 p-10 bg-surface-container-low rounded-xl border border-outline-variant/50">
            <div className="flex-1">
              <h3 className="font-headline text-[32px] font-bold text-on-surface mb-4">Mohammed Ibrahim Faisal</h3>
              <p className="font-sans text-[18px] text-on-surface-variant leading-relaxed">
                I am a third-year Law Student at PES University, dedicated to researching and understanding the complexities of modern legal systems and policy implementation.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-w-[200px]">
              <a 
                href="mailto:mifaisal25@gmail.com" 
                className="flex items-center gap-3 px-6 py-3 border border-outline-variant text-on-surface hover:bg-black/5 transition-colors rounded-lg font-medium text-sm font-sans w-full justify-center"
              >
                <Mail className="w-[18px] h-[18px]" /> Email Me
              </a>
              <a 
                href="https://www.linkedin.com/in/mifaisal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-on-surface text-white hover:bg-black/80 transition-colors rounded-lg font-medium text-sm font-sans w-full justify-center"
              >
                <Linkedin className="w-[18px] h-[18px]" /> LinkedIn Profile
              </a>
            </div>
          </div>
        </section>

        {/* Research Gallery Section */}
        <section id="gallery" className="py-[5rem]">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-[32px] font-bold text-on-surface leading-tight">Research Gallery</h2>
              <p className="font-sans text-[16px] text-on-surface-variant mt-2">Latest analysis and critical reviews</p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="group cursor-pointer p-8 rounded-xl bg-surface-container-low border border-outline-variant/40 hover:bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1" onClick={() => setSelectedBlog(blog)}>
                <div>
                  <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.1em] text-primary mb-4 block">{blog.category || 'ANALYSIS'}</span>
                  <h3 className="font-headline text-[22px] font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-[1.3]">{blog.title}</h3>
                  <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant line-clamp-4">{blog.abstract}</p>
                </div>
                <div className="flex justify-between items-center mt-8 pt-5 border-t border-outline-variant/40">
                  <span className="font-sans text-[12px] font-medium text-on-surface-variant">{blog.date}</span>
                  <span className="font-sans text-[13px] font-semibold text-primary group-hover:translate-x-1 transition-transform">Read</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact Section - Professional Form */}
        <section id="contact" className="py-24 border-t border-outline-variant/30 mt-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <span className="font-sans text-[12px] uppercase font-semibold text-secondary tracking-[0.1em] mb-4 block">INQUIRIES & COLLABORATION</span>
            <h2 className="font-headline text-[48px] text-on-surface mb-6 leading-tight font-bold">Get in Touch</h2>
            <p className="font-sans text-[18px] text-on-surface-variant mb-16 leading-relaxed max-w-3xl">
              I look forward to critiques, different perspectives and collaborative inquiries into any of the topics discussed on this platform, in addition to any recent legal developments.
            </p>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Form Side */}
              <div className="flex flex-col gap-6">
                <div>
                  <label className="font-sans text-[12px] uppercase font-semibold text-on-surface tracking-[0.1em] mb-2 block">FULL NAME</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-outline-variant/60 py-3 outline-none focus:border-secondary transition-colors font-sans" />
                </div>
                <div>
                  <label className="font-sans text-[12px] uppercase font-semibold text-on-surface tracking-[0.1em] mb-2 block">EMAIL ADDRESS</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-outline-variant/60 py-3 outline-none focus:border-secondary transition-colors font-sans" />
                </div>
                <div>
                  <label className="font-sans text-[12px] uppercase font-semibold text-on-surface tracking-[0.1em] mb-2 block">MESSAGE</label>
                  <textarea placeholder="Please detail your inquiry here..." rows={4} className="w-full bg-transparent border-b border-outline-variant/60 py-3 outline-none focus:border-secondary transition-colors font-sans resize-none"></textarea>
                </div>
                <div className="mt-4">
                  <button className="bg-primary text-on-primary px-8 py-3 rounded-none font-medium hover:bg-secondary transition-colors duration-300 font-sans text-sm">
                    Send Message
                  </button>
                </div>
              </div>

              {/* Info Side */}
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="font-headline text-[24px] italic text-on-surface mb-6">Direct Channels</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center shrink-0">
                         <Linkedin className="w-4 h-4 text-on-surface-variant" />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] uppercase font-semibold text-on-surface-variant tracking-[0.1em] block mb-1">PROFESSIONAL NETWORK</span>
                        <a href="https://www.linkedin.com/in/mifaisal" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] underline decoration-outline-variant hover:text-secondary hover:decoration-secondary transition-colors">
                          linkedin.com/in/mifaisal
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center shrink-0">
                         <Mail className="w-4 h-4 text-on-surface-variant" />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] uppercase font-semibold text-on-surface-variant tracking-[0.1em] block mb-1">GENERAL CORRESPONDENCE</span>
                        <a href="mailto:mifaisal25@gmail.com" className="font-sans text-[15px] underline decoration-outline-variant hover:text-secondary hover:decoration-secondary transition-colors">
                          mifaisal25@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <BlogModal 
            blog={selectedBlog} 
            onClose={() => setSelectedBlog(null)} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
