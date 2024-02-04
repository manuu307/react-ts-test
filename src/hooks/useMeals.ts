import { useState, useEffect } from 'react';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

interface MealsResponse {
  meals: Meal[];
}

const useMeals = (): { mealsByFirstLetter: Meal[]; meals: Meal[]; loading: boolean; error: string | null; fetchMealsByName: (name: string) => void; fetchMealsByFirstLetter: (name: string) => void } => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealsByFirstLetter, setMealsByFirstLetter] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string>(() => {
    // Retrieve selected meal from local storage on component mount
    return localStorage.getItem('selectedMeal') || '';
  });

  useEffect(() => {
    // Save selected meal to local storage whenever it changes
    localStorage.setItem('selectedMeal', selectedMeal);
  }, [selectedMeal]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedMeal !== '' && meals.length > 0) {
        fetchMealsByName(selectedMeal);
      }
    }, 10000); // Revalidate every 10 seconds

    return () => {
      clearInterval(intervalId);
    };

  }, [selectedMeal, meals]); // Add selectedMeal to dependency array

  const fetchMealsByFirstLetter = async (letter: string): Promise<void> => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meals by first letter');
      }

      const data: MealsResponse = await response.json();
      setMealsByFirstLetter(data.meals || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchMealsByName = async (name: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meals by name');
      }

      const data: MealsResponse = await response.json();
      setMeals(data.meals || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSelectedMeal(name)
    }

    setLoading(false);
  };

  return { 
    mealsByFirstLetter, 
    meals, 
    loading, 
    error, 
    fetchMealsByName, 
    fetchMealsByFirstLetter 
  };
};

export default useMeals;

