import { useState } from 'react';
import { Layout } from './components/Layout';
import { BlogCard } from './components/BlogCard';
import { BlogModal } from './components/BlogModal';
import { blogs } from './data/blogs';
import { BlogPost } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Linkedin, GraduationCap, ScrollText, ArrowDown } from 'lucide-react';

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter text-black leading-[0.9] drop-shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
              ANALYZING<br />
              POLICY AND LEGAL<br />
              FRAMEWORKS.
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t-4 border-black pt-8">
              <p className="text-xl md:text-2xl font-bold text-black max-w-xl leading-tight">
                This research article series is an endeavour towards exploring areas of law and policy that are riddled with complexities, requiring analysis of existing legal frameworks and plausible solutions to problems that plague the process
              </p>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="hidden md:block p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white"
              >
                <ArrowDown className="w-8 h-8 text-black" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-32 bg-white border-y-2 border-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto border-2 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-[#FDFBF7]"
          >
            <div className="flex flex-col md:flex-row items-start gap-16">
              <div className="flex-1">
                <h3 className="text-5xl font-black text-black mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">Mohammed Ibrahim Faisal</h3>
                <div className="space-y-6 text-lg font-medium text-black">
                  <p>
                    I am a third-year Law Student at PES University, dedicated to researching and understanding the complexities of modern legal systems and policy implementation.
                  </p>
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-black" />
                      <span>3rd Year Law Student, PES University</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-6 mt-12">
                  <a 
                    href="mailto:mifaisal25@gmail.com"
                    className="flex items-center gap-2 text-black font-bold hover:bg-black hover:text-white px-4 py-2 border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <Mail className="w-5 h-5" /> mifaisal25@gmail.com
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mifaisal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black font-bold hover:bg-black hover:text-white px-4 py-2 border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <Linkedin className="w-5 h-5" /> LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-[#FDFBF7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-8xl font-black text-black/5 mb-4 absolute -mt-12 -ml-4 select-none pointer-events-none">WORK</h2>
            <h2 className="text-4xl font-black text-black relative z-10 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">Research Gallery</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {blogs.map((blog) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                onClick={setSelectedBlog} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black text-[#FDFBF7] border-t-2 border-black">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tight drop-shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">Let's Discuss.</h2>
            <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">
              Feel free to offer any critique and different perspectives.
            </p>
            <a 
              href="mailto:mifaisal25@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#FDFBF7] text-black border-2 border-white font-bold text-lg hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

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
