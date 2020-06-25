// Dependencies
const express = require('express');
const cors = require("cors");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  
  const {title, url , techs} = request.body;
  
  const likes = 0;
  const project = { id : uuid() , title , url, password , techs, likes };
  repositories.push(project);
  return response.status(201).json(project);

});

app.put("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const {title, url , password , techs} = request.body;
  const repositoriesIndex = repositories.findIndex(project => project.id === id);
  if (repositoriesIndex < 0){
    return response.status(400).json({error:"Repositorie not found!"});  
  }
  
  const likes = repositories[repositoriesIndex].likes;
  const project = {id, title , url , password , techs , likes};
  repositories[repositoriesIndex] = project;
  return response.status(201).json(project);

});

app.delete("/repositories/:id", (request, response) => {
  
  const {id} = request.params;
  const repositoriesIndex = repositories.findIndex(project => project.id === id);
  if (repositoriesIndex < 0){
    return response.status(400).json({error:"Repositorie not found!"});  
  }
  
  repositories.splice(repositoriesIndex,1);
  return response.status(204).send();

});

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
