const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    projectId: {
      type: Number,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectSymbol: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectImageUrl: {
      type: String,
    },
    projectStatus: {
      type: Boolean,
      default: true,
    },
    numberOfCreators: {
      type: Number,
      required: true,
    },
    creators: {
      //[{},{}]
    },
    fileName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    fileCid: {
      type: String,
      required: true,
    },
    tokenContractAddress: {
      type: String,
      required: true,
    },
    totalTokenSupply: {
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
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
