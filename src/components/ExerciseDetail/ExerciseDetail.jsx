import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient/SupabaseClient';
import { Button } from '../Button/Button';
import './ExerciseDetail.css';

export const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      const { data } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .single();

      setExercise(data);
    };

    fetchExercise();
  }, [id]);

  if (!exercise) return <p>Načítání...</p>;

  return (
    <div className="container">
      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>
      {exercise.image_url && (
        <img
          src={exercise.image_url}
          alt={exercise.name}
          className="exercise-detail-image"
        />
      )}
      <Link to="/cvicit">
        <Button text="Začít trénink" />
      </Link>
    </div>
  );
};
