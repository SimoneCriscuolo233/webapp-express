const express = require('express')
const app = express()
const port = process.env.PORT
const moviesRouter = require('./routers/movies.js')
const errorsHandler = require('./middlewares/errorsHandler.js')
const notFound = require('./middlewares/notFound.js')
const connection = require('./data/db')
const imagePath = require('./middlewares/imagePathMiddleware.js')


app.use(express.static('public'))
app.use(express.json())
app.use(imagePath)
app.use('/movies', moviesRouter)
app.get('/', (req, res) => {
  res.send('Server del mio blog')
})
app.use(errorsHandler)
app.use(notFound)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
