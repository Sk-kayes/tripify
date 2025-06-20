if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}




const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require("path");
const ejsMate = require('ejs-mate');
const expressSession = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listingRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const socialRouter = require("./routes/socialRoutes.js");
const userRouter = require("./routes/user.js");

const port = 8000;
const atlasUrl = process.env.ATLASDB_URL;

main()
    .then(()=> {
        console.log("DataBase Connected Successfully")
    })
    .catch((err)=>{
        console.log(`There is some Error: ${err}`)
    });

async function main() {
    await mongoose.connect(atlasUrl);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.engine('ejs', ejsMate);

const store = MongoStore.create({
    mongoUrl: atlasUrl,
    crypto: {
        secret: process.env.SECRET, 
    },
    touchAfter: 24 * 3600
});

store.on("error", ()=> {
    console.log("Error in MONGO SESSION STORE", err)
})

const sessionOptions = {
    store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET, 
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(expressSession(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=> {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.notFound = req.flash("notFound");
    res.locals.currUser = req.user;
    next();
});


// Home Route
app.get("/", (req, res)=> {
    res.render("./listings/home.ejs");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings/social", socialRouter);
app.use("/", userRouter);



// Server Running
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});