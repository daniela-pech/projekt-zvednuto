import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import "./WorkoutSummary.css";

export const WorkoutSummary = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data } = await supabase.from("workouts").select("*");

      setWorkouts(data);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <p>Načítám tvoje zvednuté kilíčka... 🏋️‍♀️</p>;
  }

  return (
    <div className="workout-summary">
      <h2 className="summary-title">Skvělá práce!</h2>
      <p className="summary-all">
        Dnes jsi zvedl <strong>{} kg!</strong>
      </p>
      {workouts.map((workout) => (
        <div key={workout.id} className="exercise-summary">
          <h3 className="exercise-name">{workout.title}</h3>
        </div>
      ))}
    </div>
  );
};
