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

// Gets user Data
app.post("/getUserData", async (req, res) => {
  //when user connects their wallet.
  const { address } = req.body;
  try {
    //check if the user exists in the db
    const user = await User.findOne({ address });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Gets project details
app.get("/getProjectData/:projectId", async (req, res) => {
  try {
    //gets called in project description page
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId });
    //return the project details
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
});

// creates new user
app.post("/createUser", async (req, res) => {
  //when user connects their wallet.

  const { address } = req.body;
  try {
    //Create user data if they dont exist, once they connect their wallet
    let user = await User.findOne({ address: address });
    if (!user) {
      user = await User.create({ address });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Creates new project
app.post("/createProject", async (req, res) => {
  try {

    console.log(req.body)
    // create project
    let formData = req.body;
    // add project in user db
    const project = await Project.create({ ...formData });

    // create user with all the address present in the creatorAddresses Array
    const users = formData.creators.map(async (creator) => {
      let user = await User.findOne({ address:creator.creatorAddress });
      if (!user) {
        user = await User.create({ address:creator.creatorAddress });
      }
      user.createdProjects.push(formData.projectId);
      await user.save();
      return user;
    });
    await Promise.all(users);

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Updates the projectStatus to false since the token is exhausted
app.post("/updateProjectStatus/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOneAndUpdate(
      { projectId },
      { $set: { projectStatus: false } },
      { new: true }
    );
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

// increment the number of token bought in project and adds project to user
app.post("/projectTokenBought", async (req, res) => {
  //updates info after user buys a token
  try {
    const { projectId, address } = req.body;
    // Update in user db that ticket has been bought
    const user = await User.findOne({ address });
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
    res.status(500).send(err);
  }
});

// Gets all active project
app.get("/listedProjects", async (req, res) => {
  try {
    const projects = await Project.find({ projectStatus: true }); //fetch projects that has true status, - After every mint, call getstatus function, and set status to false once we get it
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

//call getProjectStatus function after a user buys token

app.get("/boughtProjects", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.query.address });
    res.status(200).send(user.boughtProjects);
  } catch (err) {
    console.log(err);
  }
});

app.get("/createdProjects", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.query.address });
    // user.createdProjects is an array that contains the project IDs in the project database
    const projects = await Promise.all(
      user.createdProjects.map(async projectId => {
        const project = await Project.findOne({projectId});
        return project;
      })
    );
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});


app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
