// import 'react-toastify/dist/ReactToastify.css'
// import Loading from './Loading'

// const NowShowing = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth, isFetchingMoviesDone }) => {
// 	return (
// 		<div className="p-6 bg-gray-100 rounded-md shadow-md">
// 			<h2 className="text-3xl font-bold">Now Showing</h2>
// 			<p className="text-sm text-gray-600 mb-2xl">Recommended movies</p>
// 			{isFetchingMoviesDone ? (
// 				movies.length ? (
// 					<div className="mt-1 overflow-x-auto sm:mt-3">
// 						<div className="mx-auto flex w-fit gap-4">
// 							{movies?.map((movie, index) => {
// 								return movies[selectedMovieIndex]?._id === movie._id ? (
// 									<div
// 										key={index}
// 										title={movie.name}
// 										className="flex w-[108px] flex-col rounded-md bg-gradient-to-br from-slate-600 to-blue-500 p-1 text-white drop-shadow-md hover:from-slate-500 hover:to-blue-400 sm:w-[144px]"
// 										onClick={() => {
// 											setSelectedMovieIndex(null)
// 											sessionStorage.setItem('selectedMovieIndex', null)
// 										}}
// 									>
// 										<img
// 											src={movie.img}
// 											className="h-36 rounded-md object-cover drop-shadow-md sm:h-48 "
// 										/>
// 										<p className="truncate pt-1 text-center text-sm font-semibold leading-4">
// 											{movie.name}
// 										</p>
// 									</div>
// 								) : (
// 									<div
// 										key={index}
// 										className="flex w-[108px] flex-col rounded-md bg-white p-1 drop-shadow-md hover:bg-gradient-to-br hover:from-slate-500 hover:to-blue-400 hover:text-white sm:w-[144px]"
// 										onClick={() => {
// 											setSelectedMovieIndex(index)
// 											sessionStorage.setItem('selectedMovieIndex', index)
// 										}}
// 									>
// 										<img
// 											src={movie.img}
// 											className="h-64 rounded-md object-cover drop-shadow-md sm:h-64"
// 										/>
// 										<p className="truncate pt-1 text-center text-sm font-semibold leading-4">
// 											{movie.name}
// 										</p>
// 									</div>
// 								)
// 							})}
// 						</div>
// 					</div>
// 				) : (
// 					<p className="mt-4 text-center">There are no movies available</p>
// 				)
// 			) : (
// 				<Loading />
// 			)}
// 		</div>
// 	)
// }

// export default NowShowing


import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const NowShowing = ({ movies, selectedMovieIndex, setSelectedMovieIndex, isFetchingMoviesDone }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Now Showing</h2>
      <p className="text-sm text-gray-600 mb-2">Recommended movies</p>
      {isFetchingMoviesDone ? (
        movies.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies?.map((movie, index) => (
              <div
                key={index}
                //className="bg-white rounded-md object-cover shadow-md relative group"
                onClick={() => {
                  setSelectedMovieIndex(index);
                  sessionStorage.setItem('selectedMovieIndex', index);
                }}
              >
                <img
                  src={movie.img}
                  alt={movie.name}
                  className="image-container h-48 rounded-md object-cover drop-shadow-md transition duration-300 ease-in-out transform hover:scale-105 sm:h-48"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold leading-6 text-gray-800">{movie.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-800">There are no movies available</p>
        )
      ) : (
        <Loading />
      )}
      {/* {movies.length > 4 && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 absolute top-8 right-4">
          See All
        </button>
      )} */}
    </div>
  );
};

export default NowShowing;
