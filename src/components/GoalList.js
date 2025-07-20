import React from 'react';
import GoalCard from './GoalCard';

function GoalList({ goals, updateGoal, deleteGoal }) {
  return (
    <div>
      <h2>Your Goals</h2>
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          updateGoal={updateGoal}
          deleteGoal={deleteGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;
