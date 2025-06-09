import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import "./WorkoutSummary.css";
import { Link } from "react-router-dom";

export const WorkoutSummary = () => {
  const [workout, setWorkout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [isFinished, setIsFinished] = useState(false);

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
      if (data.length === 0) {
        setIsFinished(true);
      }
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
    setIsFinished(true);
  };

  return (
    <div className="main-panel">
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
        {isFinished && (
          <>
            uloženo
            <Link to="/">
              <Button text="Nový workout" color="#236E4C" />
            </Link>
          </>
        )}
        {!isFinished && (
          <>
            <div className="exercise-summary">
              <h3 className="exercise-name">{workout[0].title}</h3>
              <div>
                {workout[0].exercises.map((item) => (
                  <div key={item.name}>
                    <div>{item.name}</div>
                    {item.sets.map((it, index) => (
                      <div key={index}>
                        <div>Ahoj</div>
                        <div>{index}.série</div>
                        <div>{it.kg} kg</div>
                        <div>{it.reps} opakování</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <Button text="uložit" onClick={saveWorkout} color="#236E4C" />
          </>
        )}
      </div>
    </div>
  );
};
