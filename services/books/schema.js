const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const StudentSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  dateOfBirth: Number,
  projects: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      name: String,
      description: String,
      creationDate: Number,
      repoURL: String,
      gitubURL: String
    }
  ]
});

module.exports = mongoose.model("student", StudentSchema);
