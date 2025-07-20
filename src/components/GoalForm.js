import React, { useState } from 'react';

function GoalForm({ addGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(addedGoal => {
        addGoal(addedGoal);
        setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Goal</h2>
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
