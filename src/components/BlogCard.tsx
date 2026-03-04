import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
  onClick: (blog: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${blog.id}`}
      whileHover={{ y: -8 }}
      className="group relative bg-white border-2 border-black p-8 cursor-pointer flex flex-col h-full hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
      onClick={() => onClick(blog)}
    >
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/40 mb-6">
        <Calendar className="w-3 h-3" />
        {blog.date}
      </div>
      
      <h3 className="text-3xl font-black text-black mb-4 leading-tight group-hover:underline decoration-4 underline-offset-4">
        {blog.title}
      </h3>
      
      <p className="text-black/70 text-base font-medium leading-relaxed line-clamp-4 mb-8 flex-grow">
        {blog.abstract}
      </p>
      
      <div className="flex items-center text-sm font-black text-black uppercase tracking-wider mt-auto">
        Read Analysis <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );
};
