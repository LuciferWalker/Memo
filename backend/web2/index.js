const express = require("express");
const cors = require("cors");
const connecDB = require("./database/connection");

const app = express();

require("dotenv".config({ path: "./config.env" }));
const PORT = process.env.PORT;

connecDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/uploadFile", async (req, res) => {
  //upload file to the ipfs, then upload the contract
  //upload file logic
});

app.post("/createProject", async (req, res) => {
  const {
    projectTitle,
    projectDescription,
    creators,
    tokenPrice,
    tokenSupply,
    shares,
  } = req.body;

  //store data in database

  //call createProject function from marketplace
});

app.get("/listedProjects", async (req, res) => {
  //fetch all projects whos status is true from mongodb
});

app.post("/downloadFile", async (req, res) => {
  const { projectId } = req.body;

  //download the content using the cid associated with this projectId
});

app.get("/boughtProjects", async (req, res) => {
  //show all projects the user has bought tokens in
});

app.get("/createdProjects", async (req, res) => {
  //show all projects the user has created
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
