const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://folawemijaseem_db_user:Jaseem%4025@cluster0.l3qzmea.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Connection error:', err))

const kittySchema = new mongoose.Schema({ name: String })
const Kitten = mongoose.model('cat', kittySchema)

app.get('/api/server/status', (req, res) => {
  res.json({ msg: 'Server is up and ready' })
})

app.post('/api/submit-cat', async (req, res) => {
  try {
    const kitty1 = new Kitten({ name: req.body.catName })
    await kitty1.save()
    res.json({ msg: 'Cat saved!', name: kitty1.name })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log('API is listening on Port:', PORT)
})