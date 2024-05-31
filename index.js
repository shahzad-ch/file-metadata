var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

// const storage = multer.memoryStorage();
const upload = multer({storage: multer.memoryStorage()});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size
  res.send({
    name,
    type,
    size
  })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
