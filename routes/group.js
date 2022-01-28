const mongoose = require('mongoose');
const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const groups = await groupController.getAll();
    return res.status(200).json({
      groups,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const group = await groupController.create(body);
    return res.status(200).json({
      id: group._id,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const [group] = await groupController.getById(id);
    return res.status(200).json(group);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get('/:id/expenses', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const allExpenses = await groupController.getExpensesById(id);
    return res.status(200).json(allExpenses);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const { body } = req;
    const groupId = await groupController.update(id, body);
    return res.status(200).json({ id: groupId });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    await groupController.delete(id);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
