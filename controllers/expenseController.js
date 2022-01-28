const mongoose = require('mongoose');
const Expense = require('../models/expense');
const groupController = require('./groupController');

exports.getById = async (id) => {
  return Expense.find({ _id: id });
};

exports.getByGroupId = async (groupId) => {
  return Expense.find({
    groupId: mongoose.Types.ObjectId(groupId),
  });
};

exports.create = async (body) => {
  const expense = await Expense.create(body);
  await groupController.addContribution(body);
  return { id: expense._id };
};

// exports.update = async (id, body) => {
//   await Expense.findByIdAndUpdate(id, body);
//   await groupController.updateContribution(body);
//   return { id };
// };

exports.delete = async (id) => {
  const expense = await this.getById(id);
  await Expense.deleteOne({ _id: id });
  await groupController.removeContribution(expense);
  return { id: id };
};
