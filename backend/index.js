const connecttomongo=require('./db')
const express = require('express')
var cors = require('cors')

 

connecttomongo();
const app = express()
const port = 5000

app.use(cors())
app.get('/', (req, res) => {
  res.send('hello this is to check api response')
})
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`SnapNotes backend listening at https://localhost:${port}`)
})