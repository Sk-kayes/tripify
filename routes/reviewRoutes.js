const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn, isAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Review Route
router.post("/", isLoggedIn, wrapAsync(reviewController.saveReview));

// Delte Review
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;