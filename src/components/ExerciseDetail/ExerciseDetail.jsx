import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient/SupabaseClient';
import { Button } from '../Button/Button';
import { Header } from '../Header/Header';
import './ExerciseDetail.css';

export const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    const { data } = await supabase
      .from('workouts')
      .select('*')
      .eq('finished', false);

    setWorkouts(data);
  };

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
    fetchWorkouts();
  }, []);

  const handleAddExercise = async () => {
    const updated = [...savedExercises, { name: exercise.name, sets: [] }];
    if (workouts.length === 0) {
      const { error } = await supabase.from('workouts').insert([
        {
          title: 'Nový trénink',
          date: new Date().toISOString().slice(0, 10),
          exercises: [{ id: exercise.id, name: exercise.name }],
          created: new Date().toISOString(),
          finished: false,
        },
      ]);
    } else {
      const { data, error } = await supabase
        .from('workouts')
        .update({
          exercises: [
            ...workouts[0].exercises,
            { id: exercise.id, name: exercise.name },
          ],
        })
        .eq('id', workouts[0].id);
    }
    fetchWorkouts();
  };

  const handleReset = async () => {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workouts[0].id);

    if (error) return;
    fetchWorkouts();
  };

  if (!exercise) return <p>Načítání...</p>;

  return (
    <div className="container">
      <Header />

      <h2>{exercise.name}</h2>
      <p>{exercise.description}</p>

      {exercise.image_url && (
        <img
          src={exercise.image_url}
          alt={exercise.name}
          className="exercise-detail-image"
        />
      )}

      <Button text="Přidat do plánu" onClick={handleAddExercise} />
      {workouts.length > 0 && workouts[0].exercises && (
        <div className="selected-exercises">
          <h4>Plánované cviky:</h4>
          <ul>
            {workouts[0].exercises.map((ex, index) => (
              <li key={index}>{ex.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/stickman">
        <Button text="+ Přidat jinou partii" />
      </Link>
      <Link to="/workoutform">
        <Button text="Uložit trénink" />
      </Link>
      <Button text="Vymazat vybraný trénink" onClick={handleReset} />
    </div>
  );
};
