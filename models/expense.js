const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: [Schema.Types.ObjectId],
    ref: 'Group',
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  sharedBy: {
    type: [Schema.Types.ObjectId],
    ref: 'Group',
    required: true,
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

module.exports = model('Expense', expenseSchema);
