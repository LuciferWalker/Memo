const express = require('express')
const cors = require('cors')
const connecDB = require('./database/connection')
const Project = require('./models/projectSchema')
const User = require('./models/UserSchema')
const app = express()

const PORT = process.env.PORT || 3001
require('dotenv').config({ path: '../config.env' })
connecDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/getUserData', async (req, res) => {
  //when user connects their wallet.
  const { address } = req.body;
  try {
    //check if the user exists in the db
    const user = await User.findOne({ address });
    if (!user) {
      //if not add him
      const newUser = await User.create({ address });
      return res.status(201).send(newUser);
    }
    //if yes, return their data to the frontend
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/getProjectData/:projectId', async (req, res) => {
  try {
    //gets called in project description page
    const { projectId: id } = req.params
    const project = await Project.findById(id)
    //return all the project details
    res.status(200).json(project)
  } catch (err) {
    console.log(err)
  }
})

app.post('/createProject', async (req, res) => {
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
    const project = await Project.create({ ...req.body })

    //[1,2,3]

    //X->2
    //Y->1,2,3

    //1 does not exist, thus create
    //2 exists, then push Y in createdProjects and update the social URL
    //3 does not exist, thus create

    // add project in user db
    const user = await User.findOne({ address: req.body.creators[0] }) // assuming first one is the creator in the creator array
    user.projectsCreated.push(projectId)
    await user.save()

    //create project in marketplace contract

    res.status(201).json(project)
  } catch (err) {
    console.log(err)
  }
})

app.patch('/updateProjectStatus/:id', async (req, res) => {
  const { projectId: id } = req.params
  try {
    // find the document by id
    const project = await Project.findById(id)

    if (!project) {
      // if no project is found, send a 404 Not Found response
      return res.status(404).send('Project not found')
    }
    // update the status
    project.projectStatus = false
    await project.save()

    // if successful, send a 200 OK response with the updated document
    res.status(200).send(doc)
  } catch (err) {
    // if an error occurs, send a 500 Internal Server Error response
    res.status(500).send(err)
  }
})

//Create user data if they dont exist, once they connect their wallet

app.post('/projectTokenBought', async (req, res) => {
  //updates info after user buys a token
  try {
    const {projectId, address} = req.body

    // Update in user db that ticket has been bought
    const user = await User.findOne({ address })
    user.boughtProjects.push(projectId)
    await user.save()

    // Update in project db that ticket has been bought
    const project = await Project.updateOne(
      { projectId },
      { $inc: { tokensBought: 1 } },
    )
    await project.save()
    res.status(200).json(user)
    //store data in database
  } catch (err) {
    console.log(err)
  }
})

app.get('/listedProjects', async (req, res) => {
  try {
    const projects = await Project.find({ projectStatus: true }) //fetch projects that has true status, - After every mint, call getstatus function, and set status to false once we get it
    res.status(200).json(projects)
  } catch (err) {
    console.log(err)
  }
})

//call getProjectStatus function after a user buys token

app.get('/boughtProjects', async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address })
    res.status(200).send(user.projects)
  } catch (err) {
    console.log(err)
  }
})

app.get('/createdProjects', async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address })
    res.status(200).send(user.boughtProjects)
  } catch (err) {
    console.log(err)
  }
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
