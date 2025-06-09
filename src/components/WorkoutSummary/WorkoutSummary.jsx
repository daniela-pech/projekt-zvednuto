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
  const [expandedIndex, setExpandedIndex] = useState(null);

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
          <input
            type="date"
            name="workoutDate"
            value={exerciseDate}
            onChange={(e) => setExerciseDate(e.target.value)}
          />
        </form>

        <h2 className="exercise-motto">Za dnešek máš ZVEDNUTO!</h2>
        {isFinished && (
          <>
            Tvůj trénink byl uložen.
            <Link to="/">
              <Button text="Nový trénink" color="#236E4C" />
            </Link>
          </>
        )}
        {!isFinished && (
          <>
            <div className="exercise-summary">
              {workout[0].exercises.map((item, index) => (
                <div key={item.name} className="exercise-item">
                  <div
                    className="exercise-name clickable"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  >
                    <h3>{item.name}</h3>
                    <span className="toggle-icon">
                      {expandedIndex === index ? "▲" : "▼"}
                    </span>
                  </div>

                  {expandedIndex === index && (
                    <div className="exercise-sets">
                      {item.sets.map((set, i) => (
                        <div key={i} className="set-item">
                          <div className="set-title">{i + 1}. série</div>
                          <div className="set-info-row">
                            <div className="set-info">{set.kg} kg</div>
                            <div className="set-info">{set.reps} opakování</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button text="uložit" onClick={saveWorkout} color="#236E4C" />
          </>
        )}
      </div>
    </div>
  );
};
