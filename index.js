const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

mongoose.connect('mongodb+srv://folawemijaseem_db_user:Jaseem%4025@cluster0.l3qzmea.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const kittySchema = new mongoose.Schema({
  name: String
}, { timestamps: true })

const Kitten = mongoose.model('cat', kittySchema)

// CREATE
app.post('/api/submit-cat', async (req, res) => {
  try {
    const newCat = new Kitten({ name: req.body.catName })
    await newCat.save()
    res.json(newCat)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// READ ALL
app.get('/api/cats', async (req, res) => {
  const cats = await Kitten.find().sort({ createdAt: -1 })
  res.json(cats)
})

// READ ONE
app.get('/api/cats/:id', async (req, res) => {
  const cat = await Kitten.findById(req.params.id)
  res.json(cat)
})

// UPDATE
app.put('/api/cats/:id', async (req, res) => {
  const updated = await Kitten.findByIdAndUpdate(
    req.params.id,
    { name: req.body.catName },
    { new: true }
  )
  res.json(updated)
})

// DELETE
app.delete('/api/cats/:id', async (req, res) => {
  await Kitten.findByIdAndDelete(req.params.id)
  res.json({ msg: 'Deleted' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))