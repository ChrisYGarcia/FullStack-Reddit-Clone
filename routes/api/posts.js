const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
// Profile model
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/Comment");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts/
// @desc    get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "no posts found" }));
});

// @route   Post api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      username: req.body.username,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    comment = new _Comment({
      user: req.user.id,
      text: req.body.text
    });
    Post.findById(req.params.id)
      .populate("comments", ["user", "text"])
      .then(post => {
        post.comments.unshift(comment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

router.post(
  "/comment/reply/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Comment.findById(req.params.id)
      .then(comment => {
        new Comment({
          user: req.user.id,
          text: req.body.text
        })
          .save()
          .then(comment => res.json(comment));
      })
      .catch(err =>
        res.status(404).json({ Commentnotfound: "No comment found" })
      );
  }
);

module.exports = router;
