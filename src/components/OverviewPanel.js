import React from 'react';

function OverviewPanel({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount);
  const today = new Date();

  return (
    <div className="overview-panel">
      <h2>Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: Ksh {totalSaved.toLocaleString()}</p>
      <p>Completed Goals: {completedGoals.length}</p>

      <h3>Time-Sensitive Goals</h3>
      <ul>
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
          const isComplete = goal.savedAmount >= goal.targetAmount;

          if (isComplete) return null;

          return (
            <li key={goal.id}>
              {goal.name}: {daysLeft} days left
              {daysLeft <= 30 && daysLeft >= 0 && (
                <span style={{ color: 'orange' }}> Warning: Less than 30 days!</span>
              )}
              {daysLeft < 0 && (
                <span style={{ color: 'red' }}> Overdue!</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OverviewPanel;
