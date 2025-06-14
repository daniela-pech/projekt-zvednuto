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
          title: "Zvednuto",
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

  if (!exercise || !workouts) {
    return (
      <div className="chyba">
        <p>Ups… tahle stránka si dneska vzala rest day. </p>
        <p> Ale ty ne! Klikni zpátky a zvedni to!</p>
      </div>
    );
  }

  const isDuplicist = workouts[0]?.exercises.some(
    (ex) => ex.id === exercise?.id
  );

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

        {!isDuplicist && (
          <Button
            text="Přidej do plánu"
            onClick={handleAddExercise}
            color="#236E4C"
          />
        )}
        {workouts.length > 0 && workouts[0].exercises && (
          <div className="selected-exercises">
            <h2>Dnešní tréninkový plán:</h2>
            <ul>
              {workouts[0].exercises.map((ex, index) => (
                <li key={index}>{`${index + 1}. ${ex.name}`}</li>
              ))}
            </ul>
          </div>
        )}
        {workouts.length > 0 && (
          <Button
            text="Smaž celý trénink"
            onClick={handleReset}
            color="#D30F0F"
          />
        )}
        <Link to="/stickman">
          <Button
            text={
              workouts.length === 0
                ? "Vyber jinou partii"
                : "Přidej další partii"
            }
            color="#236E4C"
          />
        </Link>
        {workouts.length > 0 && (
          <Link to="/workoutform">
            <Button text="Začni trénink" color="#236E4C" />
          </Link>
        )}
      </div>
    </div>
  );
};
