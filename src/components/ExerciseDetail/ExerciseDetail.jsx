import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import "./ExerciseDetail.css";

export const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("finished", false);

    setWorkouts(data);
  };

  useEffect(() => {
    const fetchExercise = async () => {
      const { data } = await supabase
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single();

      setExercise(data);
    };

    fetchExercise();
    fetchWorkouts();
  }, []);

  const handleAddExercise = async () => {
    if (workouts.length === 0) {
      const { error } = await supabase.from("workouts").insert([
        {
          title: "Nový trénink",
          date: new Date().toISOString().slice(0, 10),
          exercises: [{ id: exercise.id, name: exercise.name }],
          created: new Date().toISOString(),
          finished: false,
        },
      ]);
    } else {
      const { data, error } = await supabase
        .from("workouts")
        .update({
          exercises: [
            ...workouts[0].exercises,
            { id: exercise.id, name: exercise.name },
          ],
        })
        .eq("id", workouts[0].id);
    }
    fetchWorkouts();
  };

  const handleReset = async () => {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workouts[0].id);

    if (error) return;
    fetchWorkouts();
  };

  if (!exercise) return <p>Načítám stránku. Děkuji za trpělivost.</p>;

  return (
    <div className="main-panel">
      <div className="container">
        <Header />

        <h1>{exercise.name}</h1>
        <div className="exercise-description">
          <p>{exercise.description}</p>
        </div>

        {exercise.image_url && (
          <img
            src={exercise.image_url}
            alt={exercise.name}
            className="exercise-detail-image"
          />
        )}

        <Button
          text="Přidat do plánu"
          onClick={handleAddExercise}
          color="#236E4C"
        />
        {workouts.length > 0 && workouts[0].exercises && (
          <div className="selected-exercises">
            <h2>Plánované cviky:</h2>
            <ul>
              {workouts[0].exercises.map((ex, index) => (
                <li key={index}>{ex.name}</li>
              ))}
            </ul>
          </div>
        )}

        <Link to="/stickman">
          <Button text="Přidat jinou partii" color="#767676" />
        </Link>
        <Link to="/workoutform">
          <Button text="Uložit trénink" color="#767676" />
        </Link>
        <Button text="Reset" onClick={handleReset} color="#D30F0F" />
      </div>
    </div>
  );
};
