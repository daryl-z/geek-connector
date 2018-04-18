const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Profile = require("../../models/Profile");
// user model
const User = require("../../models/User");
// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profiles Works" }));

// @route GET api/profile
// @desc get current users profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "这个用户没有简介";
          return res.status(404).json(errors);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
