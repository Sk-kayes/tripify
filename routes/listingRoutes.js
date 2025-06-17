const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



const listingController = require("../controllers/listings.js");

// About Route
router.get("/about", (req, res)=> {
    res.render("./listings/about.ejs")
});

// Privacy Page Route
router.get("/privacy", (req, res)=> {
    res.render("./listings/privacy.ejs");
});

// Term Page Route
router.get("/terms", (req, res)=> {
    res.render("./listings/term.ejs");
});

// Company Details Route
router.get("/details", (req, res)=> {
    res.render("./listings/companyDetails.ejs");
});

router.route("/")
    .get(wrapAsync(listingController.index))   // Index Route
    .post(isLoggedIn, upload.single('image'), wrapAsync(listingController.saveNewList)) // Save new List


// New list form route
router.get("/new", isLoggedIn,  (req, res)=> {
    res.render("./listings/new.ejs");
});

router.route("/:id")
    .get(wrapAsync(listingController.show))  // Show route
    .put(isLoggedIn, isOwner,  upload.single('image'), wrapAsync(listingController.editDataSave))  // After edit data save
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))    // Delete Route

// Edit Form Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editForm));

module.exports = router;