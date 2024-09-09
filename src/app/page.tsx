import Link from "next/link"

export default function Home() {
  const emotions = ["Happy", "Sad", "Excited", "Relaxed", "Anxious"]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Mood Matcher</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your feeling..."
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Or choose an emotion:</h2>
        <div className="flex flex-wrap gap-2">
          {emotions.map((emotion) => (
            <Link
              key={emotion}
              href={`/movies/${emotion}`}
              className="bg-gray-600 p-2 rounded hover:bg-gray-500"
            >
              {emotion}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
