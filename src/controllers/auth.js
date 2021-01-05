const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//***********************create controller * **/
exports.createAuth = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const auth = new Auth({
      email: req.body.email,
      password: hash,
    });
    auth
      .save()
      .then((result) => {
        const token = jwt.sign(
          { email: result.email },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );

        res.status(200).json({
          token: token,
          expiresIn: 3600,
          email: result.email,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });
};

//*********************check signIn */
exports.signAuth = (req, res) => {
  let fetchedAuth;
  Auth.findOne({ email: req.body.email })
    .then((auth) => {
      if (!auth) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      fetchedAuth = auth;
      return bcrypt.compare(req.body.password, auth.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      const token = jwt.sign(
        { email: fetchedAuth.email, userId: fetchedAuth._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        email: fetchedAuth.email,
        userId: fetchedAuth._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth Failed!",
        erorr: err,
      });
    });
};
