import { GoogleGenerativeAI } from "@google/generative-ai"

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const res = await genAI.listModels()
  console.log(res)
}

listModels()
