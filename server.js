const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'build')))



app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Server started on port ${port}`));
