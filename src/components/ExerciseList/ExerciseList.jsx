import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../SupabaseClient/SupabaseClient";
import "./ExerciseList.css";

export const ExerciseList = ({ category, subcategory, resistanceType }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!category || !subcategory || !resistanceType) {
        setExercises([]);
        return;
      }

      const { data } = await supabase
        .from("exercises")
        .select("id, name, description, image_url")
        .eq("category", category)
        .eq("subcategory", subcategory)
        .eq("resistance_type", resistanceType);

      setExercises(data);
    };

    fetchExercises();
  }, [category, subcategory, resistanceType]);

  if (!category || !subcategory || !resistanceType) return null;

  return (
    <div className="container">
      <ul className="exercise-list">
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Link to={`/exercise/${exercise.id}`}>
              <h3>{exercise.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
