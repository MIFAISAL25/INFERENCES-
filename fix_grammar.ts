import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { blogs } from './src/data/blogs';

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
    console.error('No API key found in environment variables.');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function fixGrammar(text: string): Promise<string> {
    if (!text || text.trim() === '' || text.length < 50) return text;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-preview',
            contents: `Fix all grammatical errors, run-on sentences, and comma splices in the following text. Improve readability by breaking up overly long sentences. Keep the original meaning, tone, and citations (like [1], [i], etc.) exactly intact. Do not alter titles of papers or citation formats. Only return the corrected text, nothing else, no markdown formatting.\n\nText:\n${text}`,
        });
        let result = response.text?.trim() || text;
        if (result.startsWith('```')) {
            result = result.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
        }
        return result;
    } catch (e) {
        console.error('Error fixing text:', e);
        return text;
    }
}

async function processBlogs() {
    console.log('Starting grammar fix...');
    const newBlogs = [];
    for (const blog of blogs) {
        console.log(`Processing blog: ${blog.title}`);
        const newBlog = { ...blog };
        
        newBlog.abstract = await fixGrammar(blog.abstract);
        newBlog.introduction = await fixGrammar(blog.introduction);
        newBlog.conclusion = await fixGrammar(blog.conclusion);

        const newSections = [];
        for (const section of blog.sections) {
            const newContent = [];
            for (const paragraph of section.content) {
                if (paragraph.length > 50 && !paragraph.match(/^([IVX]+\.|[0-9]+\.|\([ivx]+\))\s/)) {
                    newContent.push(await fixGrammar(paragraph));
                } else {
                    newContent.push(paragraph);
                }
            }
            newSections.push({ ...section, content: newContent });
        }
        newBlog.sections = newSections;
        newBlogs.push(newBlog);
    }

    const output = `import { BlogPost } from "../types";\n\nexport const blogs: BlogPost[] = ${JSON.stringify(newBlogs, null, 2)};\n`;
    fs.writeFileSync('./src/data/blogs.ts', output);
    console.log('Done!');
}

processBlogs();
