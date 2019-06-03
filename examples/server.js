const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})