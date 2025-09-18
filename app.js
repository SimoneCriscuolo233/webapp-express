const express = require('express')
const app = express()
const port = process.env.PORT
const connection = require('./data/db')



app.use(express.static('public'))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Server del mio blog')
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
