import React, { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./WorkoutForm.css";

export const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    name: "Bench press",
    sets: [{ kg: "", reps: "" }],
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
      (item) => item.sets === undefined
    );

    if (workoutsWithoutSets.length === 0) {
      setIsWorkoutFinished(true);
    } else {
      setWorkout({
        name: workoutsWithoutSets[0].name,
        sets: [{ kg: "", reps: "" }],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading && isWorkoutFinished === false) {
    return (
      <div className="chyba">
        <p>Ups… tahle stránka si dneska vzala rest day. </p>
        <p> Ale ty ne! Klikni zpátky a zvedni to!</p>
      </div>
    );
  }

  const handleSetClick = async () => {
    const updatedWorkouts = workouts.exercises.map((exercise) =>
      exercise.name === workout.name ? workout : exercise
    );
    const { data, error } = await supabase
      .from("workouts")
      .update({
        exercises: updatedWorkouts,
      })
      .eq("id", workouts.id);

    setWorkout({
      name: workout.name,
      sets: [...workout.sets, { kg: "", reps: "" }],
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
        <h1>
          {workouts?.exercises &&
            `${
              workouts.exercises.findIndex((ex) => ex.name === workout.name) + 1
            }. ${workout.name}`}
        </h1>

        {workout.sets.map((set, index) => (
          <div key={index} className="set-block">
            <p className="set-label">{index + 1}. série</p>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor={`kg-${index}`}>Váha</label>
                <input
                  id={`kg-${index}`}
                  value={set.kg}
                  type="number"
                  placeholder="Váha"
                  onChange={(e) =>
                    updateSetProperty(index, "kg", e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <label htmlFor={`reps-${index}`}>Opakování</label>
                <input
                  id={`reps-${index}`}
                  value={set.reps}
                  type="number"
                  placeholder="Opakování"
                  onChange={(e) =>
                    updateSetProperty(index, "reps", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        <Button text="Ulož sérii" onClick={handleSetClick} color="#236E4C" />

        {!isWorkoutFinished && (
          <Button text="Další cvik" onClick={fetchWorkouts} color="#767676" />
        )}

        <Link to="/workoutsummary">
          <Button text="Hotovo" color="#D30F0F" />
        </Link>
      </div>
    </div>
  );
};
