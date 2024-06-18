const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
let usersInfo = JSON.parse(fs.readFileSync('../userInfo.json'));

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from our server!');
})

app.get('/getUserInfo', (req, res) => {
  fs.readFile('../userInfo.json', 'utf8', (err, data) => {
    console.log(data);
    console.log('err ' + err);
    res.end(data);
  });
});

app.post('/submitUserInfo', (req, res) => {
  fs.writeFile('../userInfo.json', JSON.stringify(req.body), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        newUserInfo: req.body
      }
    })
  });
});

app.listen(8080, () => {
  console.log('server listening on port 8080')
})