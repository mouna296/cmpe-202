const express = require('express')
const router = express.Router()
const Showtime = require('../models/Showtime')

const { protect, authorize } = require('../middleware/auth')
const {
	addShowtime,
	getShowtime,
	deleteShowtime,
	purchase,
	deletePreviousShowtime,
	getShowtimes,
	deleteShowtimes,
	getShowtimeWithUser,
	getUnreleasedShowtimes,
	updateShowtime,
	cancelTicket
} = require('../controllers/showtimeController')

router.get('/occupancy', protect, authorize('admin'), async (req, res) => {
    const { period } = req.query; // period can be 30, 60, or 90 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - parseInt(period));

    try {
        const occupancyData = await Showtime.aggregate([
            { $match: { showtime: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: { movie: "$movie", theater: "$theater" }, totalSeatsSold: { $sum: { $size: "$seats" } } } },
            { $lookup: { from: "theaters", localField: "_id.theater", foreignField: "_id", as: "theaterData" } },
            { $unwind: "$theaterData" },
            { $lookup: { from: "cinemas", localField: "theaterData.cinema", foreignField: "_id", as: "cinemaData" } },
            { $unwind: "$cinemaData" },
            { $lookup: { from: "movies", localField: "_id.movie", foreignField: "_id", as: "movieData" } },
            { $unwind: "$movieData" },
            { 
                $project: { 
                    _id: 0, 
                    movie: "$movieData.name", 
                    theater: "$theaterData.name", 
                    location: "$cinemaData.location", 
                    totalSeatsSold: 1 
                } 
            }
        ]);

        res.json({ success: true, data: occupancyData });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router
	.route('/')
	.get(getShowtimes)
	.post(protect, authorize('admin'), addShowtime)
	.delete(protect, authorize('admin'), deleteShowtimes)
router.route('/unreleased').get(protect, authorize('admin'), getUnreleasedShowtimes)
router.route('/previous').delete(protect, authorize('admin'), deletePreviousShowtime)
router.route('/user/:id').get(protect, authorize('admin'), getShowtimeWithUser)
router.route('/cancel/:id').delete( cancelTicket)
router
	.route('/:id')
	.get(getShowtime)
	.post(protect, purchase)
	.put(protect, authorize('admin'), updateShowtime)
	.delete(protect, authorize('admin'), deleteShowtime)

module.exports = router
