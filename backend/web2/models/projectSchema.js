const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tokenContractAddress: {
    type: String,
    required: true,
  },
  creatorIds: {
    type: [String], //[1,2,3]
  },
  cid: {
    type: String,
  },
  projectStatus: {
    type: Boolean,
    default: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
