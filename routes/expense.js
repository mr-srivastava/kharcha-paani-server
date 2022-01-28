const mongoose = require('mongoose');
const express = require('express');
const expenseController = require('../controllers/expenseController');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    const [expense] = await expenseController.getById(id);
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const expenseId = await expenseController.create(body);
    return res.status(200).json(expenseId);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const id = mongoose.Types.ObjectId(req.params);
//     const { body } = req;
//     const expenseId = await expenseController.update(id, body);
//     return res.status(200).json(expenseId);
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params);
    await expenseController.delete(id);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
