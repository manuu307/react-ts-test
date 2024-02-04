import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Meal } from '../hooks/useMeals';

interface SearchBarProps {
  fetchMealsByName: any;
  fetchMealsByFirstLetter: any;
  mealsByFirstLetter: Meal[];
}

const SearchBar: React.FC<SearchBarProps> = ({mealsByFirstLetter, fetchMealsByName, fetchMealsByFirstLetter}) => {
  
  const handleSearchFirstLetter = async (value:string) => {
    if (value && value.length === 1) {
      await fetchMealsByFirstLetter(value);
    }
  };

  const handleSearch = async (value:string) => {
    if (value) {
      await fetchMealsByName(value);
    }
    
  }

  return (
      <Autocomplete
        fullWidth
        freeSolo
        disableClearable
        options={mealsByFirstLetter.map((meal:any) => meal.strMeal)}
        // eslint-disable-next-line
        onInputChange={(event, newValue:string) => handleSearchFirstLetter(newValue)}
        onChange={(event, newValue:string) => handleSearch(newValue)}
        renderInput={(params:any) => (
          <TextField
            {...params}
            label="Search meal by name"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
  );
}

export default SearchBar;
