const User = require("../models/user.js");

// Save information of user
module.exports.saveUser = async (req, res, next)=> {
    try {
        let {fullname, username, email, password} = req.body;
    const newUser = new User({
        fullname: fullname,
        username: username,
        email: email
    });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "Embark on Your Tripify Journey");
        let redirecturl = res.locals.redirectUrl || "/";
        res.redirect(redirecturl);
    })
    } catch (err) {
        req.flash("error", "Oops! It seems like the user you're trying to create already exists.");
        res.redirect("/register");
    };
};

// Take data for user Login
module.exports.userLogin = async (req, res)=> {
    req.flash("success", "Welcome back");
    
    let redirecturl = res.locals.redirectUrl || "/";
    
    res.redirect(redirecturl);
};

//  Log out Route
module.exports.userLogout = (req, res, next)=> {
    req.logOut((err)=> {
        if(err) {
            return next(err);
        }
        req.flash("success", "You have successfully logged out");
        res.redirect("/");
    })
}