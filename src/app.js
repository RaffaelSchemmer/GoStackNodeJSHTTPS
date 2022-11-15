// Dependencies
const express = require('express');
const cors = require("cors");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

// Database (In Memory)
const repositories = [];

/*
  GET - Return all repositories (in JSON)
*/
app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

/*
  POST - Add new repository that have (id, title, url, techs, likes)
  Return 201 + json notify that add new repo
*/
app.post("/repositories", (request, response) => {
  
  const {title, url , techs} = request.body;
  
  const likes = 0;
  const project = { id : uuid() , title , url, techs, likes};
  repositories.push(project);
  return response.status(201).json(project);

});

/*
  PUT - Update repo using param id
  Get all data of body and find id of repository
  If not find return 400 with error
  Else return 201 with repository (In JSON)
*/
app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const {title, url , techs} = request.body;
  const repositoriesIndex = repositories.findIndex(project => project.id === id);
  if (repositoriesIndex < 0){
    return response.status(400).json({error:"Repositorie not found!"});  
  }
  
  const likes = repositories[repositoriesIndex].likes;
  const project = {id, title , url, techs , likes};
  repositories[repositoriesIndex] = project;
  return response.status(201).json(project);

});

/*
  DELETE - Delete repo using param id
  Find id of repository
  If not find return 400 with error
  Else remove and return 204
*/
app.delete("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const repositoriesIndex = repositories.findIndex(project => project.id === id);
  if (repositoriesIndex < 0){
    return response.status(400).json({error:"Repositorie not found!"});  
  }
  
  repositories.splice(repositoriesIndex,1);
  return response.status(204).send();

});

/*
  POST - Like repo using id param
  If not find return 400 with error
  Else return 201 with repository (In JSON)
*/
app.post("/repositories/:id/like", (request, response) => {
  
  const {id} = request.params;
  
  const repositoriesIndex = repositories.findIndex(project => project.id === id);
  if (repositoriesIndex < 0){
    return response.status(400).json({error:"Repositorie not found!"});  
  }
  
  repositories[repositoriesIndex].likes++;
  return response.status(201).json(repositories[repositoriesIndex]);

});

module.exports = app;
