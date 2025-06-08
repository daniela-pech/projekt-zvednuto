import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import "./WorkoutSummary.css";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";

export const WorkoutSummary = () => {
  const [workout, setWorkout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exerciseTitle, setExerciseTitle] = useState("");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [exerciseDate, setExerciseDate] = useState(formatDate(Date.now()));

  useEffect(() => {
    const fetchWorkout = async () => {
      const { data } = await supabase
        .from("workouts")
        .select("*")
        .eq("finished", false);

      setWorkout(data);
      setLoading(false);
    };

    fetchWorkout();
  }, []);

  if (loading) {
    return <p>Načítám tvoje zvednuté kilíčka... 🏋️‍♀️</p>;
  }

  console.log(workout);

  const saveWorkout = async () => {
    const { data, error } = await supabase
      .from("workouts")
      .update({
        finished: true,
        title: exerciseTitle,
        date: exerciseDate,
      })
      .eq("id", workout[0].id);
  };

  return (
    <div className="container">
      <Header />
      <form className="workout-form">
        <input
          type="text"
          placeholder="Zadej název tréninku"
          value={exerciseTitle}
          onChange={(e) => setExerciseTitle(e.target.value)}
        />
        <br />
        <input
          type="date"
          name="workoutDate"
          value={exerciseDate}
          onChange={(e) => setExerciseDate(e.target.value)}
        />
      </form>

      <h2 className="summary-title">Skvělá práce!</h2>

      {workout.map((workout) => (
        <div key={workout.id} className="exercise-summary">
          <h3 className="exercise-name">{workout.title}</h3>
        </div>
      ))}
      <Button text="uložit" onClick={saveWorkout} />
    </div>
  );
};
