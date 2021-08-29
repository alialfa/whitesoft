/**
 * WHITESOFT - User Data Controller
 */
const UserProfile = require("../models/whitesoft.model");

// add new user form data
exports.create = function (req, res) {
  let userModel = new UserProfile({
    fullname: req.body.fullname,
    country: req.body.country,
  });

  userModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "ERROR - form data submission failed!" });
    } else {
      console.log(data);
      res.status(200).json({
        message: "SUCCESS - details submitted successfully!",
      });
    }
  });
};

// get all users data
exports.findAll = function (req, res) {
  UserProfile.find(function (err, users) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "ERROR - data retrieval failed!",
      });
    } else {
      res.json(users);
    }
  });
};
