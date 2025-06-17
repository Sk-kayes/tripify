const Listing = require("../models/listing.js");

// Index Route
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

//Show Route
module.exports.show = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!list) {
        req.flash(
            "error",
            "Oops! It seems like the listing you're looking for doesn't exist."
        );
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { list });
};

// Save New List
module.exports.saveNewList = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let { title, description, image, price, location, country } = req.body;
    let newPost = new Listing({
        title: title,
        description: description,
        image: image,
        price: price,
        location: location,
        country: country,
    });
    newPost.owner = req.user._id;
    newPost.image = { url, filename };
    await newPost.save();
    req.flash("success", "Your new listing is now live!");
    res.redirect("/listings");
};

// Edit Form Route
module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    let post = await Listing.findById(id);
    if (!post) {
        req.flash(
            "error",
            "We're sorry, but the listing you're searching for is not available."
        );
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { post });
};

// Edit Data Save
module.exports.editDataSave = async (req, res) => {
    let { id } = req.params;
    let updatedPost = await Listing.findByIdAndUpdate(id, req.body);
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedPost.image = { url, filename };
        await updatedPost.save();
    }
    req.flash("success", "Your listing has been successfully updated.");
    res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Your listing has been successfully removed.");
    res.redirect("/listings");
};
