const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/formbuilder', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose schema for a form
const formSchema = new mongoose.Schema({
  title: String,
  questions: [String],
});

const Form = mongoose.model('Form', formSchema);

app.use(express.json());

// Create a new form
app.post('/forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.post('/forms', async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).send(form);
    } catch (error) {
        res.status(400).send(error);
    }
});
