const axios = require('axios')
const express = require('express')
const app = express()
const port = 3001

app.use(express.json());

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post('/', async (req, res) => {
  // Expect a list of names: ['Carla', 'Bert']
  console.log(req.body);

  // Expected response to client: [{name: 'Carla', age: 22}, {name: 'Bert', age: 35}]
  res.send('Got the names!');
})

app.listen(port, () => {
  console.log(`Agify app listening on port ${port}`)
})
