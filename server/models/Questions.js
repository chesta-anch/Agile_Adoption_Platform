const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  sectionId: String,
  question: String,
  options: [String],
  correctAnswer: String,
});

// Create and export the model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;