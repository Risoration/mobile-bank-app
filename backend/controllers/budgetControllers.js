import Budget from '../models/budget.js';

export const createBudget = async (req, res) => {
  try {
    const { userId, name, amount, startDate, endDate, category } = req.body;

    const budget = new Budget({
      userId,
      name,
      amount,
      startDate,
      endDate,
      category,
    });

    await budget.save();
    res.status(201).json({ message: 'Budget created successfully', budget });
  } catch (err) {
    console.error('Error creating budget:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const { userId } = req.params;

    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    return res.status(200).json({ success: true, data: budget });
  } catch (err) {
    console.error('Error fetching budget by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBudget)
      return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json({ success: true, data: updatedBudget });
  } catch (err) {
    console.error('Error updating budget:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json({ message: 'Budget deleted successfully' });
  } catch (err) {
    console.error('Error deleting budget:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
