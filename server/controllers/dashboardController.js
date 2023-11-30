const Showtime = require('../models/Showtime'); // Assuming you have defined Mongoose models for each collection

// Example function to get occupancy count, movie name, theater location, and date of the movie
const getMovieDetails = async (req, res) => {
  try {
    const movieDetails = await Showtime.find({})
      .populate({
        path: 'movie',
        select: 'name', // Select the movie name
      })
      .populate({
        path: 'theater',
        select: 'location', // Select the theater location
      })
      .select('occupancy showtime'); // Select occupancy count and showtime

    // Process the fetched data to extract required information
    const formattedData = movieDetails.map((detail) => ({
      occupancy: detail.occupancy,
      movie: detail.movie.name,
      location: detail.theater.location,
      createdAt: detail.showtime, // Assuming showtime field represents the date
    }));

    res.json({ success: true, data: formattedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  getMovieDetails,
  // Other controller functions
};
