import React from 'react';

function GoalCard({ goal, updateGoal, deleteGoal }) {
  const { id, name, category, savedAmount, targetAmount, deadline } = goal;
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const remaining = targetAmount - savedAmount;
  const daysLeft = Math.floor((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isComplete = savedAmount >= targetAmount;

  const handleDelete = () => {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" })
      .then(() => deleteGoal(id));
  };

  return (
    <div className="goal-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Saved: Ksh {savedAmount} / Ksh {targetAmount}</p>
      <progress value={progress} max={100}></progress>
      <p>Remaining: Ksh {remaining}</p>
      <p>Deadline: {deadline}</p>

      {isComplete ? (
        <p style={{ color: 'green' }}> Goal Complete!</p>
      ) : daysLeft < 0 ? (
        <p style={{ color: 'red' }}> Overdue</p>
      ) : daysLeft <= 30 ? (
        <p style={{ color: 'orange' }}>Deadline Approaching</p>
      ) : null}

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default GoalCard;
