const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  share: {
    type: Number,
    required: true,
    default: 0,
  },
  paid: {
    type: Number,
    required: true,
    default: 0,
  },
});

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [memberSchema],
    ref: 'Group',
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

module.exports = model('Group', groupSchema);
