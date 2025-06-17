const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js")


router.route("/register")
    .get((req, res)=> {
        res.render("./listings/signUpForm.ejs");    //Show Register form
    })
    .post(saveRedirectUrl, wrapAsync(userController.saveUser));    // Save information of user


router.route("/login")
    .get(saveRedirectUrl, (req, res)=> {
        res.render("./listings/login.ejs"); // Show Log In form
    })
    .post(passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), wrapAsync(userController.userLogin));   // Take data for user Login


//  Log out Route
router.get("/logout", userController.userLogout);

module.exports = router;