const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const users = require('./src/utils/mockdata');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'build')))

const SECRET_KEY = 'mysecretkey';

app.post('/api/authenticate', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  console.log(user);
  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    console.log(token);
    res.send({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.get('/api/data', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const user = users.find(u => u.id === userId);
    res.send({ message: `Welcome ${user.name}! This is your private data.` });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/',(req,res) => {
    console.log("Your app is running");
    res.status(200).json({message : "App is running"});
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
