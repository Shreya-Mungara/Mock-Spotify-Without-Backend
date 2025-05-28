const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
  },
  password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
  },
  company: {
      type: String,
      required: false // Or true if mandatory
  },
  dob: {
      type: Date,
      required: false // Or true if mandatory
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
