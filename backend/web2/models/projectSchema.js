const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
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
  creatorAddresses: {
    type: [String],
    required: true, 
  },
  cid: {
    type: String,
    required: true,
  },
  projectStatus: {
    type: Boolean,
    default: true,
  },
  fileSize: {
    type: Number,
  },
  fileName: {
    type: String,
  },
  totalTokens: {
    type: Number,
    required: true,
  },
  tokensBought: {
    type: Number,
    default: 0,
  },
  tokenPrice: {
    type: Number,
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
