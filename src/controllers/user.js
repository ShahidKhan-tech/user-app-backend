const User = require("../models/user");

exports.createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    city: req.body.city,
    description: req.body.description,
    creator: req.userData.userId,
  });

  user
    .save()
    .then((user) => {
      return res.status(200).json({
        message: "user added successfully",
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "something went wrong" });
    });
};

//***********get all the users */
exports.getUsers = (req, res) => {
  User.find().then((users) => {
    if (!users) {
      return res.status(404).json("no user found!");
    }
    return res.status(200).json({
      users: users,
    });
  });
};

//*********get a user by id */
exports.getUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found!" });
    }
  });
};

//************updating user */
exports.updateUser = (req, res) => {
  let { id } = req.params;
  const { name, city, description } = req.body;
  User.findOneAndUpdate(
    { _id: id, creator: req.userData.userId },
    { name, city, description },
    { new: true }
  )
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//*****************deleitng user */
exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((user) => {
      return res.status(200).json({
        message: "deleted successfully!",
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
