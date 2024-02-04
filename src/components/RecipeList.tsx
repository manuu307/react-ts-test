import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import React from 'react';
import { Meal } from '../hooks/useMeals';
import FilterVariants from './FilterVariants'; 

interface RecipeListProps {
  meals: Meal[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 const RecipeList: React.FC<RecipeListProps> = ({meals}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedArea, setSelectedArea] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const filteredMeals = meals.filter((meal) => {
    const categoryMatch = !selectedCategory || meal.strCategory === selectedCategory;
    const areaMatch = !selectedArea || meal.strArea === selectedArea;

    return categoryMatch && areaMatch;
  });

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMeals = filteredMeals.slice(startIndex, endIndex);


  return (
    <>
      <div style={{border: "1px solid rgba(170, 160, 139, 0.4)"}}>
        <Stack direction="row" spacing={2}>
           <FilterVariants
             handler={handleCategoryChange}
             filterName={"Filter Categories"} 
             filterLabel={"Filter Category"} 
             filters={meals.map((e) => e.strCategory)} 
           />
           <FilterVariants
             handler={handleAreaChange}
             filterName={"Filter Areas"} 
             filterLabel={"Filter Area"} 
             filters={meals.map((e) => e.strArea)} 
           />
          </Stack>
          <TableContainer sx={{marginTop:1}} component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Id</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Area</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMeals.map((meal:Meal) => (
                  <StyledTableRow key={meal.strMeal}>
                    <StyledTableCell component="th" scope="row">
                       {meal.strMeal}
                    </StyledTableCell>
                    <StyledTableCell align="right">{meal.idMeal}</StyledTableCell>
                    <StyledTableCell align="right">{meal.strCategory}</StyledTableCell>
                    <StyledTableCell align="right">{meal.strArea}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
      </div>
      <Pagination sx={{ 
          margin:8, 
          position: 'fixed', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1 }}
          color="primary"
          count={Math.ceil(filteredMeals.length / itemsPerPage)} page={currentPage} onChange={handleChangePage} />
    </>
  );
}

export default RecipeList;
