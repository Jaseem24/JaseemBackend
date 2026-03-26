const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const uri = 'mongodb+srv://folawemijaseem_db_user:Jaseem%4025@cluster0.l3qzmea.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log("Connected"))
  .catch(err => console.error(err));

const kittySchema = new mongoose.Schema({ name: String });
const Kitten = mongoose.model('Kitten', kittySchema);

app.get('/api/cats', async (req, res) => {
    const cats = await Kitten.find();
    res.json(cats);
});

app.post('/api/submit-cat', async (req, res) => {
    const newKitten = new Kitten({ name: req.body.catName });
    await newKitten.save();
    res.json({ msg: "Saved" });
});

app.put('/api/cats/:id', async (req, res) => {
    await Kitten.findByIdAndUpdate(req.params.id, { name: req.body.catName });
    res.json({ msg: "Updated" });
});

app.delete('/api/cats/:id', async (req, res) => {
    await Kitten.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running`);
});