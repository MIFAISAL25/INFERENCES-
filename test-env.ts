import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function run() {
  console.log("GEMINI_API_KEY available:", !!process.env.GEMINI_API_KEY);
}
run();
