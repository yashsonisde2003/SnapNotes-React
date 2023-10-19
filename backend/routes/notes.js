const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:get all the notes of user  "notes/api/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//Route 2:post all the notes of user POST "notes/api/addnotes". login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "title entered must be atleast 4 characters").isLength({
      min: 4,
    }),
    body(
      "description",
      "description entered must be atleast 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there is error return bad request and show all error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
//Route 3:update particular note of user PUT "notes/api/updnote". login required
router.put("/updnote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try{

    const newnote = {};
    if (title) {
    {
      newnote.title = title;
    }
  }
  if (description) {
    {
      newnote.description = description;
    }
  }
  if (tag) {
    {
      newnote.tag = tag;
    }
  }

  //  find the note to be updated and updating it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
  res.json({ note });
}catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
});
//Route 4:deleting an existing note of user DELETE "notes/api/delnote". login required
router.delete("/delnote/:id", fetchuser, async (req, res) => {

  try{

    //  find the note to be updated and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
  }
  // Allow deletion only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({'Success':'Note has been deleted',note:note });
}catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
});
module.exports = router;
