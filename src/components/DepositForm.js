import React, { useState } from 'react';

function DepositForm({ goals, updateGoal }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const goal = goals.find(g => g.id === goalId);
    const updatedAmount = goal.savedAmount + parseFloat(amount);

    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedAmount })
    })
      .then(res => res.json())
      .then(updatedGoal => {
        updateGoal(updatedGoal);
        setGoalId('');
        setAmount('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
        <option value="">--Select a Goal--</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Deposit</button>
    </form>
  );
}

export default DepositForm;
