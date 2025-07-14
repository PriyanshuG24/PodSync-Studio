const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  guestName: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['admin', 'producer', 'guest'],
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled Session'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [participantSchema],
  status: {
    type: String,
    enum: ['waiting', 'live', 'ended'],
    default: 'waiting'
  },
  startedAt: Date,
  endedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);
