import "react-toastify/dist/ReactToastify.css";

const SelectedMovie = ({
  movies,
  selectedMovieIndex,
  setSelectedMovieIndex,
  auth,
  isFetchingMoviesDone,
}) => {
  return (
    <div className="mx-4 flex flex-col rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 text-gray-900 drop-shadow-md sm:mx-8 sm:p-6">
      <h2 className="text-3xl font-bold">Selected Movie</h2>
      <button
        className="my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline self-start"
        onClick={() => {
          setSelectedMovieIndex(null);
          sessionStorage.setItem("selectedMovieIndex", null);
        }}
      >
        &larr; Back
      </button>
      {isFetchingMoviesDone ? (
        movies.length ? (
          <div className="mt-1 overflow-x-auto sm:mt-3">
            <div className="mx-2 my-3 flex w-fit gap-4">
              {movies?.map((movie, index) => {
                if (movies[selectedMovieIndex]?._id === movie._id) {
                  return (
                    <div
                      key={index}
                      title={movie.name}
                      className="flex w-[108px] flex-col rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 p-1 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 sm:w-[144px]"
                      onClick={() => {
                        setSelectedMovieIndex(null);
                        sessionStorage.setItem("selectedMovieIndex", null);
                      }}
                    >
                      <img
                        src={movie.img}
                        className="h-36 rounded-md object-cover drop-shadow-md sm:h-48"
                      />
                      <p className="truncate pt-1 text-center text-sm font-semibold leading-4">
                        {movie.name}
                      </p>
                    </div>
                  );
                }
              })}
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-red-200 rounded-md">
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-bold mb-2">
                    {movies[selectedMovieIndex]?.name}
                  </h3>
                  <p className="text-gray-700 my-1"><b>Movie duration:</b> {movies[selectedMovieIndex]?.length} minutes</p>
                  <p className="text-gray-700 my-5"><b>Genre:</b> Action, Thriller</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-center">There are no movies available</p>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default SelectedMovie;
