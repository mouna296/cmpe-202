const express = require('express')
const {
	getMovies,
	getMovie,
	createMovie,
	updateMovie,
	deleteMovie,
	getShowingMovies,
	getUnreleasedShowingMovies,
	getUnreleasedShowingMoviesForUser,
	fetchMoviesWatched
} = require('../controllers/movieController')
const router = express.Router()
const movieController = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth')

router.route('/').get(getMovies).post(protect, authorize('admin'), createMovie)
router.route('/showing').get(getShowingMovies)
router.route('/fetchMoviesWatched').post(fetchMoviesWatched)
router.route('/unreleased/showingForUser').get(getUnreleasedShowingMoviesForUser)
router.route('/unreleased/showing').get(protect, authorize('admin'), getUnreleasedShowingMovies)
router
	.route('/:id')
	.get(getMovie)
	.put(protect, authorize('admin'), updateMovie)
	.delete(protect, authorize('admin'), deleteMovie)

module.exports = router
