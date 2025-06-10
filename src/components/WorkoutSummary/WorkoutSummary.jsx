import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import "./WorkoutSummary.css";

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
              {workout[0] &&
                workout[0].exercises &&
                workout[0].exercises.map((item, index) => (
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
                      <>
                        {item.sets && item.sets.length > 0 ? (
                          <>
                            <div className="exercise-sets">
                              {item.sets.map((set, i) => (
                                <div key={i} className="set-item">
                                  <div className="set-title">
                                    {i + 1}. série
                                  </div>
                                  <div className="set-info-row">
                                    <div className="set-info">{set.kg} kg</div>
                                    <div className="set-info">
                                      {set.reps} opakování
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="exercise-chart">
                              <Line
                                data={{
                                  labels: item.sets.map(
                                    (_, i) => `${i + 1}. série`
                                  ),
                                  datasets: [
                                    {
                                      label: "Zvednutá váha (kg)",
                                      data: item.sets.map((set) => set.kg),
                                      borderColor: "#D30F0F",
                                      backgroundColor: "rgba(231, 76, 60, 0.2)",
                                      pointBackgroundColor: "#D30F0F",
                                      pointRadius: 4,
                                      pointHoverRadius: 6,
                                      tension: 0.4,
                                    },
                                  ],
                                }}
                                options={{
                                  responsive: true,
                                  plugins: {
                                    legend: {
                                      display: true,
                                      position: "bottom",
                                      labels: {
                                        color: "#fff",
                                        font: {
                                          size: 14,
                                          weight: "500",
                                        },
                                        boxWidth: 12,
                                        usePointStyle: true,
                                        pointStyle: "circle",
                                      },
                                    },
                                    title: {
                                      display: false,
                                    },
                                  },
                                  scales: {
                                    y: {
                                      ticks: {
                                        color: "#ccc",
                                      },
                                      title: {
                                        display: true,
                                        text: "kg",
                                        color: "#ccc",
                                      },
                                      grid: {
                                        color: "rgba(255,255,255,0.1)",
                                      },
                                    },
                                    x: {
                                      ticks: {
                                        color: "#ccc",
                                      },
                                      title: {
                                        display: true,
                                        text: "Série",
                                        color: "#ccc",
                                      },
                                      grid: {
                                        color: "rgba(255,255,255,0.1)",
                                      },
                                    },
                                  },
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <p className="no-workout-message">
                            Dnes jsi neodcvičil žádnou sérii.
                            <br></br>
                            Příště to půjde lépe!
                          </p>
                        )}
                      </>
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
