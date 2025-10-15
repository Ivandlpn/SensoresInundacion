import { GoogleGenAI } from "@google/genai";

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// NOTE: The functionality related to generating AI action plans has been removed
// as the application's purpose has shifted to a pure location viewer, which does not
// involve sensor status or readings. This file is preserved for potential future use.
