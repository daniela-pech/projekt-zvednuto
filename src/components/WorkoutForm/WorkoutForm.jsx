import React, { useState } from 'react';
import { Header } from '../Header/Header';

export const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    name: 'Bench',
    sets: [{ kg: '0', reps: '0' }],
  });

  const handleSetClick = () => {
    setWorkout({
      name: workout.name,
      sets: [...workout.sets, { kg: '0', reps: '0' }],
    });
  };

  const updateSetProperty = (index, key, value) => {
    setWorkout({
      name: workout.name,
      sets: workout.sets.map((set, idx) => {
        if (idx === index) {
          return { ...set, [key]: value };
        }
        return set;
      }),
    });
  };

  console.log(workout);

  return (
    <div className="container">
      <Header />
      <h2>{workout.name}</h2>

      {workout.sets.map((set, index) => (
        <div key={index}>
          <div>{index + 1}</div>
          <input
            value={set.kg}
            type="number"
            placeholder="Váha"
            onChange={(e) => updateSetProperty(index, 'kg', e.target.value)}
          />
          <input
            value={set.reps}
            type="number"
            placeholder="Počet opakování"
            onChange={(e) => updateSetProperty(index, 'reps', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSetClick}>Přidat další sérii</button>
      <br />
      <button>Přidat jiný cvik</button>
      <br />
      <button>HOTOVO</button>
    </div>
  );
};
