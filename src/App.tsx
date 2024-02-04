import Container from '@mui/material/Container';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Stack from '@mui/material/Stack';
import useMeals from './hooks/useMeals';
import './index.css'

function App() {
  const {mealsByFirstLetter, meals, error, fetchMealsByName, fetchMealsByFirstLetter } = useMeals();
  
  if (error) {
    <h4>Ups... it has been an error!</h4>
  }
  
  return (
    <Container>
      <Stack sx={{paddingY:2}} spacing={3}>
        <div className={meals.length === 0 ? "firstView" : ""}>
          <h1 style={{textAlign:"center"}}><strong style={{color:"orange"}}>YUM</strong><strong style={{color:"skyblue"}}>Meals!</strong></h1>
          <SearchBar 
            fetchMealsByFirstLetter={fetchMealsByFirstLetter} 
            mealsByFirstLetter={mealsByFirstLetter}
            fetchMealsByName={fetchMealsByName}
          />
        </div>
        { meals.length > 0 && <RecipeList meals={meals} /> }
      </Stack>
    </Container>
  );
}

export default App;
