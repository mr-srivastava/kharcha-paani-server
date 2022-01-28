const e = require('express');
const { sumBy } = require('lodash');
var mongoose = require('mongoose');
const Group = require('../models/group');
const expenseController = require('./expenseController');

exports.getAll = async () => {
  return Group.find();
};

exports.create = async (group) => {
  return Group.create(group);
};

exports.getById = async (id) => {
  return Group.find({ _id: id });
};

exports.getExpensesById = async (id) => {
  const expenses = await expenseController.getByGroupId(id);
  const total = sumBy(expenses, (e) => e.amount);
  return { expenses, total };
};

exports.update = async (id, body) => {
  await Group.findOneAndUpdate({ _id: id }, body);
  return id;
};

exports.delete = async (id) => {
  return Group.deleteOne({ _id: id });
};

exports.addContribution = async (expense) => {
  const { groupId: id, amount, paidBy, sharedBy } = expense;
  const paidArr = paidBy.map(mongoose.Types.ObjectId);
  const sharedArr = sharedBy.map(mongoose.Types.ObjectId);
  const { members } = await Group.findById(id, { members: 1 });
  const paidContri = amount / paidArr.length;
  const shareContri = amount / sharedArr.length;

  const updatedMem = members.map((mem) => {
    if (paidArr.some((el) => el.equals(mem._id))) {
      mem.paid += paidContri;
    }
    if (sharedArr.some((el) => el.equals(mem._id))) {
      mem.share += shareContri;
    }
    return mem;
  });

  return this.update(id, { members: updatedMem });
};

exports.removeContribution = async (expense) => {
  const { groupId: id, amount, paidBy, sharedBy } = expense;
  const paidArr = paidBy.map(mongoose.Types.ObjectId);
  const sharedArr = sharedBy.map(mongoose.Types.ObjectId);
  const { members } = await Group.findById(id, { members: 1 });
  const paidContri = amount / paidArr.length;
  const shareContri = amount / sharedArr.length;

  const updatedMem = members.map((mem) => {
    if (paidArr.some((el) => el.equals(mem._id))) {
      mem.paid -= paidContri;
    }
    if (sharedArr.some((el) => el.equals(mem._id))) {
      mem.share -= shareContri;
    }
    return mem;
  });

  return this.update(id, { members: updatedMem });
};
