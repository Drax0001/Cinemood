import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"

const TMDB_API_KEY = process.env.TMDB_API_KEY

export async function getMoviesByEmotion(emotion: string) {
  // Generate keywords using GEMINI

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = `Generate 5 keywords related to the emotion: ${emotion}. Your answer should be of the form: [keyword, keyword, ...]`

  try {
    const result = await model.generateContent(prompt)
    const keyWordsArray = result.response.text().split(", ")

    // Search TMDB with the generated keywords
    const movies = await Promise.all(
      keyWordsArray.map(async (keyword) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            keyword
          )}`
        )

        return response.data.results[0] // Return the first movie for each keyword
      })
    )

    return movies.filter(Boolean) // Remove any null results
  } catch (err) {
    console.log(err)
  }
}
