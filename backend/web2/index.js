const express = require("express");
const cors = require("cors");
const connecDB = require('./database/connection')
const Project = require('./models/projectSchema')
const User = require('./models/UserSchema')
const app = express();


const PORT = process.env.PORT || 3001;

connecDB()
require('dotenv').config({path: './config.env'});
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
  const project = await Project.create({...req.body});
  // add project in user db
  const user = await User.findOne({address:req.body.creators[0]})
  user.projectsCreated.push(projectId);
  await user.save()
  
  res.status(201).json(project)
  } catch (err) {
    console.log(err);
  }
  


});

app.post("/projectTokenBought", async (req, res) => {
  try {
    const projectId = req.body.projectId
    
    // Update in user db that ticket has been bought
    const user = await User.findOne({address:req.body.address})
    user.boughtProjects.push(projectId);
    await user.save()

    // Update in project db that ticket has been bought 
    const project = await Project.updateOne({projectId},{ $inc: { tokensBought: 1 } })
    await project.save()
    res.status(201).json(user)
    //store data in database
  } catch (err) {
    console.log(err);
  }
  
});


app.get("/listedProjects", async(req,res) => {

  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  } catch (err) {
    console.log(err);
  }
})


app.get("/boughtProjects", async(req,res)=>{
  try {
    const user = await User.findOne({address:req.body.address})
    res.status(200).send(user.projects)
  } catch (err) {
    console.log(err);
  }
  
})

app.get("/createdProjects", async(req,res)=>{
  try {
    const user = await User.findOne({address:req.body.address})
    res.status(200).send(user.boughtProjects)
  } catch (err) {
    console.log(err);
  }
})


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
