import { useState, useEffect } from 'react';
import { ExerciseList } from '../ExerciseList/ExerciseList';
import { supabase } from '../SupabaseClient/SupabaseClient';

export const ExerciseSelect = ({ category }) => {
  const [subcategory, setSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [resistanceType, setResistanceType] = useState('');
  const [resistanceOptions, setResistanceOptions] = useState([]);

  // vypíše podkategorie ze Supabase při změně kategorie
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!category) {
        setSubcategories([]);
        return;
      }

      // ze supabase se vezme tabulka exercise a z ní sloupec subcathegory a dá se podmínka category
      const { data } = await supabase
        .from('exercises')
        .select('subcategory')
        .eq('category', category);

      // smažu duplicity a ulloží to do subcategories
      const subcategoriesWithoutDuplicities = [
        ...new Set(data.map((item) => item.subcategory)),
      ];
      setSubcategories(subcategoriesWithoutDuplicities);
    };

    fetchSubcategories();
  }, [category]);

  // vypíše typy odporu (vybavení)
  useEffect(() => {
    const fetchResistanceOptions = async () => {
      const { data } = await supabase
        .from('exercises')
        .select('resistance_type')
        .eq('category', category)
        .eq('subcategory', subcategory);

      const resistanceList = [
        ...new Set(data.map((item) => item.resistance_type)),
      ];
      setResistanceOptions(resistanceList);
      setResistanceType('');
    };

    fetchResistanceOptions();
  }, [category, subcategory]);

  return (
    <div className="container">
      <h1>{category}</h1>

      <form className="exercise-form">
        <label>
          VYBER PARTII:
          <select
            value={subcategory}
            onChange={(event) => {
              setSubcategory(event.target.value);
              setResistanceType('');
            }}
          >
            <option value="">-- Vyberte --</option>
            {subcategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {resistanceOptions.length > 0 && (
          <label>
            Vybavení:
            <select
              value={resistanceType}
              onChange={(e) => setResistanceType(e.target.value)}
            >
              <option value="">-- Vyberte --</option>
              {resistanceOptions.map((odpor) => (
                <option key={odpor} value={odpor}>
                  {odpor}
                </option>
              ))}
            </select>
          </label>
        )}
      </form>

      <ExerciseList
        category={category}
        subcategory={subcategory}
        resistanceType={resistanceType}
      />
    </div>
  );
};

//  {resistanceOptions.length > 0 && - druhý select se vypíše jenom pokud je v prvním něco vybranýho
