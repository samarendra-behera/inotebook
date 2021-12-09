const connectToMongo = require('./db.js');
const cors = require('cors')
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Papun It is Your first API Development')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})