const express = require("express");
const cors = require("cors");
const connecDB = require("./database/connection");
const Project = require("./models/projectSchema");
const User = require("./models/UserSchema");
const app = express();

const PORT = process.env.PORT || 3001;
require("dotenv").config({ path: "../config.env" });
connecDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/getUserData", async (req, res) => {
  //when user connects their wallet.
  //check if the user exists in the db
  //if not add him
  //if yes, return their data to the frontend
});

app.get("/getProjectData/:projectId", async (req, res) => {
  //gets called in project description page
 try {
  const { projectId: id } = req.params;
  const project = await Project.findById(id)
  res.status(200).json(project);
 } catch (err) {
  
 }


  //return all the project details
});

app.post("/createProject", async (req, res) => {
  try {
    // const {
    //   projectTitle,
    //   projectDescription,
    //   creators,
    //   tokenPrice,
    //   tokenSupply,
    //   shares,
    // } = req.body;

    // create project
    const project = await Project.create({ ...req.body });

    //check conditions, no two projects must have same title, creator and share array, etc in frontend

    //lighthouse uploading logic

    // add project in user db
    const user = await User.findOne({ address: req.body.creators[0] });
    user.projectsCreated.push(projectId);
    await user.save();

    //create project in marketplace contract

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateProjectStatus", async (req, res) => {
  try {
    //update status logic
    //status = req.body.status
  } catch (error) {}
});

app.post("/projectTokenBought", async (req, res) => {
  //updates info after user buys a token
  try {
    const projectId = req.body.projectId;

    // Update in user db that ticket has been bought
    const user = await User.findOne({ address: req.body.address });
    user.boughtProjects.push(projectId);
    await user.save();

    // Update in project db that ticket has been bought
    const project = await Project.updateOne(
      { projectId },
      { $inc: { tokensBought: 1 } }
    );
    await project.save();
    res.status(200).json(user);
    //store data in database
  } catch (err) {
    console.log(err);
  }
});

app.get("/listedProjects", async (req, res) => {
  try {
    const projects = await Project.find({ projectStatus: true }); //fetch projects that has true status, - After every mint, call getstatus function, and set status to false once we get it
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
  }
});

//call getProjectStatus function after a user buys token

app.get("/boughtProjects", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address });
    res.status(200).send(user.projects);
  } catch (err) {
    console.log(err);
  }
});

app.get("/createdProjects", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address });
    res.status(200).send(user.boughtProjects);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
