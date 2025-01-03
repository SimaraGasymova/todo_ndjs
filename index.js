import { createServer } from 'node:http';
import fs from 'node:fs'
import { changeStatus, createTask, getData, initCounter, deleteTask } from './storage.js';

// const pages = './pages'
const hostname = '127.0.0.1';
const port = 3000;

function init() {
  initCounter()
}
const server = createServer((req, res) => {
  const url = req.url
  const method = req.method
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.end();
  }

  if (url === '/tasks' && method === 'POST') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      // console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const item = JSON.parse(body)
      const result = createTask(item)
      // console.log(result);
      res.end(result)
    });
  }

  // TODO Change Status
  if (url === '/tasks' && method === 'PATCH') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      // console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changedData = changeStatus(requestData.id)
      res.end(changedData)
    });
  }

  // ToDO Delete Task  
  if (url === '/tasks' && method === 'DELETE') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body);
      const result = deleteTask(requestData.id);
      res.end();
    });
  }
     
  if (url === '/tasks' && method === 'GET') {
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  init()
  console.log(`Server running at http://${hostname}:${port}/`);
});