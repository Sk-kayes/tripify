const Listing = require("../models/listing.js");
const Review = require("../models/review.js")


// Review save
module.exports.saveReview = async (req, res)=> {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let {rating, comment} = req.body;
    let newReview = new Review({
        comment: comment,
        rating: rating
    });
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Your review has been successfully shared!");
    res.redirect(`/listings/${id}`);
}

// Delete Review
module.exports.deleteReview = async (req, res)=> {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Your review has been successfully removed.");
    res.redirect(`/listings/${id}`);
};