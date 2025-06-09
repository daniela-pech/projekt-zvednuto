import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./WorkoutForm.css";

export const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    name: "Bench",
    sets: [{ kg: "0", reps: "0" }],
  });
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  const fetchWorkouts = async () => {
    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("finished", false);
    setWorkouts(data[0]);
    const workoutsWithoutSets = data[0].exercises.filter(
      (item) => item.sets === undefined,
    );

    if (workoutsWithoutSets.length === 0) {
      setIsWorkoutFinished(true);
    } else {
      setWorkout({
        name: workoutsWithoutSets[0].name,
        sets: [{ kg: "0", reps: "0" }],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading && isWorkoutFinished === false) {
    return <p>Načítám tvoje zvednuté kilíčka... 🏋️‍♀️</p>;
  }

  const handleSetClick = async () => {
    const updatedWorkouts = workouts.exercises.map((exercise) =>
      exercise.name === workout.name ? workout : exercise,
    );
    const { data, error } = await supabase
      .from("workouts")
      .update({
        exercises: updatedWorkouts,
      })
      .eq("id", workouts.id);

    setWorkout({
      name: workout.name,
      sets: [...workout.sets, { kg: "0", reps: "0" }],
    });

    console.log(workout);
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

  return (
    <div className="main-panel">
      <div className="container">
        <Header />
        <h1>{workout.name}</h1>

        {workout.sets.map((set, index) => (
          <div key={index} className="workout-form">
            <div>{index + 1}. série</div>
            <input
              value={set.kg}
              type="number"
              placeholder="Váha"
              onChange={(e) => updateSetProperty(index, "kg", e.target.value)}
            />
            <input
              value={set.reps}
              type="number"
              placeholder="Počet opakování"
              onChange={(e) => updateSetProperty(index, "reps", e.target.value)}
            />
          </div>
        ))}

        <Button text="Uložit sérii" onClick={handleSetClick} color="#767676" />

        <br />
        {!isWorkoutFinished && (
          <Button
            text="Přidat další cvik"
            onClick={fetchWorkouts}
            color="#767676"
          />
        )}
        <br />

        <Link to="/workoutsummary">
          <Button text="Ukončit workout" color="#236E4C" />
        </Link>
      </div>
    </div>
  );
};
