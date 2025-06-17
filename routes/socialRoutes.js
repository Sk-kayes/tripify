const express = require("express");
const router = express.Router();

router.get("/:platform", (req, res) => {
    const platform = req.params.platform;
    const name = platform.charAt(0).toUpperCase() + platform.slice(1);
    req.flash("notFound", `${name} is currently under construction. We'll be back soon!`);
    res.redirect(req.get("Referer"));
});

module.exports = router;