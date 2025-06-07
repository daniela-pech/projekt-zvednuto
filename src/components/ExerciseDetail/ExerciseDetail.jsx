import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient/SupabaseClient";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import "./ExerciseDetail.css";

export const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [savedExercises, setSavedExercises] = useState([]);

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
  }, [id]);

  useEffect(() => {
    const stored = localStorage.getItem("zvednuto-vyber");
    if (stored) {
      setSavedExercises(JSON.parse(stored));
    }
  }, []);

  const handleAddExercise = () => {
    const updated = [...savedExercises, exercise];
    localStorage.setItem("zvednuto-vyber", JSON.stringify(updated));
    setSavedExercises(updated);
  };

  const handleReset = () => {
    localStorage.removeItem("zvednuto-vyber");
    setSavedExercises([]);
  };

  if (!exercise) return <p>Načítání...</p>;

  return (
    <div className="container">
      <Header />

      <h2>{exercise.name}</h2>
      <br />
      <p>{exercise.description}</p>
      {exercise.image_url && (
        <img
          src={exercise.image_url}
          alt={exercise.name}
          className="exercise-detail-image"
        />
      )}

      <Button text="👌" onClick={handleAddExercise} />

      {savedExercises.length > 0 && (
        <div className="selected-exercises">
          <h4>Vybrané cviky:</h4>
          <ul>
            {savedExercises.map((ex, index) => (
              <li key={index}>{ex.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/stickman">
        <Button text="+ Přidat cvik" />
      </Link>
      <Link to="/">
        <Button text="Hotovo" />
      </Link>
      <Button text="Začít znovu" onClick={handleReset} />
    </div>
  );
};
