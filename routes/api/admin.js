// category

//comments

// post

// user
// @route E api/profile
// @desc 删除当前用户的所有信息 相当于用户可以删除自己账号的所有信息
// @access Private
router.delete("/", (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      req.json({ success: true })
    );
  });
});
