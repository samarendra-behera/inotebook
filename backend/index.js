const connectToMongo = require('./db.js');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.use(express.json())
// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Papun It is Your first API Development')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})