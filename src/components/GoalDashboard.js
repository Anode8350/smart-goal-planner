import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalForm from './GoalForm';
import DepositForm from './DepositForm';
import OverviewPanel from './OverviewPanel';

function GoalDashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div>
      <OverviewPanel goals={goals} />
      <GoalForm addGoal={addGoal} />
      <DepositForm goals={goals} updateGoal={updateGoal} />
      <GoalList goals={goals} updateGoal={updateGoal} deleteGoal={deleteGoal} />
    </div>
  );
}

export default GoalDashboard;
