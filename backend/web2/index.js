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
  const { address } = req.body
  try {
    //check if the user exists in the db
    const user = await User.findOne({ address })
    if (!user) {
      //if not add him
      const newUser = await User.create({ address })
      return res.status(201).send(newUser)
    }
    //if yes, return their data to the frontend
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.get('/getProjectData/:projectId', async (req, res) => {
  try {
    //gets called in project description page
    const { projectId } = req.params
    const project = await Project.find({ projectId })
    //return the project details
    res.status(200).json(project)
  } catch (err) {
    console.log(err)
  }
})

app.post('/createUser', async (req, res) => {
  //when user connects their wallet.

  const { address } = req.body
  try {
    //Create user data if they dont exist, once they connect their wallet
    let user = await User.findOne({ address: address })
    if (!user) {
      user = new User({ address })
      await user.save()
    }
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/createProject', async (req, res) => {
  try {
    // create project
    const { creators } = req.body
    // add project in user db
    const project = await Project.create({ ...req.body })

    // create user with all the address present in the creators array
    const users = creators.map(async address => {
      let user = await User.findOne({ address });
      if (!user) {
        user = new User({ address });
        await user.save();
      }
      return user;
    });
    await Promise.all(users);

    res.status(201).json(project)
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});


app.patch('/updateProjectStatus/:id', async (req, res) => {
  const { projectId } = req.params
  try {
    // find the document by id
    const project = await Project.find({ projectId })

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

app.post('/projectTokenBought', async (req, res) => {
  //updates info after user buys a token
  try {
    const { projectId, address } = req.body

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
