const express = require("express");
const fs = require("fs-extra");
const shortid = require("shortid");
const { MongoClient, ObjectID } = require("mongodb");
const studentSchema = require("./schema");

const mongoServerURL = "mongodb://localhost:27017";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await studentSchema.find({}, { projects: 0 });
    res.send(students);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await studentSchema.findById(req.params.id, {
      projects: 0
    });
    res.send(student);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newstudent = new studentSchema(req.body);
    const { _id } = await newstudent.save();
    res.send(_id);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await studentSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { useFindAndModify: false }
    );
    res.send(student);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await studentSchema.findByIdAndDelete(req.params.id);
    res.send(student);
  } catch (error) {}
});

router.get("/:id/projects", async (req, res) => {
  try {
    const project = await studentSchema.findById(req.params.id, {
      projects: 1
    });
    res.send(project);
  } catch (error) {}
});

router.post("/:id/projects", async (req, res) => {
  try {
    const project = await studentSchema.findByIdAndUpdate(
      req.params.id,
      { $push: { projects: req.body } } //
    );
    res.send(project);
  } catch (error) {}
});

router.delete("/:id/projects/:projid", async (req, res) => {
  try {
    const project = await studentSchema.findByIdAndUpdate(req.params.id, {
      $pull: { projects: { _id: req.params.projid } }
    });
    res.send(project);
  } catch (error) {}
});
module.exports = router;
