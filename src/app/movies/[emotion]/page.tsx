import { getMoviesByEmotion } from "../../../../lib/movieService"
import { Movie } from "../../../../types"
export default async function MovieResults({
  params,
}: {
  params: { emotion: string }
}) {
  const movies: Movie[] | undefined = await getMoviesByEmotion(params.emotion)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movies for {params.emotion}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies ? (
          movies.map((movie) => (
            <div key={movie.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>An error occured fetching the movie</p>
        )}
      </div>
    </div>
  )
}
