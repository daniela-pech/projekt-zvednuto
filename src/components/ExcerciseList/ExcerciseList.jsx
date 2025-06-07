import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../SupabaseClient/SupabaseClient';
import './ExcerciseList.css';

export const ExerciseList = ({ category, subcategory, resistanceType }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!category || !subcategory || !resistanceType) {
        setExercises([]);
        return;
      }

      const { data } = await supabase
        .from('exercises')
        .select('id, name, description, image_url')
        .eq('category', category)
        .eq('subcategory', subcategory)
        .eq('resistance_type', resistanceType);

      setExercises(data);
    };

    fetchExercises();
  }, [category, subcategory, resistanceType]);

  if (!category || !subcategory || !resistanceType) return null;

  return (
    <ul className="exercise-list">
      {exercises.map((cvik) => (
        <li key={cvik.id}>
          <Link to={`/cvik/${cvik.id}`}>
            <h3>{cvik.name}</h3>
          </Link>
          <p>{cvik.description}</p>
          {cvik.image_url && (
            <img
              src={cvik.image_url}
              alt={cvik.name}
              className="excercise-image"
            />
          )}
        </li>
      ))}
    </ul>
  );
};
