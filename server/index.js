const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongourl = 'mongodb+srv://admin:admin@cluster0.eegyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongourl)
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

const User = require('./models/UserDetails');
const Question = require('./models/Questions');

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    const hashedPassword = password; // Replace this with actual hashing in production
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      attemptCount: 0,
      knowledgeLevel: 'Beginner',
      completedModules: 0, // Initialize with no completed modules
      totalModules: 10,    // Set the total number of modules
    });

    await newUser.save();
    res.status(201).json({ status: 'ok', message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: 'error', message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ status: 'error', message: 'Invalid password' });
    }

    // Fetch the attempt count, progress, and other details
    const { name, attemptCount, knowledgeLevel, completedModules, totalModules } = user;

    res.status(200).json({
      status: 'ok',
      message: 'Login successful',
      name,            
      email,           
      attemptCount,    
      knowledgeLevel,
      completedModules,  // Include progress data in the response
      totalModules      // Include total number of modules
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Questions Route with Query Parameter
app.get('/questions', async (req, res) => {
  const { sectionId } = req.query;

  try {
    const questions = await Question.aggregate([
      { $match: { sectionId } },
      { $sample: { size: 3 } } // Fetch 3 random questions
    ]);

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to increment attempt count
app.post('/update-attempt', async (req, res) => {
  const { email, attemptCount, knowledgeLevel } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { attemptCount: attemptCount, knowledgeLevel: knowledgeLevel } }, // Update both fields
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ status: 'ok', attemptCount: user.attemptCount, knowledgeLevel: user.knowledgeLevel });
  } catch (error) {
    console.error('Error updating attempt count and knowledge level:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Endpoint to update progress tracking
app.post('/update-progress', async (req, res) => {
  const { email, completedModules } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { completedModules: completedModules } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({
      status: 'ok',
      completedModules: user.completedModules,
      totalModules: user.totalModules,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
