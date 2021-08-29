//----------------------------------------- MONGO DB DATABASE---------------------------------------------------
const mongoose = require("mongoose");
const keys = require("./keys");

module.exports = async () => {
  try {
    await mongoose.connect(keys.mongoDB.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>>>>>>>>> MongoDB Connection Succeeded.");
  } catch (e) {
    //console.log(e);
    console.log(">>>>>>>>>> Error in DB connection : " + e);
    throw e;
  }
};
